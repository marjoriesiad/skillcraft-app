"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MentionsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MentionsModal: React.FC<MentionsModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary border-secondary max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-terra-primary mb-4">
            Mentions Légales
          </DialogTitle>
          <p className="text-gray-400 mb-6">
            Conformément aux articles 6-III et 19 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN)
          </p>
        </DialogHeader>

        <section className="space-y-6 text-gray-300 leading-relaxed text-justify">
          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">1. Éditeur du site</h2>
            <p>
              Le site SkillCraft est édité par :
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Nom ou raison sociale : SkillCraft</li>
              <li>Statut : Projet personnel non déclaré à ce jour</li>
              <li>Responsable de la publication : Marjorie SIAD</li>
              <li>Adresse e-mail : <span className="text-terra-primary">contact@skillcraft.dev</span></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">2. Hébergement</h2>
            <p>
              Le site est hébergé par :
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Prestataire : Vercel Inc.</li>
              <li>Siège social : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-terra-primary underline">vercel.com</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">3. Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur le site SkillCraft (textes, images, graphismes, logo, icônes, etc.) sont protégés par le droit d&apos;auteur et demeurent la propriété exclusive de leur auteur, sauf indication contraire.
              Toute reproduction, distribution, modification ou adaptation, sans autorisation écrite préalable, est strictement interdite.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">4. Responsabilité</h2>
            <p>
              L&apos;éditeur s&apos;efforce de fournir des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes ou carences dans la mise à jour, qu&apos;elles soient de son fait ou du fait de tiers partenaires.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">5. Contact</h2>
            <p>
              Pour signaler un contenu inapproprié ou poser une question concernant le site, vous pouvez écrire à : <span className="text-terra-primary">contact@skillcraft.dev</span>
            </p>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}