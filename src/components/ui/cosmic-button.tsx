import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type CosmicButtonProps<E extends "a" | "button" = "a"> = {
  /** The HTML element to render as. @default "a" */
  as?: E;
} & ComponentPropsWithoutRef<E>;

/**
 * Botão cósmico animado estilizado com a identidade visual da Toinho Redes:
 * - Gradiente animado em tons de azul (#0732C1, #1371F9, #80C2FD, #38bdf8)
 * - Fundo interno branco sólido
 * - Letra em azul escuro (#0732C1) em alta definição
 */
export function CosmicButton<E extends "a" | "button" = "a">({
  as,
  className,
  children,
  ...props
}: CosmicButtonProps<E>) {
  const Element = as ?? "a";
  const isAnchor = Element === "a";

  const baseClassName = cn(
    "group/cosmic relative inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-[15px] p-[3px] transition-transform",
    "focus-visible:ring-2 focus-visible:ring-brand-secondaryBlue focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none",
    className
  );

  const content = (
    <>
      {/* Borda cósmica animada em gradiente azul Toinho Redes - expande no hover */}
      <span className="absolute inset-0 overflow-hidden rounded-[15px] transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px] group-hover/cosmic:rounded-[15px]">
        <span className="animate-cosmic-spin absolute inset-[-200%] bg-[conic-gradient(from_0deg,#0732C1,#1371F9,#80C2FD,#38bdf8,#1371F9,#0732C1)] opacity-95" />
      </span>

      {/* Camada de brilho e reflexo azul sobreposto */}
      <span className="absolute inset-0 overflow-hidden rounded-[15px] opacity-60 mix-blend-soft-light transition-all duration-300 ease-out group-hover/cosmic:inset-[-3px] group-hover/cosmic:rounded-[15px]">
        <span className="animate-cosmic-spin-slow absolute inset-[-200%] bg-[conic-gradient(from_180deg,#80C2FD_0%,transparent_30%,#1371F9_50%,transparent_70%,#0732C1_100%)]" />
      </span>

      {/* Fundo interno branco com tipografia em azul escuro e sombra sutil */}
      <span className="bg-white relative z-10 flex items-center gap-2.5 rounded-[12px] px-6 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(7,50,193,0.18)] transition-all duration-300 group-hover/cosmic:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_16px_rgba(7,50,193,0.3)] active:scale-[0.98]">
        <span className="text-brand-blue font-avenue font-black text-xs sm:text-sm uppercase tracking-[0.22em]">
          {children ?? "ORÇAMENTO"}
        </span>
      </span>
    </>
  );

  if (isAnchor) {
    const { href, rel, target, ...rest } =
      props as ComponentPropsWithoutRef<"a">;
    return (
      <a
        className={baseClassName}
        href={href ?? "#"}
        rel={rel ?? "noopener noreferrer"}
        target={target ?? "_blank"}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={baseClassName}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  );
}

export default CosmicButton;
