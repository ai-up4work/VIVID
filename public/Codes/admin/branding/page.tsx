'use client';
import React, { useState } from 'react';
import { SuperAdminLayout } from '../../../components/SuperAdminLayout';
import Link from 'next/link';

interface BrandingTemplate {
  id: string;
  operatorName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  logoUrl: string;
}

export default function BrandingPage() {
  const [templates, setTemplates] = useState<BrandingTemplate[]>([
    {
      id: '1',
      operatorName: 'Green Line Paribahan',
      primaryColor: '#050a44',
      secondaryColor: '#7a7fbb',
      accentColor: '#feb700',
      fontFamily: 'Inter',
      borderRadius: '12px',
      logoUrl: '🟢',
    },
    {
      id: '2',
      operatorName: 'Sohag Paribahan',
      primaryColor: '#dc2626',
      secondaryColor: '#fbbf24',
      accentColor: '#10b981',
      fontFamily: 'Poppins',
      borderRadius: '8px',
      logoUrl: '🔴',
    },
    {
      id: '3',
      operatorName: 'Shyamoli Express',
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      accentColor: '#fbbf24',
      fontFamily: 'Roboto',
      borderRadius: '16px',
      logoUrl: '🔵',
    },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<BrandingTemplate | null>(templates[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<BrandingTemplate>(templates[0]);

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplate) {
      setTemplates(templates.map(t => t.id === selectedTemplate.id ? editForm : t));
      setSelectedTemplate(editForm);
      setIsEditing(false);
    }
  };

  const handleCreateTemplate = () => {
    const newTemplate: BrandingTemplate = {
      id: Date.now().toString(),
      operatorName: 'New Operator',
      primaryColor: '#050a44',
      secondaryColor: '#7a7fbb',
      accentColor: '#feb700',
      fontFamily: 'Inter',
      borderRadius: '12px',
      logoUrl: '✨',
    };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
    setEditForm(newTemplate);
    setIsEditing(true);
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
    <SuperAdminLayout>
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-[#050a44]">Branding Management</h2>
          <p className="text-sm text-[#46464f]">Customize colors, logos, and themes for each operator</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Template List */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-6 h-fit">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#050a44]">Operators</h3>
              <button 
                onClick={handleCreateTemplate}
                className="p-2 bg-[#050a44] text-white rounded-lg hover:opacity-90 transition-opacity"
                title="Create new template"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setEditForm(template);
                    setIsEditing(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'bg-[#050a44] text-white'
                      : 'bg-[#f2f4f6] text-[#050a44] hover:bg-[#edeef0]'
                  }`}
                >
                  <p className="text-sm font-bold">{template.operatorName}</p>
                  <div className="flex gap-1 mt-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: template.primaryColor }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: template.secondaryColor }}></div>
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: template.accentColor }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor & Preview */}
          <div className="lg:col-span-3 space-y-6">
            {selectedTemplate && (
              <>
                {/* Preview Card */}
                <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-8">
                  <h3 className="text-lg font-bold text-[#050a44] mb-6">Live Preview</h3>
                  <div 
                    className="rounded-xl p-8 text-white transition-all"
                    style={{ 
                      backgroundColor: editForm.primaryColor,
                      fontFamily: editForm.fontFamily
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{editForm.logoUrl}</div>
                        <div>
                          <h1 className="text-2xl font-bold">{editForm.operatorName}</h1>
                          <p className="text-sm opacity-80">Premium Bus Transport</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button 
                        className="py-3 px-4 rounded-lg font-bold transition-all"
                        style={{ 
                          backgroundColor: editForm.accentColor,
                          color: editForm.primaryColor
                        }}
                      >
                        Book Now
                      </button>
                      <button 
                        className="py-3 px-4 rounded-lg font-bold border-2 transition-all"
                        style={{ 
                          backgroundColor: 'transparent',
                          borderColor: editForm.accentColor,
                          color: editForm.accentColor
                        }}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Secondary Color Preview */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div 
                      className="p-4 rounded-lg text-white text-center font-bold"
                      style={{ backgroundColor: editForm.secondaryColor }}
                    >
                      Secondary
                    </div>
                    <div 
                      className="p-4 rounded-lg text-center font-bold"
                      style={{ 
                        backgroundColor: editForm.accentColor,
                        color: editForm.primaryColor
                      }}
                    >
                      Accent
                    </div>
                    <div 
                      className="p-4 rounded-lg text-center font-bold border-2"
                      style={{ 
                        borderColor: editForm.primaryColor,
                        color: editForm.primaryColor
                      }}
                    >
                      Outline
                    </div>
                  </div>
                </div>

                {/* Editor Panel */}
                <div className="bg-white rounded-2xl border border-[#c7c5d1] shadow-sm p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-[#050a44]">Customize Branding</h3>
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
                    <form onSubmit={handleSaveTemplate} className="space-y-6">
                      {/* Operator Name */}
                      <div>
                        <label className="block text-sm font-bold text-[#050a44] mb-3">Operator Name</label>
                        <input 
                          type="text"
                          value={editForm.operatorName}
                          onChange={(e) => setEditForm({...editForm, operatorName: e.target.value})}
                          className="w-full px-4 py-3 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                        />
                      </div>

                      {/* Color Picker - Primary */}
                      <div>
                        <label className="block text-sm font-bold text-[#050a44] mb-3">Primary Color</label>
                        <div className="flex gap-2 mb-3 flex-wrap">
                          <input 
                            type="color"
                            value={editForm.primaryColor}
                            onChange={(e) => setEditForm({...editForm, primaryColor: e.target.value})}
                            className="w-12 h-12 rounded-lg cursor-pointer border border-[#c7c5d1]"
                          />
                          <input 
                            type="text"
                            value={editForm.primaryColor}
                            onChange={(e) => setEditForm({...editForm, primaryColor: e.target.value})}
                            className="flex-1 px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none font-mono text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
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
                              className="p-3 rounded-lg border-2 border-transparent hover:border-[#c7c5d1] transition-all"
                              title={palette.name}
                            >
                              <div className="flex gap-1">
                                <div className="w-3 h-3 rounded" style={{ backgroundColor: palette.primary }}></div>
                                <div className="w-3 h-3 rounded" style={{ backgroundColor: palette.secondary }}></div>
                                <div className="w-3 h-3 rounded" style={{ backgroundColor: palette.accent }}></div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Picker - Secondary */}
                      <div>
                        <label className="block text-sm font-bold text-[#050a44] mb-3">Secondary Color</label>
                        <div className="flex gap-2">
                          <input 
                            type="color"
                            value={editForm.secondaryColor}
                            onChange={(e) => setEditForm({...editForm, secondaryColor: e.target.value})}
                            className="w-12 h-12 rounded-lg cursor-pointer border border-[#c7c5d1]"
                          />
                          <input 
                            type="text"
                            value={editForm.secondaryColor}
                            onChange={(e) => setEditForm({...editForm, secondaryColor: e.target.value})}
                            className="flex-1 px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none font-mono text-sm"
                          />
                        </div>
                      </div>

                      {/* Color Picker - Accent */}
                      <div>
                        <label className="block text-sm font-bold text-[#050a44] mb-3">Accent Color</label>
                        <div className="flex gap-2">
                          <input 
                            type="color"
                            value={editForm.accentColor}
                            onChange={(e) => setEditForm({...editForm, accentColor: e.target.value})}
                            className="w-12 h-12 rounded-lg cursor-pointer border border-[#c7c5d1]"
                          />
                          <input 
                            type="text"
                            value={editForm.accentColor}
                            onChange={(e) => setEditForm({...editForm, accentColor: e.target.value})}
                            className="flex-1 px-4 py-2 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none font-mono text-sm"
                          />
                        </div>
                      </div>

                      {/* Font Family */}
                      <div>
                        <label className="block text-sm font-bold text-[#050a44] mb-3">Font Family</label>
                        <select 
                          value={editForm.fontFamily}
                          onChange={(e) => setEditForm({...editForm, fontFamily: e.target.value})}
                          className="w-full px-4 py-3 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                        >
                          {fonts.map(font => (
                            <option key={font} value={font}>{font}</option>
                          ))}
                        </select>
                      </div>

                      {/* Border Radius */}
                      <div>
                        <label className="block text-sm font-bold text-[#050a44] mb-3">Border Radius</label>
                        <select 
                          value={editForm.borderRadius}
                          onChange={(e) => setEditForm({...editForm, borderRadius: e.target.value})}
                          className="w-full px-4 py-3 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none"
                        >
                          {radii.map(radius => (
                            <option key={radius} value={radius}>{radius} (Roundness)</option>
                          ))}
                        </select>
                      </div>

                      {/* Logo Emoji */}
                      <div>
                        <label className="block text-sm font-bold text-[#050a44] mb-3">Logo (Emoji)</label>
                        <input 
                          type="text"
                          value={editForm.logoUrl}
                          onChange={(e) => setEditForm({...editForm, logoUrl: e.target.value})}
                          maxLength={2}
                          className="w-full px-4 py-3 border border-[#c7c5d1] rounded-lg focus:ring-2 focus:ring-[#050a44] outline-none text-3xl"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button 
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="flex-1 px-4 py-3 border border-[#c7c5d1] rounded-lg font-bold text-[#050a44] hover:bg-[#f2f4f6] transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="flex-1 px-4 py-3 bg-[#050a44] text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-[#46464f] font-bold mb-2">PRIMARY</p>
                        <div 
                          className="w-full h-20 rounded-lg border-2 border-[#edeef0]"
                          style={{ backgroundColor: editForm.primaryColor }}
                        ></div>
                        <p className="text-xs font-mono text-[#46464f] mt-2">{editForm.primaryColor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#46464f] font-bold mb-2">SECONDARY</p>
                        <div 
                          className="w-full h-20 rounded-lg border-2 border-[#edeef0]"
                          style={{ backgroundColor: editForm.secondaryColor }}
                        ></div>
                        <p className="text-xs font-mono text-[#46464f] mt-2">{editForm.secondaryColor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#46464f] font-bold mb-2">ACCENT</p>
                        <div 
                          className="w-full h-20 rounded-lg border-2 border-[#edeef0]"
                          style={{ backgroundColor: editForm.accentColor }}
                        ></div>
                        <p className="text-xs font-mono text-[#46464f] mt-2">{editForm.accentColor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#46464f] font-bold mb-2">DETAILS</p>
                        <div className="bg-[#f2f4f6] p-3 rounded-lg h-20 flex flex-col justify-center">
                          <p className="text-xs text-[#050a44]"><strong>Font:</strong> {editForm.fontFamily}</p>
                          <p className="text-xs text-[#050a44]"><strong>Radius:</strong> {editForm.borderRadius}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </SuperAdminLayout>
  );
}
