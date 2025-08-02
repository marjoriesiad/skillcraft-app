"use client";

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { RegisterModal } from "@/components/landing-page/modal/register-modal"

const FinalCTASection = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  return (
    <div className="py-24" id="final-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Titre principal */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
          Prêt à rejoindre l&apos;aventure ?
        </h2>
        
        {/* Sous-titre */}
        <p className="text-white/70 text-xl md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Votre équipe vous attend. Votre prochain projet aussi. Il ne manque plus que vous.
        </p>
        
        {/* Bouton CTA principal */}
        <div className="mb-8">
          <Button 
            size="lg"
            className="bg-terra-primary hover:bg-terra-secondary px-8 py-6 text-lg cursor-pointer"
            onClick={() => setIsRegisterModalOpen(true)}>
            <Zap className="mr-3 h-6 w-6" />
            Commencer gratuitement
          </Button>
        </div>
        
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onOpenChange={setIsRegisterModalOpen}
        />
        
        {/* Ligne de réassurance */}
        <div className="flex items-center justify-center gap-6 text-white/50 text-sm md:text-base">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terra-primary rounded-full"></div>
            Gratuit
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terra-primary rounded-full"></div>
            Sans engagement
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terra-primary rounded-full"></div>
            Communauté bienveillante
          </span>
        </div>
      </div>
    </div>
  )
}

export default FinalCTASection