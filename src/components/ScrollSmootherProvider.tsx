"use client";

import { ReactNode, useEffect, useRef, useLayoutEffect } from "react";
import { usePathname } from "@/i18n/routing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

declare global {
  interface Window {
    __registerScrollTriggers?: (fn: () => void) => void;
  }
}

export default function ScrollSmootherProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const smootherRef = useRef<ReturnType<typeof ScrollSmoother.create> | null>(null);
  const readyRef = useRef<(() => void) | null>(null);

  // UseLayoutEffect fires BEFORE child useEffect, so ScrollSmoother is
  // ready before GSAP ScrollTriggers are created in child components.
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    smootherRef.current?.kill();
    ScrollTrigger.getAll().forEach((t) => t.kill());

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
      smoothTouch: 0.1,
    });

    ScrollTrigger.refresh();

    return () => {
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      smootherRef.current = null;
      gsap.set("body", { clearProps: "transform" });
    };
  }, [pathname]);

  // Export a callback so child components can register ScrollTriggers
  // AFTER ScrollSmoother has been created (via useLayoutEffect above).
  useEffect(() => {
    if (readyRef.current) {
      readyRef.current();
    }
  }, [pathname]);

  // Expose registration function via a global so child components
  // can call it from their useLayoutEffect to ensure they fire
  // AFTER our ScrollSmoother is ready.
  useEffect(() => {
    window.__registerScrollTriggers = (fn: () => void) => {
      readyRef.current = fn;
    };
  }, []);

  // Intercept all anchor clicks so we route them through the smoother
  const onAnchor = (e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const hash = target.getAttribute("href");
    if (!hash || !hash.startsWith("#")) return;
    const id = hash.slice(1);
    const section = document.getElementById(id);
    if (section && smootherRef.current) {
      e.preventDefault();
      smootherRef.current.scrollTo(section, true, "top top");
    }
  };

  useEffect(() => {
    document.addEventListener("click", onAnchor, true);
    return () => document.removeEventListener("click", onAnchor, true);
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
