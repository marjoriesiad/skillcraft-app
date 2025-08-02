// Boutons & infos utilisateurs du header
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface Props {
    openModal: (type: "login" | "register" | "contribution") => void;

}

const DesktopActions: React.FC<Props> = ({openModal}) => {
    return (
        <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={openModal("contribution")} className="text-terra-primary hover:text-terra-secondary hover:bg-terra-primary/10" titme="Soutenir SkillCraft">
                <Crown className="<-5 h-5" />
            </Button>


            {/* TODO: Ajouter les status (loading + session: display name & déconnexion) */}


            <Button onClick={() => openModal("login")} className="border border-terra-primary text-terra-primary hover:bg-terra-primary hover:text-white rounded-lg px-6">Connexion</Button>
        </div>
    )
}

export default DesktopActions;