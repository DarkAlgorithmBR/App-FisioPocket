import React, { useState, useEffect } from 'react';
import { TabType, BottomNav } from './components/BottomNav';
import { Navbar } from './components/Navbar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { MapsView } from './components/views/MapsView';
import { SpecialTestsView } from './components/views/SpecialTestsView';
import { SoapView } from './components/views/SoapView';
import { ScalesView } from './components/views/ScalesView';
import { InternshipView } from './components/views/InternshipView';
import { MindMapViewerModal } from './components/MindMapViewerModal';
import { InstallAppModal } from './components/InstallAppModal';
import { MindMap } from './types';
import { StorageService } from './utils/storage';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('mapas');
  const [maps, setMaps] = useState<MindMap[]>(() => StorageService.getAllMaps());
  const [favorites, setFavorites] = useState<string[]>(() => StorageService.getFavorites());
  const [selectedMap, setSelectedMap] = useState<MindMap | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Listen for native PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Register service worker if available and on http/https
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('FisioPocket ServiceWorker registrado:', reg.scope))
        .catch((err) => console.log('Falha ao registrar ServiceWorker:', err));
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Toast helper
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = StorageService.toggleFavorite(id);
    setFavorites(updated);
    const isNowFav = updated.includes(id);
    showToast(
      isNowFav ? 'Adicionado aos seus favoritos!' : 'Removido dos favoritos.',
      isNowFav ? 'success' : 'info'
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Mobile-Centric Max Width Shell */}
      <div className="w-full max-w-lg mx-auto min-h-screen bg-slate-50 flex flex-col shadow-2xl relative border-x border-slate-200/60">
        {/* Top Navbar with Baixar App button */}
        <Navbar
          onOpenInstall={() => setIsInstallModalOpen(true)}
          mapsCount={maps.length}
        />

        {/* Main Content Area */}
        <main className="flex-grow p-4 overflow-y-auto">
          {activeTab === 'mapas' && (
            <MapsView
              maps={maps}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectMap={(map) => setSelectedMap(map)}
              onOpenInstall={() => setIsInstallModalOpen(true)}
            />
          )}

          {activeTab === 'testes' && <SpecialTestsView />}

          {activeTab === 'soap' && <SoapView onShowToast={showToast} />}

          {activeTab === 'escalas' && <ScalesView />}

          {activeTab === 'plantao' && <InternshipView onShowToast={showToast} />}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Full-Screen Mind Map Viewer Modal */}
        <MindMapViewerModal
          map={selectedMap}
          onClose={() => setSelectedMap(null)}
          isFavorite={selectedMap ? favorites.includes(selectedMap.id) : false}
          onToggleFavorite={handleToggleFavorite}
          onShowToast={showToast}
        />

        {/* PWA Mobile Install Modal */}
        <InstallAppModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
          deferredPrompt={deferredPrompt}
          onShowToast={showToast}
        />

        {/* Global Floating Toast Container */}
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    </div>
  );
}
export default App;
