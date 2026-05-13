"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "@/i18n/routing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ScrollSmootherProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const smootherRef = useRef<ReturnType<typeof ScrollSmoother.create> | null>(null);

  useEffect(() => {
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

    // Intercept all anchor clicks so we route them through the smoother
    // instead of the browser's native jump which desyncs the transform.
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

    document.addEventListener("click", onAnchor, true);

    return () => {
      document.removeEventListener("click", onAnchor, true);
      smootherRef.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      smootherRef.current = null;
      // Restore body transform GSAP applies
      gsap.set("body", { clearProps: "transform" });
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
