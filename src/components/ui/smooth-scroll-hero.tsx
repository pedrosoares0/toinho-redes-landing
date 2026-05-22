"use client";
import * as React from "react";
import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";

interface iISmoothScrollHeroProps {
	/**
	 * Height of the scroll section in pixels
	 * @default 1500
	 */
	scrollHeight: number;
	/**
	 * Background image URL for desktop view
	 */
	desktopImage: string;
	/**
	 * Background image URL for mobile view
	 */
	mobileImage: string;
	/**
	 * Initial clip path percentage
	 * @default 25
	 */
	initialClipPercentage?: number;
	/**
	 * Final clip path percentage
	 * @default 75
	 */
	finalClipPercentage?: number;
	/**
	 * Children to render inside the sticky container
	 */
	children?: React.ReactNode | ((progress: any) => React.ReactNode);
}

const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
	scrollHeight = 1500,
	desktopImage,
	mobileImage,
	initialClipPercentage = 25,
	finalClipPercentage = 75,
	children,
}) => {
	const targetRef = React.useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start start", "end end"],
	});

	// Clipping animation: happens in the first 60% of the scroll
	const clipStart = useTransform(
		scrollYProgress,
		[0, 0.6],
		[initialClipPercentage, 0],
	);
	const clipEnd = useTransform(
		scrollYProgress,
		[0, 0.6],
		[finalClipPercentage, 100],
	);

	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

	const backgroundSize = useTransform(
		scrollYProgress,
		[0, 0.6],
		["150%", "100%"],
	);

	return (
		<div
			ref={targetRef}
			className="relative w-full"
			style={{ height: `calc(${scrollHeight}px + 100vh)` }}
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
				{/* Background container with clipping */}
				<motion.div
					className="absolute inset-0 bg-black z-0"
					style={{
						clipPath,
					}}
				>
					{/* Background images */}
					<motion.div
						className="absolute inset-0 md:hidden"
						style={{
							backgroundImage: `url(${mobileImage})`,
							backgroundSize,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
					/>
					<motion.div
						className="absolute inset-0 hidden md:block"
						style={{
							backgroundImage: `url(${desktopImage})`,
							backgroundSize,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
					/>
				</motion.div>

				{/* Content container */}
				<div className="relative h-full w-full z-10">
					{typeof children === "function" ? children(scrollYProgress) : children}
				</div>
			</div>
		</div>
	);
};

export default SmoothScrollHero;
