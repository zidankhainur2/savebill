'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import ApplianceCard from '@/components/appliances/ApplianceCard';
import ApplianceForm from '@/components/appliances/ApplianceForm';
import PresetModal from '@/components/appliances/PresetModal';
import { Plus, Plug, Sparkles, ArrowUpRight } from 'lucide-react';

export default function AppliancesPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [editingAppliance, setEditingAppliance] = useState(null);

  const { data: appliances = [], isLoading, isError } = useQuery({
    queryKey: queryKeys.appliances(),
    queryFn: () => api.get('/appliances'),
  });

  const createMutation = useMutation({
    mutationFn: (newApp) => api.post('/appliances', newApp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appliances() });
      queryClient.invalidateQueries({ queryKey: queryKeys.summary() });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedApp) => api.put(`/appliances/${updatedApp.id}`, updatedApp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appliances() });
      queryClient.invalidateQueries({ queryKey: queryKeys.summary() });
      setIsFormOpen(false);
      setEditingAppliance(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/appliances/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appliances() });
      queryClient.invalidateQueries({ queryKey: queryKeys.summary() });
    },
  });

  const handleFormSubmit = (data) => {
    if (editingAppliance) {
      updateMutation.mutate({ ...editingAppliance, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleSelectPreset = (presetData) => {
    setEditingAppliance(null);
    createMutation.mutate(presetData);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">Perangkat Listrik Rumah</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Kelola Perangkat</h1>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsPresetModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 text-emerald-900 bg-white hover:bg-white/80 transition-all text-xs font-medium shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Katalog Preset</span>
          </button>
          <button
            onClick={() => {
              setEditingAppliance(null);
              setIsFormOpen(true);
            }}
            className="pill-btn-dark !text-xs !py-1.5"
          >
            <span>Tambah Perangkat</span>
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 glass-card rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="glass-card rounded-3xl p-6 bg-red-50/80 border border-red-200 text-red-700 text-center text-sm">
          Gagal memuat daftar perangkat. Pastikan server API berjalan.
        </div>
      ) : appliances.length === 0 ? (
        <div className="glass-card rounded-[2.5rem] p-12 text-center space-y-4 border border-white/80">
          <div className="w-14 h-14 bg-emerald-900/10 text-emerald-900 rounded-full flex items-center justify-center mx-auto">
            <Plug className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-emerald-950">Belum Ada Perangkat</h3>
            <p className="text-xs text-emerald-900/60 max-w-sm mx-auto">
              Tambahkan perangkat elektronik rumah Anda untuk menghitung perkiraan tagihan PLN.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsPresetModalOpen(true)}
              className="px-5 py-2.5 rounded-full border border-black/5 text-emerald-900 bg-white font-medium text-xs hover:bg-emerald-900/5 transition-all"
            >
              Pilih dari Catalog Preset
            </button>
            <button
              onClick={() => {
                setEditingAppliance(null);
                setIsFormOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-emerald-900 text-white font-medium text-xs hover:bg-emerald-950 transition-all shadow-md"
            >
              Tambah Manual
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {appliances.map((app) => (
            <ApplianceCard
              key={app.id}
              appliance={app}
              onEdit={(a) => {
                setEditingAppliance(a);
                setIsFormOpen(true);
              }}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))}
        </div>
      )}

      {/* Form Modal */}
      <ApplianceForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingAppliance(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingAppliance}
        onOpenPresets={() => {
          setIsFormOpen(false);
          setIsPresetModalOpen(true);
        }}
      />

      {/* Preset Catalog Modal */}
      <PresetModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onSelectPreset={handleSelectPreset}
      />
    </div>
  );
}
