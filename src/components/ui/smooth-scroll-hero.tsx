"use client";
import * as React from "react";
import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
	type MotionValue,
} from "motion/react";
import { useIsMobile } from "@/lib/hooks";

interface iISmoothScrollHeroProps {
	/** Altura (px) da área de scroll no desktop @default 1500 */
	scrollHeight: number;
	/** Altura (px) da área de scroll no mobile @default scrollHeight */
	mobileScrollHeight?: number;
	/** Imagem de fundo (desktop) */
	desktopImage: string;
	/** Imagem de fundo (mobile) */
	mobileImage: string;
	/** Porcentagem inicial do clip-path @default 25 */
	initialClipPercentage?: number;
	/** Porcentagem final do clip-path @default 75 */
	finalClipPercentage?: number;
	/** Conteúdo dentro do container sticky. */
	children?: React.ReactNode | ((progress: MotionValue<number>, isMobile: boolean) => React.ReactNode);
}

const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	mobileScrollHeight,
	desktopImage,
	mobileImage,
	initialClipPercentage = 25,
	finalClipPercentage = 75,
	children,
}) => {
	const isMobile = useIsMobile();
	const height = isMobile ? (mobileScrollHeight ?? scrollHeight) : scrollHeight;

	const targetRef = React.useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start start", "end end"],
	});

	// ---------- Desktop: clip-path que abre + zoom out ----------
	const clipStart = useTransform(scrollYProgress, [0, 0.6], [initialClipPercentage, 0]);
	const clipEnd = useTransform(scrollYProgress, [0, 0.6], [finalClipPercentage, 100]);
	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
	const desktopScale = useTransform(scrollYProgress, [0, 0.6], [1.35, 1]);
	// Scrim escuro dinâmico para garantir contraste impecável com o texto
	const desktopVeil = useTransform(scrollYProgress, [0.35, 0.65], [0.45, 0.82]);

	// ---------- Mobile: card que cresce até preencher a tela ----------
	const mobileCardScale = useTransform(scrollYProgress, [0, 0.35], [0.88, 1]);
	const mobileRadius = useTransform(scrollYProgress, [0, 0.35], [28, 0]);
	const mobileImageScale = useTransform(scrollYProgress, [0, 0.4], [1.2, 1]);
	const mobileVeil = useTransform(scrollYProgress, [0.15, 0.38], [0.5, 0.85]);

	return (
		<div
			ref={targetRef}
			className="relative w-full"
			style={{ height: `calc(${height}px + 100svh)` }}
		>
			<div className="sticky top-0 h-svh w-full overflow-hidden bg-brand-darkBlue transition-colors duration-300">
				{isMobile ? (
					<motion.div
						className="absolute inset-0 z-0 overflow-hidden bg-black will-change-transform"
						style={{ scale: mobileCardScale, borderRadius: mobileRadius }}
					>
						<motion.img
							src={mobileImage}
							alt=""
							aria-hidden="true"
							decoding="async"
							className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
							style={{ scale: mobileImageScale }}
						/>
						{/* Scrim escuro cinematográfico */}
						<motion.div
							className="absolute inset-0 bg-gradient-to-t from-brand-darkBlue via-black/80 to-brand-darkBlue/90"
							style={{ opacity: mobileVeil }}
						/>
					</motion.div>
				) : (
					<motion.div className="absolute inset-0 bg-black z-0" style={{ clipPath }}>
						<motion.img
							src={desktopImage}
							alt=""
							aria-hidden="true"
							decoding="async"
							className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
							style={{ scale: desktopScale }}
						/>
						{/* Scrim escuro progressivo + vinheta superior e inferior */}
						<motion.div
							className="absolute inset-0 bg-gradient-to-t from-brand-darkBlue/95 via-black/75 to-brand-darkBlue/85"
							style={{ opacity: desktopVeil }}
						/>
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,8,31,0.6)_100%)] pointer-events-none" />
					</motion.div>
				)}

				{/* Content container */}
				<div className="relative h-full w-full z-10">
					{typeof children === "function" ? children(scrollYProgress, isMobile) : children}
				</div>
			</div>
		</div>
	);
};

export default SmoothScrollHero;
