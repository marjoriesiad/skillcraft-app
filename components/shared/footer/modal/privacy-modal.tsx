"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary border-secondary max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-terra-primary mb-4 flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Politique de Confidentialité
          </DialogTitle>
          <p className="text-gray-400 mb-6">
            Dernière mise à jour : 20 juillet 2025
          </p>
        </DialogHeader>

        <section className="space-y-6 text-gray-300 leading-relaxed text-justify">
          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">1. Introduction</h2>
            <p>
              La présente Politique de Confidentialité a pour objet d&apos;informer les utilisateurs de la plateforme SkillCraft des modalités de collecte, d&apos;utilisation, de conservation et de protection de leurs données personnelles conformément à la législation en vigueur.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">2. Données collectées</h2>
            <p>Les données suivantes peuvent être collectées : </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Identité : prénom, nom, pseudonyme ;</li>
              <li>Coordonnées : adresse e-mail ;</li>
              <li>Informations de connexion : identifiants, logs, adresse IP ;</li>
              <li>Informations liées à l&apos;utilisation de la plateforme (projets, compétences, interactions).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">3. Finalité du traitement</h2>
            <p>
              Les données personnelles collectées sont nécessaires au bon fonctionnement de la plateforme et sont utilisées pour :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Gérer les comptes utilisateurs ;</li>
              <li>Permettre la participation aux projets et interactions communautaires ;</li>
              <li>Améliorer les services proposés et l&apos;expérience utilisateur ;</li>
              <li>Assurer la sécurité du site et prévenir les comportements abusifs.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">4. Durée de conservation</h2>
            <p>
              Les données sont conservées pendant toute la durée d&apos;utilisation du service par l&apos;utilisateur, et peuvent être archivées ou supprimées sur demande ou à la clôture du compte, sauf obligations légales contraires.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">5. Partage des données</h2>
            <p>
              Les données ne sont jamais vendues ni cédées à des tiers. Certaines données peuvent être partagées avec des prestataires techniques pour assurer le fonctionnement du service (ex. : hébergement, messagerie), dans le respect de la présente politique.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">6. Sécurité</h2>
            <p>
              SkillCraft met en œuvre des mesures de sécurité techniques et organisationnelles adaptées pour protéger les données contre toute perte, accès non autorisé, altération ou divulgation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">7. Droits des utilisateurs</h2>
            <p>
              Conformément à la réglementation applicable, vous disposez des droits suivants concernant vos données personnelles :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Droit d&apos;accès, de rectification, d&apos;effacement ;</li>
              <li>Droit à la limitation du traitement ;</li>
              <li>Droit d&apos;opposition ;</li>
              <li>Droit à la portabilité des données.</li>
            </ul>
            <p className="mt-2">
              Vous pouvez exercer ces droits en nous contactant à l&apos;adresse suivante : <span className="text-terra-primary">contact@skillcraft.dev</span>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">8. Modification de la politique</h2>
            <p>
              La présente Politique de Confidentialité est susceptible d&apos;évoluer à tout moment. Les utilisateurs seront informés en cas de modification substantielle. L&apos;utilisation continue des services vaut acceptation de la version en vigueur.
            </p>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}