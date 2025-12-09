'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocusManager } from '@/design-system/utils/focus-management';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children 
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusManager = useRef(new FocusManager());
  
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    
    const manager = focusManager.current;
    manager.saveFocus();
    const cleanup = manager.trapFocus(modalRef.current);
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      cleanup();
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      manager.restoreFocus();
    };
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby={description ? "modal-description" : undefined}
              className="bg-white text-black border-2 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 sm:mx-0"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 sm:p-6 border-b-2 border-black flex items-center justify-between gap-4">
                <h2 id="modal-title" className="font-bebas text-2xl sm:text-3xl uppercase">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {description && (
                <p id="modal-description" className="p-4 sm:p-6 border-b-2 border-black">
                  {description}
                </p>
              )}
              
              <div className="p-4 sm:p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
