// app/(public)/(passenger)/search/page.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import vividContent from '@/data/vivid-content.json';
import {
  MapPin,
  Calendar,
  ArrowLeftRight,
  Bus as BusIcon,
  Armchair,
  ChevronDown,
  ArrowUpDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from 'lucide-react';
import { RouteMapOverlay, type RouteData, type RouteStop } from '@/components/RouteMapOverlay'

interface FleetPartner {
  id: string;
  name: string;
  logo: string;
  initials: string;
}

const fleetPartners: FleetPartner[] = vividContent.fleetPartners;

interface Schedule {
  id: string;
  operator: string;
  operatorInitials: string;
  busType: 'AC' | 'Non-AC';
  departure: string; // HH:MM
  arrival: string; // HH:MM
  durationLabel: string;
  stopLabel: string;
  seatsRemaining: number;
  fare: number;
}

const MOCK_SCHEDULES: Schedule[] = [
  { id: 'sched-1', operator: 'Green Line', operatorInitials: 'GL', busType: 'AC', departure: '08:00', arrival: '02:30', durationLabel: '6h 30m', stopLabel: 'Non-stop', seatsRemaining: 6, fare: 42 },
  { id: 'sched-2', operator: 'Sakura Paribahan', operatorInitials: 'SP', busType: 'AC', departure: '09:00', arrival: '04:10', durationLabel: '7h 10m', stopLabel: 'One-stop', seatsRemaining: 15, fare: 40 },
  { id: 'sched-3', operator: 'Hanif Paribahan', operatorInitials: 'HP', busType: 'Non-AC', departure: '07:00', arrival: '12:00', durationLabel: '6h 30m', stopLabel: 'Non-stop', seatsRemaining: 20, fare: 45 },
  { id: 'sched-4', operator: 'Shohagh Paribahan', operatorInitials: 'SH', busType: 'AC', departure: '08:30', arrival: '03:00', durationLabel: '6h 30m', stopLabel: 'Non-stop', seatsRemaining: 12, fare: 50 },
  { id: 'sched-5', operator: 'Euro Coach', operatorInitials: 'EC', busType: 'AC', departure: '11:00', arrival: '06:30', durationLabel: '6h 30m', stopLabel: 'Non-stop', seatsRemaining: 8, fare: 60 },
];

function cityCode(city: string) {
  const clean = city.trim();
  if (clean.length <= 3) return clean.toUpperCase();
  return clean.slice(0, 3).toUpperCase();
}

// Turns "6h 30m" into a rough mock distance, assuming ~55km/h average — purely
// cosmetic for the route overlay's stat row until real route data is wired in.
function estimateDistanceKm(durationLabel: string) {
  const hMatch = durationLabel.match(/(\d+)h/);
  const mMatch = durationLabel.match(/(\d+)m/);
  const hours = (hMatch ? parseInt(hMatch[1], 10) : 0) + (mMatch ? parseInt(mMatch[1], 10) : 0) / 60;
  return `${Math.round(hours * 55)} km`;
}

// Only "Fleet" still needs a dropdown menu now that Price is a plain toggle.
type DropdownKey = 'fleet' | null;
type SortField = 'departure' | 'price';

// Fixed number of date pills — no longer computed from remaining flex space,
// so the strip never resizes when the filter pills next to it change width.
// The row scrolls horizontally instead (see date strip container below).
const DATE_STRIP_COUNT = 10;

export default function SearchPage() {
  const searchParams = useSearchParams();

  const initialFrom = searchParams.get('from') || 'Bangalore';
  const initialTo = searchParams.get('to') || 'Chennai';
  const initialDate = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [via, setVia] = useState('');
  const [viaOpen, setViaOpen] = useState(false);
  const viaInputRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState(initialDate);

  const [busTypeFilter, setBusTypeFilter] = useState<'all' | 'AC' | 'Non-AC'>('all');
  const [fleetFilter, setFleetFilter] = useState<'all' | string>('all');

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Route map overlay state — holds the schedule whose route is being viewed, if any ---
  const [routeSchedule, setRouteSchedule] = useState<Schedule | null>(null);

  // --- Dropdown state (Fleet only — Price is now a plain toggle) ---
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const fleetBtnRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);

  // --- Date strip state ---
  const [dateWindowOffset, setDateWindowOffset] = useState(0);

  // --- Sort state (shared between Departure time & Price toggles) ---
  const [sortBy, setSortBy] = useState<SortField>('departure');
  const [sortAsc, setSortAsc] = useState(true);

  const dateStrip = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: DATE_STRIP_COUNT }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + dateWindowOffset + i);
      return d;
    });
  }, [dateWindowOffset]);

  useEffect(() => {
    if (viaOpen) viaInputRef.current?.focus();
  }, [viaOpen]);

  const toISODate = (d: Date) => {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const formatStripDate = (d: Date) => {
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    return `${weekday}, ${day} ${month}`;
  };

  // Compact pieces used for the mobile date card (day number over weekday abbreviation)
  const stripDayNumber = (d: Date) => d.getDate().toString().padStart(2, '0');
  const stripWeekdayShort = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const insideBar = filterBarRef.current?.contains(target);
      const insideMenu = menuPanelRef.current?.contains(target);
      if (!insideBar && !insideMenu) {
        setOpenDropdown(null);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenDropdown(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const closeOnMove = () => setOpenDropdown(null);
    window.addEventListener('scroll', closeOnMove, true);
    window.addEventListener('resize', closeOnMove);
    return () => {
      window.removeEventListener('scroll', closeOnMove, true);
      window.removeEventListener('resize', closeOnMove);
    };
  }, [openDropdown]);

  const toggleDropdown = (key: Exclude<DropdownKey, null>, btnRef: React.RefObject<HTMLButtonElement | null>) => {
    setOpenDropdown((prev) => {
      if (prev === key) return null;
      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) {
        setMenuPos({ top: rect.bottom + 8, left: rect.left });
      }
      return key;
    });
  };

  // Toggle sort: clicking the active field flips direction, clicking the other field switches to it (ascending first).
  // Used by both the Departure time pill and the Price pill — both are plain toggles, no dropdown menus.
  const handleSort = (field: SortField) => {
    setSortBy((prevField) => {
      if (prevField === field) {
        setSortAsc((prevAsc) => !prevAsc);
        return prevField;
      }
      setSortAsc(true);
      return field;
    });
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setSchedules(MOCK_SCHEDULES);
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [from, to]);

  const filteredSchedules = useMemo(() => {
    const result = schedules.filter((s) => {
      if (busTypeFilter !== 'all' && s.busType !== busTypeFilter) return false;
      if (fleetFilter !== 'all') {
        const fleet = fleetPartners.find((f) => f.id === fleetFilter);
        if (fleet && !s.operator.toLowerCase().includes(fleet.name.toLowerCase())) return false;
      }
      return true;
    });
    return result.sort((a, b) => {
      if (sortBy === 'price') {
        return sortAsc ? a.fare - b.fare : b.fare - a.fare;
      }
      return sortAsc ? a.departure.localeCompare(b.departure) : b.departure.localeCompare(a.departure);
    });
  }, [schedules, busTypeFilter, fleetFilter, sortBy, sortAsc]);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const resetFilters = () => {
    setBusTypeFilter('all');
    setFleetFilter('all');
    setOpenDropdown(null);
  };

  const fromCode = cityCode(from);
  const toCode = cityCode(to);

  const fleetLabel = fleetFilter === 'all' ? 'All' : fleetPartners.find((f) => f.id === fleetFilter)?.name ?? 'All';
  const activeFilterCount = (busTypeFilter !== 'all' ? 1 : 0) + (fleetFilter !== 'all' ? 1 : 0);

  // Builds the RouteMapOverlay's mock RouteData from a schedule + the current
  // from/to/via search fields. Swap this out for real stop/geo data later —
  // the overlay only cares about the shape below.
  const buildRouteData = (s: Schedule): RouteData => {
    const stops: RouteStop[] = [
      { id: 'origin', name: from, time: s.departure, progress: 0, status: 'passed' },
    ];

    if (via) {
      stops.push({ id: 'via', name: via, time: '—', progress: 50, status: 'upcoming' });
    } else if (s.stopLabel.toLowerCase() !== 'non-stop') {
      stops.push({ id: 'transit', name: 'Transit Stop', time: '—', progress: 50, status: 'upcoming' });
    }

    stops.push({ id: 'destination', name: to, time: s.arrival, progress: 100, status: 'upcoming' });

    return {
      busNumber: s.operatorInitials + '-' + s.id.split('-')[1],
      origin: from,
      destination: to,
      departureTime: s.departure,
      arrivalTime: s.arrival,
      duration: s.durationLabel,
      distance: estimateDistanceKm(s.durationLabel),
      busProgress: 8,
      stops,
    };
  };

  return (
    <div className="bg-[#f2f4f7] min-h-screen overflow-x-hidden">
      <main className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-[32px] py-4 sm:py-8">
        <div className="bg-white rounded-2xl sm:rounded-[24px] shadow-sm overflow-hidden border border-[#e1e2e4]/60">
          {/* Search Bar */}
          <section className="p-4 sm:p-6 md:p-8 bg-white border-b border-[#e1e2e4]/60">
            <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] gap-3 sm:gap-4 md:items-end">
              {/* Boarding + swap + drop-off — always one compact row on mobile.
                  md:contents makes this wrapper "disappear" at the md breakpoint so
                  its 3 children slot directly into the outer 6-column desktop grid,
                  keeping the original desktop layout exactly as it was. */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-end md:contents">
                <div className="space-y-1 sm:space-y-2 min-w-0">
                  <label className="text-[10px] sm:text-[12px] font-bold text-[#46464f] px-1">Boarding point</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#c7c5d1]" />
                    <input
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full pl-7 sm:pl-12 pr-2 sm:pr-4 py-2 sm:py-3.5 bg-[#f1f3f9]/60 border-none rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44]"
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex md:block justify-center pb-1">
                  <button
                    onClick={swapCities}
                    className="bg-[#050a44] text-white p-1.5 sm:p-2.5 rounded-full hover:scale-105 transition-transform shadow-sm"
                    aria-label="Swap boarding and drop-off points"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:rotate-0 rotate-90" />
                  </button>
                </div>

                <div className="space-y-1 sm:space-y-2 min-w-0">
                  <label className="text-[10px] sm:text-[12px] font-bold text-[#46464f] px-1">Drop-off point</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 text-[#c7c5d1]" />
                    <input
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full pl-7 sm:pl-12 pr-2 sm:pr-4 py-2 sm:py-3.5 bg-[#f1f3f9]/60 border-none rounded-xl text-xs sm:text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44]"
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#46464f] px-1 flex items-center gap-1.5 h-[15px]">
                  {viaOpen && (
                    <>
                      Via
                      <span className="text-[10px] font-semibold text-[#c7c5d1] normal-case">(optional)</span>
                    </>
                  )}
                </label>
                {viaOpen ? (
                  <div className="relative">
                    <MapPin className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c5d1]" />
                    <input
                      ref={viaInputRef}
                      value={via}
                      onChange={(e) => setVia(e.target.value)}
                      onBlur={() => {
                        if (!via) setViaOpen(false);
                      }}
                      placeholder="Add a stop along the route"
                      className="w-full pl-12 pr-10 py-3.5 bg-[#f1f3f9]/60 border-none rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44] placeholder:text-[#c7c5d1] placeholder:font-normal"
                      type="text"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setVia('');
                        setViaOpen(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c7c5d1] hover:text-[#46464f] transition-colors"
                      aria-label="Remove via stop"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setViaOpen(true)}
                    className="w-full flex items-center gap-2 pl-4 pr-4 py-3.5 border border-dashed border-[#c7c5d1] rounded-xl text-sm font-semibold text-[#46464f] hover:border-[#050a44] hover:text-[#050a44] hover:bg-[#f1f3f9]/40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add a stop
                    <span className="text-[10px] font-semibold text-[#c7c5d1] normal-case ml-auto">optional</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#46464f] px-1">Departure date</label>
                <div className="relative">
                  <Calendar className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c5d1]" />
                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-[#f1f3f9]/60 border-none rounded-xl text-sm font-medium outline-none focus:ring-1 focus:ring-[#050a44]"
                    type="date"
                  />
                </div>
              </div>

              <div className="pb-1">
                <button className="w-full md:w-auto h-[52px] px-8 bg-[#050a44] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm whitespace-nowrap">
                  Search Bus
                </button>
              </div>
            </div>
          </section>

          {/*
            Filters — on desktop/laptop this is a single row: filter pills on the left,
            date strip filling the remaining space on the right, each scrolling
            independently so neither one resizes the other when a filter is toggled.
            Only on mobile (below md) do the two groups stack into separate rows,
            since there isn't enough width to show both comfortably on one line.
          */}
          <section className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white border-b border-[#e1e2e4]/60">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            {/* Filter pills */}
            <div ref={filterBarRef} className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar md:shrink-0">
              {/* Departure time sort — plain toggle */}
              <button
                onClick={() => handleSort('departure')}
                className={`flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-colors whitespace-nowrap shrink-0 ${
                  sortBy === 'departure'
                    ? 'border-[#050a44] bg-[#050a44] text-white'
                    : 'border-[#e1e2e4] bg-white text-[#050a44] hover:bg-[#f1f3f9]'
                }`}
              >
                <ArrowUpDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                    sortBy === 'departure' && !sortAsc ? 'rotate-180' : ''
                  } ${sortBy === 'departure' ? 'text-white/70' : 'text-[#c7c5d1]'}`}
                />
                Departure time
              </button>

              {/* Price sort — plain toggle, same pattern as Departure time (no dropdown) */}
              <button
                onClick={() => handleSort('price')}
                className={`flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-colors whitespace-nowrap shrink-0 ${
                  sortBy === 'price'
                    ? 'border-[#050a44] bg-[#050a44] text-white'
                    : 'border-[#e1e2e4] bg-white text-[#050a44] hover:bg-[#f1f3f9]'
                }`}
              >
                <ArrowUpDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                    sortBy === 'price' && !sortAsc ? 'rotate-180' : ''
                  } ${sortBy === 'price' ? 'text-white/70' : 'text-[#c7c5d1]'}`}
                />
                Price
              </button>

              {/* Bus Type — two compact toggle pills instead of a 3-way segmented control.
                  Tapping a selected type again clears it back to "all", so there's no
                  need for a separate "All" pill — saves roughly a third of the width
                  this control used to take on mobile. */}
              <div className="hidden sm:flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setBusTypeFilter((prev) => (prev === 'AC' ? 'all' : 'AC'))}
                  className={`px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold whitespace-nowrap border transition-colors ${
                    busTypeFilter === 'AC'
                      ? 'border-[#050a44] bg-[#050a44] text-white'
                      : 'border-[#e1e2e4] bg-white text-[#46464f] hover:bg-[#f1f3f9]'
                  }`}
                >
                  AC
                </button>
                <button
                  onClick={() => setBusTypeFilter((prev) => (prev === 'Non-AC' ? 'all' : 'Non-AC'))}
                  className={`px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-bold whitespace-nowrap border transition-colors ${
                    busTypeFilter === 'Non-AC'
                      ? 'border-[#050a44] bg-[#050a44] text-white'
                      : 'border-[#e1e2e4] bg-white text-[#46464f] hover:bg-[#f1f3f9]'
                  }`}
                >
                  <span className="sm:hidden">Non</span>
                  <span className="hidden sm:inline">Non-AC</span>
                </button>
              </div>

              {/* Fleet dropdown — sourced from fleetPartners in vivid-content.json, shows brand logos */}
              <div className="relative shrink-0">
                <button
                  ref={fleetBtnRef}
                  onClick={() => toggleDropdown('fleet', fleetBtnRef)}
                  className={`flex items-center gap-2 pl-3 sm:pl-4 pr-3 sm:pr-3.5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors whitespace-nowrap border ${
                    openDropdown === 'fleet' || fleetFilter !== 'all'
                      ? 'border-[#050a44] bg-[#050a44] text-white'
                      : 'border-[#e1e2e4] bg-white text-[#050a44] hover:bg-[#f1f3f9]'
                  }`}
                >
                  <span className="truncate max-w-[90px] sm:max-w-[130px]">
                    {fleetFilter === 'all' ? 'Fleet' : fleetLabel}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openDropdown === 'fleet' ? 'rotate-180' : ''} ${
                      openDropdown === 'fleet' || fleetFilter !== 'all' ? 'text-white/70' : 'text-[#c7c5d1]'
                    }`}
                  />
                </button>
                {openDropdown === 'fleet' && menuPos && createPortal(
                  <div
                    ref={menuPanelRef}
                    style={{ position: 'fixed', top: menuPos.top, left: menuPos.left }}
                    className="z-50 w-60 max-h-72 overflow-y-auto bg-white rounded-xl shadow-[0px_8px_32px_rgba(0,0,0,0.16)] border border-[#e1e2e4]/60 p-2"
                  >
                    <label className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-[#f1f3f9] cursor-pointer">
                      <input
                        checked={fleetFilter === 'all'}
                        onChange={() => {
                          setFleetFilter('all');
                          setOpenDropdown(null);
                        }}
                        className="w-4 h-4 rounded text-[#050a44] focus:ring-[#050a44] border-[#c7c5d1]"
                        name="fleet"
                        type="radio"
                      />
                      <span className="text-sm font-medium text-[#46464f]">All fleet</span>
                    </label>
                    {fleetPartners.map((fleet) => (
                      <label
                        key={fleet.id}
                        className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-[#f1f3f9] cursor-pointer"
                      >
                        <input
                          checked={fleetFilter === fleet.id}
                          onChange={() => {
                            setFleetFilter(fleet.id);
                            setOpenDropdown(null);
                          }}
                          className="w-4 h-4 rounded text-[#050a44] focus:ring-[#050a44] border-[#c7c5d1]"
                          name="fleet"
                          type="radio"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={fleet.logo}
                          alt={fleet.name}
                          className="w-6 h-6 shrink-0 rounded-md object-contain bg-[#f1f3f9] border border-[#e1e2e4]/60 p-0.5"
                          onError={(e) => {
                            // Fallback to initials badge if the logo asset is missing
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement | null;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <span className="hidden w-6 h-6 shrink-0 rounded-md bg-[#f1f3f9] border border-[#e1e2e4]/60 items-center justify-center text-[9px] font-bold text-[#050a44]">
                          {fleet.initials}
                        </span>
                        <span className="text-sm font-medium text-[#46464f]">{fleet.name}</span>
                      </label>
                    ))}
                  </div>,
                  document.body
                )}
              </div>

              {/* Compact AC toggle — fills the empty space on narrow mobile widths,
                  where the full AC/Non-AC control above is hidden. Placed before
                  Reset so Reset always stays as the last pill in the row. Hidden
                  again from sm up, since the full control is visible by then. */}
              <button
                onClick={() => setBusTypeFilter((prev) => (prev === 'AC' ? 'all' : 'AC'))}
                aria-pressed={busTypeFilter === 'AC'}
                className={`sm:hidden shrink-0 px-3 py-2 rounded-full text-xs font-bold border transition-colors ${
                  busTypeFilter === 'AC'
                    ? 'border-[#050a44] bg-[#050a44] text-white'
                    : 'border-[#e1e2e4] bg-white text-[#46464f] hover:bg-[#f1f3f9]'
                }`}
              >
                AC
              </button>

              {/* Reset / remove filters — compact, icon-first */}
              <button
                onClick={resetFilters}
                disabled={activeFilterCount === 0}
                aria-label="Reset filters"
                className={`flex items-center gap-1.5 pl-2.5 sm:pl-3 pr-2.5 sm:pr-3 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                  activeFilterCount > 0
                    ? 'text-[#E74C3C] border border-[#E74C3C]/30 bg-[#E74C3C]/5 hover:bg-[#E74C3C]/10'
                    : 'text-[#c7c5d1] border border-[#e1e2e4] cursor-not-allowed'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  Reset{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
                </span>
              </button>
            </div>

            {/* Date strip — sits inline to the right of the pills on desktop; own row on mobile */}
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 md:flex-1 md:justify-end">
              <button
                onClick={() => setDateWindowOffset((o) => o - 1)}
                className="p-1.5 sm:p-2 rounded-full text-[#46464f] hover:bg-[#f1f3f9] transition-colors shrink-0"
                aria-label="Earlier dates"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="flex items-center gap-1.5 sm:gap-1.5 overflow-x-auto no-scrollbar min-w-0 flex-1">
                {dateStrip.map((d) => {
                  const iso = toISODate(d);
                  const isSelected = iso === date;
                  return (
                    <button
                      key={iso}
                      onClick={() => setDate(iso)}
                      className={`flex flex-col sm:block items-center justify-center gap-0.5 w-11 sm:w-auto px-0 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-[#050a44] text-white'
                          : 'text-[#46464f] hover:bg-[#f1f3f9]'
                      }`}
                    >
                      {/* Mobile: compact card — day number over weekday abbreviation */}
                      <span className="sm:hidden text-base font-extrabold leading-none">
                        {stripDayNumber(d)}
                      </span>
                      <span
                        className={`sm:hidden text-[9px] font-bold uppercase tracking-wide leading-none ${
                          isSelected ? 'text-white/70' : 'text-[#9a9ba5]'
                        }`}
                      >
                        {stripWeekdayShort(d)}
                      </span>
                      {/* Desktop/tablet: full "Sun, 05 Jul" pill */}
                      <span className="hidden sm:inline">{formatStripDate(d)}</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setDateWindowOffset((o) => o + 1)}
                className="p-1.5 sm:p-2 rounded-full text-[#46464f] hover:bg-[#f1f3f9] transition-colors shrink-0"
                aria-label="Later dates"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            </div>
          </section>

          {/* Results list */}
          <div className="p-4 sm:p-6 md:p-8 bg-white">
            <div className="flex justify-between items-center mb-6 sm:mb-8 px-1 sm:px-2 flex-wrap gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#050a44]">
                Bus from {from} to {to}
                {via && <span className="text-[#46464f] font-medium text-sm sm:text-base"> via {via}</span>}
              </h1>
              <span className="text-sm font-semibold text-[#46464f]">
                {filteredSchedules.length} result{filteredSchedules.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#edeef0] border-t-[#050a44]"></div>
              </div>
            ) : filteredSchedules.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-[#46464f] text-lg">No buses match your filters</p>
                <button onClick={resetFilters} className="mt-4 text-[#050a44] font-bold hover:underline">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredSchedules.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-xl border border-[#c7c5d1] shadow-sm p-[24px] hover:shadow-md transition-shadow"
                  >
                    {/* Header: navy OperatorBadge + gold class pill, same pattern as
                        dashboard/my-bookings/marketplace ticket rows */}
                    <div className="flex justify-between items-center mb-[20px]">
                      <div className="flex items-center gap-[12px]">
                        <div className="w-11 h-11 rounded-lg bg-[#050a44] text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                          {s.operatorInitials}
                        </div>
                        <span className="text-[15px] font-bold text-[#050a44]">{s.operator}</span>
                      </div>
                      <span className="inline-block bg-[#feb700]/15 text-[#7c5800] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        {s.busType === 'AC' ? 'AC Bus' : 'Non-AC Bus'}
                      </span>
                    </div>

                    {/* Route visualization — click to open the route map overlay for this bus.
                        Wrapped in the bg-[#f2f4f6] rounded-xl panel used for boarding/drop-off
                        on the seats page and the route blocks on dashboard + my-bookings. */}
                    <button
                      type="button"
                      onClick={() => setRouteSchedule(s)}
                      title="View route on map"
                      className="w-full flex justify-between items-center bg-[#f2f4f6] rounded-xl p-[16px] mb-[16px] group cursor-pointer"
                    >
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">{from}</p>
                        <p className="text-[20px] font-extrabold text-[#050a44]">{fromCode}</p>
                        <p className="text-[12px] font-medium text-[#46464f] mt-0.5">{s.departure}</p>
                      </div>
                      <div className="flex-1 px-[16px] flex flex-col items-center">
                        <span className="text-[11px] font-bold text-[#46464f] mb-1 group-hover:text-[#050a44] transition-colors">
                          {s.durationLabel}
                        </span>
                        <div className="relative w-full border-t border-dashed border-[#c7c5d1] group-hover:border-[#050a44] transition-colors">
                          <BusIcon className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#f2f4f6] px-0.5 text-[#050a44]" />
                        </div>
                        <span className="text-[11px] font-bold text-[#46464f] mt-2">
                          {s.stopLabel}
                        </span>
                        <span className="text-[10px] font-bold text-[#050a44] mt-1 tracking-wide uppercase group-hover:underline">
                          View route
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] font-bold text-[#46464f] uppercase tracking-wide mb-1">{to}</p>
                        <p className="text-[20px] font-extrabold text-[#050a44]">{toCode}</p>
                        <p className="text-[12px] font-medium text-[#46464f] mt-0.5">{s.arrival}</p>
                      </div>
                    </button>

                    {/* Footer: seats + price + CTA, same button treatment as
                        Buy Now / Grab Now / Select Seats elsewhere in the app */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-[6px]">
                        <Armchair className="w-[18px] h-[18px] text-[#46464f]" />
                        <span className={`text-[13px] font-bold ${s.seatsRemaining <= 5 ? 'text-[#ba1a1a]' : 'text-[#46464f]'}`}>
                          {s.seatsRemaining} Remaining
                        </span>
                      </div>
                      <div className="flex items-center gap-[16px]">
                        <p className="text-[22px] font-extrabold text-[#050a44]">${s.fare}</p>
                        <Link
                          href={`/seats/${s.id}`}
                          className="bg-[#050a44] text-white rounded-xl px-6 py-2.5 text-[13px] font-bold hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
                        >
                          Select Seats
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Route map overlay — mock map for now, opens when a card's route row is clicked */}
      {routeSchedule && (
        <RouteMapOverlay
          isOpen={!!routeSchedule}
          onClose={() => setRouteSchedule(null)}
          route={buildRouteData(routeSchedule)}
        />
      )}
    </div>
  );
}