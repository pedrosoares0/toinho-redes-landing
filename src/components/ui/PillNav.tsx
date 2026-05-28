import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Sun, Moon, Menu, X, ArrowUpRight, MapPin, Instagram, MessageCircle } from 'lucide-react';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#120F17',
  hoveredPillTextColor = '#120F17',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);



  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

  useEffect(() => {
    localStorage.removeItem('theme');
    document.documentElement.classList.remove('dark');

    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => { });
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const menu = mobileMenuRef.current;

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: -50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power4.out",
          }
        );

        const items = menu.querySelectorAll('li.mobile-item');
        gsap.fromTo(items,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: "back.out(1.5)",
            delay: 0.15
          }
        );

        const footer = menu.querySelector('.mobile-footer');
        if (footer) {
          gsap.fromTo(footer,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.35 }
          );
        }

        const blobs = menu.querySelectorAll('.ambient-blob');
        gsap.fromTo(blobs,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.1, duration: 1.2, ease: "power3.out", delay: 0.1 }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: -50,
          duration: 0.4,
          ease: "power4.in",
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px'
  } as React.CSSProperties;

  const showNavbar = isVisible || isMobileMenuOpen;

  return (
    <>
      {/* Mobile Backdrop Overlay - Rendered outside transforming parent to prevent stacking context constraints */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-md md:hidden transition-opacity duration-300 z-[1005] ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => toggleMobileMenu()}
      />

      {/* MOBILE Menu Overlay - Rendered outside transforming parent so it covers full viewport smoothly */}
      <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 w-screen h-screen z-[1010] backdrop-blur-sm bg-white/95 dark:bg-brand-darkBlue/98 border-b border-brand-blue/10 dark:border-white/5 overflow-hidden pointer-events-auto flex flex-col justify-between pt-6 pb-10 px-8"
        style={{
          ...cssVars,
          visibility: 'hidden'
        }}
      >
        {/* Grain overlay for tactical texture */}
        <div className="absolute inset-0 z-[-1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

        {/* Ambient Gradient Mesh Blobs for depth */}
        <div className="ambient-blob absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-blue/15 dark:bg-brand-blue/10 blur-[100px] pointer-events-none" />
        <div className="ambient-blob absolute bottom-[10%] right-[-10%] w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] rounded-full bg-brand-secondaryBlue/10 dark:bg-brand-secondaryBlue/5 blur-[80px] pointer-events-none" />
        <div className="ambient-blob absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[300px] max-h-[300px] rounded-full bg-brand-lightBlue/10 dark:bg-brand-lightBlue/5 blur-[60px] pointer-events-none" />

        {/* Integrated Header */}
        <div className="w-full flex items-center justify-between relative z-10 mb-6 mt-1">
          <img src="logoToinho.png" alt="Toinho Redes" className="h-7 w-auto object-contain dark:brightness-0 dark:invert" />
          <button
            onClick={() => toggleMobileMenu()}
            className="w-10 h-10 rounded-full inline-flex items-center justify-center bg-brand-blue/5 dark:bg-white/10 text-brand-blue dark:text-white border border-brand-blue/10 dark:border-white/10 active:scale-95 transition-all"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="list-none m-0 p-0 flex flex-col gap-5 w-full relative z-10">
          {items.map((item, i) => {
            const isActive = activeHref === item.href;
            const formattedIndex = String(i + 1).padStart(2, '0');

            const linkClasses = ` 
              group/item flex items-baseline justify-between w-full py-3 border-b border-brand-blue/10 dark:border-white/5 transition-all duration-300
            `;

            const itemContent = (
              <>
                <div className="flex items-baseline gap-4">
                  <span className={`font-behind text-2xl italic tracking-wide transition-colors duration-300 ${isActive ? 'text-brand-secondaryBlue' : 'text-brand-blue/30 dark:text-white/20 group-hover/item:text-brand-secondaryBlue/60'}`}>
                    {formattedIndex}
                  </span>
                  <span className={`font-avenue text-3xl font-black uppercase tracking-wider transition-all duration-300 ${isActive ? 'text-brand-blue dark:text-brand-lightBlue scale-[1.03] origin-left' : 'text-brand-blue/80 dark:text-white/80 group-hover/item:text-brand-secondaryBlue dark:group-hover/item:white group-hover/item:translate-x-2'}`}>
                    {item.label}
                  </span>
                </div>
                <ArrowUpRight
                  size={20}
                  className={`transition-all duration-300 ${isActive ? 'text-brand-secondaryBlue translate-x-0 opacity-100' : 'text-brand-blue/0 dark:text-white/0 -translate-x-4 opacity-0 group-hover/item:text-brand-secondaryBlue dark:group-hover/item:white group-hover/item:translate-x-0 group-hover/item:opacity-100'}`}
                />
              </>
            );

            return (
              <li key={item.href} className="mobile-item w-full overflow-hidden">
                {isRouterLink(item.href) ? (
                  <Link
                    to={item.href}
                    className={linkClasses}
                    onClick={() => toggleMobileMenu()}
                  >
                    {itemContent}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    onClick={() => toggleMobileMenu()}
                  >
                    {itemContent}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Footer of mobile menu - Dashboard style */}
        <div className="mobile-footer border-t border-brand-blue/10 dark:border-white/5 pt-6 w-full flex flex-col gap-6 relative z-10">
          <div className="flex justify-between items-center">
            {/* Status indicators */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-sans font-black text-brand-blue/30 dark:text-white/30 uppercase tracking-[0.2em]">Localização</span>
              <div className="flex items-center gap-1.5 text-brand-blue dark:text-white/80">
                <MapPin size={12} className="text-brand-secondaryBlue" />
                <span className="text-[11px] font-sans font-black uppercase tracking-[0.1em]">Salvador - BA</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-end">
              <span className="text-[9px] font-sans font-black text-brand-blue/30 dark:text-white/30 uppercase tracking-[0.2em]">Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] font-sans font-black text-brand-blue/80 dark:text-white/80 uppercase tracking-[0.1em]">Disponível</span>
              </div>
            </div>
          </div>

          {/* Quick contact buttons */}
          <div className="flex gap-3 w-full">
            <a
              href="https://wa.me/5571987974822"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500/5 hover:bg-green-500 hover:text-white text-green-600 dark:text-green-400 border border-green-500/20 hover:border-green-500 px-4 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black font-sans tracking-widest uppercase active:scale-95 transition-all duration-300 shadow-sm group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/toinhoredessalvador/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-brand-blue/5 hover:bg-brand-blue hover:text-white text-brand-blue dark:text-white/80 border border-brand-blue/10 hover:border-brand-blue px-4 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black font-sans tracking-widest uppercase active:scale-95 transition-all duration-300 shadow-sm group"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:scale-110">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
          </div>

          <div className="flex justify-between items-center text-[9px] font-sans font-black text-brand-blue/30 dark:text-white/30 uppercase tracking-[0.25em]">
            <span>© 2026 Toinho Redes</span>
            <span>Liderança Absoluta</span>
          </div>
        </div>
      </div>

      {/* DESKTOP/MOBILE Navigation Bar Trigger Wrapper */}
      <div className={`fixed top-[1em] z-[1000] w-full flex justify-center px-4 pointer-events-none transition-transform duration-500 ${
        showNavbar ? 'translate-y-0' : '-translate-y-24'
      }`}>
        {/* MOBILE Standalone Circular Buttons */}
        <div className={`w-full flex md:hidden items-center justify-between pointer-events-none transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'}`}>
          {isRouterLink(items?.[0]?.href) ? (
            <Link
              to={items[0].href}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={el => { logoRef.current = el; }}
              className="w-12 h-12 rounded-full p-2.5 inline-flex items-center justify-center overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-md bg-white/20 dark:bg-black/40 border border-white/30 dark:border-white/10 pointer-events-auto active:scale-95 transition-all"
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-contain block" />
            </Link>
          ) : (
            <a
              href={items?.[0]?.href || '#'}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={el => { logoRef.current = el; }}
              className="w-12 h-12 rounded-full p-2.5 inline-flex items-center justify-center overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-md bg-white/20 dark:bg-black/40 border border-white/30 dark:border-white/10 pointer-events-auto active:scale-95 transition-all"
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-contain block" />
            </a>
          )}

          <div className="flex items-center gap-2 pointer-events-auto">


            <button
              ref={hamburgerRef}
              onClick={toggleMobileMenu}
              className="w-12 h-12 rounded-full inline-flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-md bg-white/20 dark:bg-black/40 border border-white/30 dark:border-white/10 text-brand-blue dark:text-brand-lightBlue active:scale-95 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* DESKTOP Pill Navigation Bar */}
        <nav
          className="hidden md:flex items-center justify-start box-border pointer-events-auto backdrop-blur-md bg-white/20 dark:bg-black/30 border border-white/30 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-full relative overflow-visible group"
          aria-label="Primary"
          style={cssVars}
        >
          <div className="absolute inset-0 z-[-1] opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat rounded-full" />

          {isRouterLink(items?.[0]?.href) ? (
            <Link
              to={items[0].href}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              role="menuitem"
              ref={el => {
                logoRef.current = el;
              }}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden shadow-sm backdrop-blur-sm bg-white/5 border border-white/10"
              style={{
                width: 'var(--nav-h)',
                height: 'var(--nav-h)'
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
            </Link>
          ) : (
            <a
              href={items?.[0]?.href || '#'}
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={el => {
                logoRef.current = el;
              }}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden shadow-sm backdrop-blur-sm bg-white/5 border border-white/10"
              style={{
                width: 'var(--nav-h)',
                height: 'var(--nav-h)'
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover block" />
            </a>
          )}

          <div
            ref={navItemsRef}
            className="relative items-center rounded-full flex ml-2 shadow-sm backdrop-blur-sm bg-white/5 border border-white/10"
            style={{
              height: 'var(--nav-h)'
            }}
          >
            <ul
              role="menubar"
              className="list-none flex items-stretch m-0 p-[3px] h-full"
              style={{ gap: 'var(--pill-gap)' }}
            >
              {items.map((item, i) => {
                const isActive = activeHref === item.href;

                const pillStyle: React.CSSProperties = {
                  background: 'transparent',
                  color: 'var(--pill-text, var(--base, #000))',
                  paddingLeft: 'var(--pill-pad-x)',
                  paddingRight: 'var(--pill-pad-x)'
                };

                const PillContent = (
                  <>
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{
                        background: 'var(--base)',
                        willChange: 'transform'
                      }}
                      aria-hidden="true"
                      ref={el => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack relative inline-block leading-[1] z-[2]">
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: 'transform' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: 'var(--hover-text, #fff)',
                          willChange: 'transform, opacity'
                        }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                    {isActive && (
                      <span
                        className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                        style={{ background: 'var(--base)' }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                );

                const basePillClasses =
                  'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-bold text-[13px] leading-[0] uppercase tracking-[0.5px] whitespace-nowrap cursor-pointer px-0';

                return (
                  <li key={item.href} role="none" className="flex h-full">
                    {isRouterLink(item.href) ? (
                      <Link
                        role="menuitem"
                        to={item.href}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        {PillContent}
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        className={basePillClasses}
                        style={pillStyle}
                        aria-label={item.ariaLabel || item.label}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                      >
                        {PillContent}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>


        </nav>
      </div>
    </>
  );
};
export default PillNav;
