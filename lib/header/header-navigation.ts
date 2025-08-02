export const navigationItems = [
  { title: "Le concept", href: "/#concept" },
  { title: "Comment ça marche", href: "/#process-section" },
  { title: "Communauté", href: "/#community" },
  { title: "FAQ", href: "/#faq" },
];

// TODO: Ajouter le displayName lorsque l'auth sera fonctionnel


// HOOK: renvoie true si window.scrollY dépasse le seuil
import { useEffect, useState } from "react";

export const useScrolled = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    // appel initial pour les pages ouvertes plus bas que 0
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}