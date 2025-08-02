"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-primary border-secondary max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-terra-primary mb-4 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Conditions Générales d&apos;Utilisation
          </DialogTitle>
          <p className="text-gray-400 mb-6">
            Dernière mise à jour : 20 juillet 2025
          </p>
        </DialogHeader>

        <section className="space-y-6 text-gray-300 leading-relaxed text-justify">
          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">1. Objet</h2>
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») ont pour objet de définir les modalités et conditions dans lesquelles les utilisateurs accèdent et utilisent la plateforme SkillCraft, mise à disposition par son éditeur.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">2. Acceptation des conditions</h2>
            <p>
              L&apos;accès à la plateforme SkillCraft est subordonné à l&apos;acceptation pleine, entière et sans réserve des présentes CGU. Tout utilisateur s&apos;engage, en s&apos;inscrivant ou en naviguant sur le site, à respecter les présentes dispositions. À défaut, l&apos;utilisation du service devra être immédiatement interrompue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">3. Compte utilisateur</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Lors de la création d&apos;un compte, l&apos;utilisateur garantit fournir des informations exactes, complètes et à jour.
              </li>
              <li>
                Il est strictement interdit d&apos;usurper l&apos;identité d&apos;un tiers ou de créer plusieurs comptes sans autorisation préalable.
              </li>
              <li>
                Le compte utilisateur est et demeure la propriété exclusive de SkillCraft. L&apos;utilisateur ne dispose que d&apos;un droit d&apos;usage personnel, révocable, non exclusif et non transférable, aux fins d&apos;accéder aux services proposés.
              </li>
              <li>
                L&apos;utilisateur est seul responsable de la confidentialité de ses identifiants de connexion et de toute activité effectuée via son compte.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">4. Utilisation de la plateforme</h2>
            <p>
              L&apos;utilisation de SkillCraft doit être conforme aux lois et règlements en vigueur ainsi qu&apos;aux règles de bonne conduite numérique. Il est notamment interdit de :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Diffuser tout contenu illégal, diffamatoire, injurieux, menaçant ou discriminatoire ;</li>
              <li>Utiliser la plateforme à des fins commerciales sans autorisation expresse écrite ;</li>
              <li>Porter atteinte au bon fonctionnement technique du site, à sa sécurité ou à ses utilisateurs.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">5. Projets et contributions</h2>
            <p>
              Les utilisateurs peuvent publier des projets et renseigner des compétences. À ce titre, ils s&apos;engagent à ne soumettre que des contenus originaux ou libres de droits. SkillCraft se réserve un droit de modération sur tout contenu publié et pourra le retirer sans préavis s&apos;il contrevient aux présentes CGU ou à la législation applicable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">6. Propriété intellectuelle</h2>
            <p>
              La structure générale de la plateforme, les textes, les éléments graphiques, le logo ainsi que l&apos;ensemble des contenus originaux mis à disposition sont protégés au titre du droit d&apos;auteur et demeurent la propriété exclusive de SkillCraft. Toute reproduction, représentation ou exploitation, même partielle, sans autorisation expresse, est strictement interdite.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">7. Responsabilité</h2>
            <p>
              SkillCraft met en œuvre tous les moyens raisonnables pour assurer le bon fonctionnement de la plateforme. Néanmoins, l&apos;éditeur ne saurait être tenu responsable d&apos;une interruption temporaire du service, de pertes de données ou de tout dommage indirect consécutif à l&apos;utilisation du site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">8. Données personnelles</h2>
            <p>
              Les données personnelles collectées via SkillCraft sont traitées conformément à la réglementation en vigueur. Aucune donnée ne sera cédée à des tiers sans consentement explicite de l&apos;utilisateur. Pour plus d&apos;informations, veuillez consulter notre Politique de Confidentialité.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">9. Modifications des CGU</h2>
            <p>
              SkillCraft se réserve le droit de modifier les présentes CGU à tout moment. En cas de changement substantiel, une notification pourra être envoyée aux utilisateurs. La poursuite de l&apos;utilisation de la plateforme après modification vaut acceptation des nouvelles conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-terra-primary mb-2">10. Contact</h2>
            <p>
              Pour toute demande d&apos;information ou réclamation relative à l&apos;utilisation de la plateforme, vous pouvez nous contacter à l&apos;adresse suivante :{" "}
              <span className="text-terra-primary">contact@skillcraft.dev</span>.
            </p>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}