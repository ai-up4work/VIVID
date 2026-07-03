'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function OperatorBrandingPage() {
  const params = useParams();
  const operatorId = params.id as string;

  // Mock operator data - in real app, fetch from API
  const [branding, setBranding] = useState({
    operatorName: 'Green Line Paribahan',
    primaryColor: '#050a44',
    secondaryColor: '#7a7fbb',
    accentColor: '#feb700',
    fontFamily: 'Inter',
    borderRadius: '12px',
    logoUrl: '🟢',
    customDomain: 'greenline.vivid.app',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(branding);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setBranding(editForm);
    setIsEditing(false);
  };

  const colorPalettes = [
    { name: 'Ocean Blue', primary: '#0369a1', secondary: '#0ea5e9', accent: '#fbbf24' },
    { name: 'Forest Green', primary: '#15803d', secondary: '#22c55e', accent: '#fbbf24' },
    { name: 'Sunset Orange', primary: '#b45309', secondary: '#f59e0b', accent: '#ec4899' },
    { name: 'Royal Purple', primary: '#6b21a8', secondary: '#a855f7', accent: '#06b6d4' },
    { name: 'Charcoal Black', primary: '#1f2937', secondary: '#6b7280', accent: '#10b981' },
  ];

  const fonts = ['Inter', 'Poppins', 'Roboto', 'Playfair Display', 'Montserrat'];
  const radii = ['4px', '8px', '12px', '16px', '24px'];

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/operators" className="p-2 hover:bg-[#f2f4f6] rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#050a44]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#050a44]">Customize Branding</h1>
            <p className="text-sm text-[#46464f]">Operator ID: {operatorId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Preview */}
            <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-8 overflow-hidden">
              <h3 className="text-lg font-bold text-[#050a44] mb-6">Live Preview</h3>
              
              <div 
                className="rounded-2xl p-8 text-white transition-all mb-6"
                style={{ 
                  backgroundColor: editForm.primaryColor,
                  fontFamily: editForm.fontFamily,
                  borderRadius: editForm.borderRadius
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{editForm.logoUrl}</div>
                    <div>
                      <h1 className="text-3xl font-bold">{editForm.operatorName}</h1>
                      <p className="text-lg opacity-80">Premium Bus Transport Service</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm opacity-90">Welcome to {editForm.operatorName}. Book your journey with confidence.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      className="py-4 px-6 rounded-lg font-bold text-lg transition-all hover:opacity-90"
                      style={{ 
                        backgroundColor: editForm.accentColor,
                        color: editForm.primaryColor
                      }}
                    >
                      Book Now
                    </button>
                    <button 
                      className="py-4 px-6 rounded-lg font-bold text-lg border-2 transition-all hover:opacity-90"
                      style={{ 
                        backgroundColor: 'transparent',
                        borderColor: editForm.accentColor,
                        color: editForm.accentColor
                      }}
                    >
                      View Routes
                    </button>
                  </div>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-2">PRIMARY COLOR</p>
                  <div 
                    className="w-full h-24 rounded-lg border-2 border-[#edeef0] transition-all"
                    style={{ backgroundColor: editForm.primaryColor }}
                  ></div>
                  <p className="text-xs font-mono text-[#46464f] mt-2 truncate">{editForm.primaryColor}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-2">SECONDARY COLOR</p>
                  <div 
                    className="w-full h-24 rounded-lg border-2 border-[#edeef0] transition-all"
                    style={{ backgroundColor: editForm.secondaryColor }}
                  ></div>
                  <p className="text-xs font-mono text-[#46464f] mt-2 truncate">{editForm.secondaryColor}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-2">ACCENT COLOR</p>
                  <div 
                    className="w-full h-24 rounded-lg border-2 border-[#edeef0] transition-all"
                    style={{ backgroundColor: editForm.accentColor }}
                  ></div>
                  <p className="text-xs font-mono text-[#46464f] mt-2 truncate">{editForm.accentColor}</p>
                </div>
              </div>
            </div>

            {/* Mobile Preview */}
            <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-8">
              <h3 className="text-lg font-bold text-[#050a44] mb-6">Mobile Preview</h3>
              <div className="flex justify-center">
                <div 
                  className="w-80 rounded-3xl border-8 border-gray-800 shadow-2xl overflow-hidden"
                  style={{ backgroundColor: editForm.primaryColor }}
                >
                  <div className="p-6 text-white text-center" style={{ fontFamily: editForm.fontFamily }}>
                    <div className="text-6xl mb-4">{editForm.logoUrl}</div>
                    <h2 className="text-2xl font-bold mb-2">{editForm.operatorName}</h2>
                    <p className="text-sm opacity-80 mb-6">Book Your Trip</p>
                    <button 
                      className="w-full py-3 rounded-lg font-bold text-lg mb-3 transition-all hover:opacity-90"
                      style={{ 
                        backgroundColor: editForm.accentColor,
                        color: editForm.primaryColor
                      }}
                    >
                      Search Routes
                    </button>
                    <button 
                      className="w-full py-3 rounded-lg font-bold text-lg border-2 transition-all hover:opacity-90"
                      style={{ 
                        backgroundColor: 'transparent',
                        borderColor: editForm.accentColor,
                        color: editForm.accentColor
                      }}
                    >
                      My Bookings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6 h-fit sticky top-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#050a44]">Branding Settings</h3>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  isEditing 
                    ? 'bg-red-100 text-red-800 hover:opacity-90' 
                    : 'bg-[#050a44] text-white hover:opacity-90'
                }`}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4 max-h-96 overflow-y-auto">
                {/* Operator Name */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Operator Name</label>
                  <input 
                    type="text"
                    value={editForm.operatorName}
                    onChange={(e) => setEditForm({...editForm, operatorName: e.target.value})}
                    className="w-full px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm focus:ring-2 focus:ring-[#050a44] outline-none"
                  />
                </div>

                {/* Primary Color */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Primary Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color"
                      value={editForm.primaryColor}
                      onChange={(e) => setEditForm({...editForm, primaryColor: e.target.value})}
                      className="w-12 h-10 rounded-lg cursor-pointer border border-[#c7c5d1]"
                    />
                    <input 
                      type="text"
                      value={editForm.primaryColor}
                      onChange={(e) => setEditForm({...editForm, primaryColor: e.target.value})}
                      className="flex-1 px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#050a44] outline-none"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Secondary Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color"
                      value={editForm.secondaryColor}
                      onChange={(e) => setEditForm({...editForm, secondaryColor: e.target.value})}
                      className="w-12 h-10 rounded-lg cursor-pointer border border-[#c7c5d1]"
                    />
                    <input 
                      type="text"
                      value={editForm.secondaryColor}
                      onChange={(e) => setEditForm({...editForm, secondaryColor: e.target.value})}
                      className="flex-1 px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#050a44] outline-none"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Accent Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color"
                      value={editForm.accentColor}
                      onChange={(e) => setEditForm({...editForm, accentColor: e.target.value})}
                      className="w-12 h-10 rounded-lg cursor-pointer border border-[#c7c5d1]"
                    />
                    <input 
                      type="text"
                      value={editForm.accentColor}
                      onChange={(e) => setEditForm({...editForm, accentColor: e.target.value})}
                      className="flex-1 px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#050a44] outline-none"
                    />
                  </div>
                </div>

                {/* Color Palettes */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-2">Quick Palettes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorPalettes.map((palette) => (
                      <button
                        key={palette.name}
                        type="button"
                        onClick={() => setEditForm({
                          ...editForm, 
                          primaryColor: palette.primary,
                          secondaryColor: palette.secondary,
                          accentColor: palette.accent
                        })}
                        className="p-2 rounded-lg border-2 border-[#edeef0] hover:border-[#c7c5d1] transition-all"
                        title={palette.name}
                      >
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded" style={{ backgroundColor: palette.primary }}></div>
                          <div className="w-2 h-2 rounded" style={{ backgroundColor: palette.secondary }}></div>
                          <div className="w-2 h-2 rounded" style={{ backgroundColor: palette.accent }}></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Font Family</label>
                  <select 
                    value={editForm.fontFamily}
                    onChange={(e) => setEditForm({...editForm, fontFamily: e.target.value})}
                    className="w-full px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm focus:ring-2 focus:ring-[#050a44] outline-none"
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                {/* Border Radius */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Border Radius</label>
                  <select 
                    value={editForm.borderRadius}
                    onChange={(e) => setEditForm({...editForm, borderRadius: e.target.value})}
                    className="w-full px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm focus:ring-2 focus:ring-[#050a44] outline-none"
                  >
                    {radii.map(radius => (
                      <option key={radius} value={radius}>{radius}</option>
                    ))}
                  </select>
                </div>

                {/* Logo */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Logo (Emoji)</label>
                  <input 
                    type="text"
                    value={editForm.logoUrl}
                    onChange={(e) => setEditForm({...editForm, logoUrl: e.target.value})}
                    maxLength={2}
                    className="w-full px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm text-3xl text-center focus:ring-2 focus:ring-[#050a44] outline-none"
                  />
                </div>

                {/* Custom Domain */}
                <div>
                  <label className="block text-xs font-bold text-[#050a44] mb-1">Custom Domain</label>
                  <input 
                    type="text"
                    value={editForm.customDomain}
                    onChange={(e) => setEditForm({...editForm, customDomain: e.target.value})}
                    placeholder="operator.vivid.app"
                    className="w-full px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm focus:ring-2 focus:ring-[#050a44] outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-3 py-2 border border-[#c7c5d1] rounded-lg text-sm font-bold text-[#050a44] hover:bg-[#f2f4f6] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-3 py-2 bg-[#050a44] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-1">OPERATOR NAME</p>
                  <p className="font-bold text-[#050a44]">{branding.operatorName}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-1">CUSTOM DOMAIN</p>
                  <p className="font-bold text-[#050a44]">{branding.customDomain}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-2">COLORS</p>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded border-2 border-[#edeef0]" style={{ backgroundColor: branding.primaryColor }}></div>
                    <div className="w-8 h-8 rounded border-2 border-[#edeef0]" style={{ backgroundColor: branding.secondaryColor }}></div>
                    <div className="w-8 h-8 rounded border-2 border-[#edeef0]" style={{ backgroundColor: branding.accentColor }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-1">FONT</p>
                  <p className="font-bold text-[#050a44]">{branding.fontFamily}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#46464f] mb-1">BORDER RADIUS</p>
                  <p className="font-bold text-[#050a44]">{branding.borderRadius}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
