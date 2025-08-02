"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/lib/header/header-navigation";
import Logo from "./logo";
import DesktopNav from "./desktop/desktop-navigation";
import DesktopActions from "./desktop/desktop-actions";
import MobileSheetMenu from "./mobile/mobile-sheetmenu";
import { AuthModal } from "../modal/login-modal";
import { RegisterModal } from "../modal/register-modal";
import { ContributionsModal } from "@/components/shared/contribution-modal";

type ModalType = "login" | "register" | "contrib" | null;

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const isScrolled = useScrolled(50);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);

  /* Handlers */
  const openModal = (type: Exclude<ModalType, null>) => setModal(type);
  const closeModal = () => setModal(null);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-primary backdrop-blur-xl border-b border-slate-700/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Logo />
          <DesktopNav />
          <DesktopActions session={session} status={status} openModal={openModal} />
          <MobileSheetMenu
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            session={session}
            status={status}
            openModal={openModal}
          />
        </div>
      </div>

      {/* Modales globales */}
      <AuthModal isOpen={modal === "login"} onOpenChange={(o) => (o ? openModal("login") : closeModal())} onSwitchToRegister={() => openModal("register")} />
      <RegisterModal isOpen={modal === "register"} onOpenChange={(o) => (o ? openModal("register") : closeModal())} onSwitchToLogin={() => openModal("login")} />
      <ContributionsModal open={modal === "contrib"} onOpenChange={(o) => (o ? openModal("contrib") : closeModal())} />
    </header>
  );
};
export default Header;