"use client"

import { useScrolled } from "@/lib/header/header-navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import DesktopNav from "./desktop/desktop-navigation";
import DesktopActions from "./desktop/desktop-actions";
import MobileSheetMenu from "./mobile/mobile-sheetmenu";


type ModalType = "login" | "register" | "contribution" | null;

const Header: React.FC = () => {
    const isScrolled = useScrolled(50);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [modal, setModal] = useState<ModalType>(null);

    const openModal = (type: Exclude<ModalType, null>) => setModal(type);
    const closeModal = () => setModal(null);

    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled ? "bg-primary backdrop-blur-xl border-b border-secondary/50" : "bg-transparent"
        )} >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* TODO: Ajouter le logo */}
                    <DesktopNav />
                    <DesktopActions openModal={open} />
                    <MobileSheetMenu open={sheetOpen} onOpenChange={setSheetOpen} status={status} openModal={openModal} />
                </div>
            </div>

        {/* TODO: ajouter les modal login, register et contribution */ }

        </header>
    )
}

export default Header;