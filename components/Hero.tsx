import type React from "react";
import { GradientWave } from "./ui/gradient-wave";

export const Hero: React.FC = () => {
	return (
		<section
			className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-[110px] pb-[60px]"
			id="top"
		>
			{/* WebGL GradientWave Background: Strictly in background behind all text/CTAs */}
			<GradientWave
				className="absolute inset-0 w-full h-full -z-10"
				colors={["#2b080c", "#4a0e17", "#721422", "#1a0b0b", "#d4af37"]}
				isPlaying={true}
			/>

			{/* Foreground Hero Content: Fully interactive, high-contrast, untouched typography */}
			<div className="relative z-10 flex flex-col items-center text-center w-full max-w-[900px] mx-auto px-6">
				<h1 className="font-serif text-[clamp(56px,11vw,132px)] font-medium leading-[0.95] tracking-[0.04em] text-[#F0EFEB] mb-4 whitespace-nowrap">
					KURO<span className="text-[#d4af37]">.</span>
				</h1>

				<div className="font-sans text-[14px] font-semibold tracking-[0.04em] uppercase text-[#d4af37] mb-4">
					Independent Creative Studio
				</div>

				<p className="font-serif text-[22px] font-medium text-[#F0EFEB] leading-[1.35] mb-5">
					<span className="block">We Build Brands.</span>
					<span className="block">We Create Experiences.</span>
					<span className="block">We Make You Impossible to Ignore.</span>
				</p>

				<p className="text-[16px] text-[#B7A092] leading-[1.65] max-w-[52ch] mx-auto mb-8 text-pretty">
					From strategy and storytelling to websites, social media, shoots,
					editing, and advertising &mdash; we bring every part of your brand
					together to create work that stands out.
				</p>

				<div className="flex flex-wrap items-center justify-center gap-4">
					<a
						href="#works"
						className="inline-flex items-center justify-center gap-3 font-sans text-[14px] font-semibold px-8 py-4 rounded-full bg-[#d4af37] text-[#180E13] transition-all hover:bg-[#e2c153] hover:-translate-y-0.5"
					>
						Explore Our Work{" "}
						<span className="transition-transform group-hover:translate-x-1">
							&rarr;
						</span>
					</a>
					<a
						href="#contact"
						className="inline-flex items-center justify-center gap-3 font-sans text-[14px] font-semibold px-8 py-4 rounded-full bg-[#24111B] text-[#F0EFEB] transition-all hover:bg-[#421725] hover:text-[#d4af37] hover:-translate-y-0.5"
					>
						Let's Talk
					</a>
				</div>
			</div>
		</section>
	);
};

export default Hero;
