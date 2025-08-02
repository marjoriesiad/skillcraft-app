"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MentionsModal } from './modal/mentions-modal';
import { ContactModal } from './modal/contact-modal';
import { PrivacyModal } from './modal/privacy-modal';
import { TermsModal } from './modal/terms-modal';

export const Footer: React.FC = () => {
  const [isMentionsModalOpen, setIsMentionsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <>
    <footer className="border-t px-6 py-6" style={{ backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          
          <p className="text-center md:text-left" style={{ color: '#6b7280' }}>
            &copy; {new Date().getFullYear()} SkillCraft.dev
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="transition-colors cursor-pointer text-white/50 hover:text-terra-primary"
            >
              Contact
            </button>
            <button 
              onClick={() => setIsTermsModalOpen(true)}
              className="transition-colors cursor-pointer text-white/50 hover:text-terra-primary"
            >
              CGU
            </button>
            <button 
              onClick={() => setIsPrivacyModalOpen(true)}
              className="transition-colors cursor-pointer text-white/50 hover:text-terra-primary"
            >
              Confidentialité
            </button>
            <button 
              onClick={() => setIsMentionsModalOpen(true)}
              className="transition-colors cursor-pointer text-white/50 hover:text-terra-primary"
            >
              Mentions légales
            </button>
          </div>
        </div>
      </div>
    </footer>
    
    {/* Modales */}
    <ContactModal 
      isOpen={isContactModalOpen} 
      onOpenChange={setIsContactModalOpen} 
    />
    <TermsModal 
      isOpen={isTermsModalOpen} 
      onOpenChange={setIsTermsModalOpen} 
    />
    <PrivacyModal 
      isOpen={isPrivacyModalOpen} 
      onOpenChange={setIsPrivacyModalOpen} 
    />
    <MentionsModal 
      isOpen={isMentionsModalOpen} 
      onOpenChange={setIsMentionsModalOpen} 
    />
    </>
  );
};