"use client";

import type React from "react";
import { useEffect, useRef } from "react";

export interface GradientWaveProps {
	colors?: string[];
	noiseSpeed?: number;
	className?: string;
}

export const GradientWave: React.FC<GradientWaveProps> = ({
	colors = ["#2b080c", "#4a0e17", "#721422", "#1a0b0b", "#d4af37"],
	noiseSpeed = 0.000009,
	className = "absolute inset-0 w-full h-full -z-10 pointer-events-none",
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl =
			canvas.getContext("webgl") ||
			(canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

		if (!gl) {
			console.warn(
				"WebGL not supported; falling back to dark burgundy background.",
			);
			canvas.style.backgroundColor = colors[0] || "#2b080c";
			return;
		}

		const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_pos + 1.0) * 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

		const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform vec3 u_color4;
      uniform vec3 u_color5;
      varying vec2 v_uv;

      float waveHeight(vec2 p, float t) {
        vec2 q = vec2(
          sin(p.x * 2.2 + p.y * 1.4 + t * 0.35),
          cos(p.x * 1.7 - p.y * 2.0 + t * 0.28)
        );
        vec2 r = vec2(
          sin(p.x * 2.8 + q.y * 2.2 - t * 0.22),
          cos(q.x * 2.4 + p.y * 2.6 + t * 0.26)
        );

        float d1 = p.x * 0.75 + p.y * 1.15;
        float d2 = p.x * 1.25 - p.y * 0.65;

        float w1 = sin(d1 * 2.5 + r.x * 1.6 + t * 0.32);
        float w2 = cos(d2 * 2.2 + r.y * 1.5 - t * 0.28);
        float w3 = sin((p.x + p.y) * 3.4 + w1 * 1.3 + t * 0.20);
        float w4 = cos((p.x * 1.5 - p.y * 2.2) + w2 * 1.1 - t * 0.24);

        return w1 * 0.38 + w2 * 0.32 + w3 * 0.18 + w4 * 0.12;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 uv = (st - 0.5) * vec2(aspect, 1.0);

        float t = u_time;

        float eps = 0.018;
        float h  = waveHeight(uv, t);
        float hX = waveHeight(uv + vec2(eps, 0.0), t);
        float hY = waveHeight(uv + vec2(0.0, eps), t);

        vec3 norm = normalize(vec3(-(hX - h) / eps * 0.75, -(hY - h) / eps * 0.75, 1.0));

        vec3 keyLight = normalize(vec3(0.55, 0.65, 0.75));
        float diff = clamp(dot(norm, keyLight) * 0.5 + 0.5, 0.0, 1.0);

        vec3 halfVec = normalize(keyLight + vec3(0.0, 0.0, 1.0));
        float spec = pow(clamp(dot(norm, halfVec), 0.0, 1.0), 16.0);
        float fresnel = pow(1.0 - clamp(dot(norm, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.8);

        // Blending between luxury ethnic palette:
        // u_color4 (Dark Chocolate), u_color1 (Deep Burgundy), u_color2 (Rich Wine), u_color3 (Wine Red)
        vec3 base = mix(u_color4, u_color1, smoothstep(-0.8, -0.15, h));
        base = mix(base, u_color2, smoothstep(-0.35, 0.35, h));
        base = mix(base, u_color3, smoothstep(0.05, 0.65, h + diff * 0.25));

        // Soft ridge caustics along the crests
        float travelLight = sin(uv.x * 3.5 + uv.y * 1.8 - t * 1.8) * 0.5 + 0.5;
        float ridgeGlow = pow(travelLight, 5.0) * smoothstep(0.2, 0.8, h);

        // Subtle Champagne Gold illuminated highlights
        float goldEdges = (spec * 0.65 + fresnel * 0.85 + ridgeGlow * 0.5) * smoothstep(-0.05, 0.9, h + 0.25);

        // Protect center contrast for foreground text and CTA
        float centerDist = length(vec2(uv.x * 1.15, uv.y * 1.6));
        float centerShield = smoothstep(0.18, 0.85, centerDist);
        float allowedGold = mix(0.25, 0.85, centerShield);

        vec3 col = base + u_color5 * (goldEdges * allowedGold);

        // Vignette framing
        float vignette = smoothstep(1.5, 0.35, length(uv));
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

		const createShader = (
			glContext: WebGLRenderingContext,
			type: number,
			source: string,
		): WebGLShader | null => {
			const shader = glContext.createShader(type);
			if (!shader) return null;
			glContext.shaderSource(shader, source);
			glContext.compileShader(shader);
			if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
				console.error(
					"Shader compilation error:",
					glContext.getShaderInfoLog(shader),
				);
				glContext.deleteShader(shader);
				return null;
			}
			return shader;
		};

		const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
		const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
		if (!vs || !fs) return;

		const program = gl.createProgram();
		if (!program) return;
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error("Program link error:", gl.getProgramInfoLog(program));
			return;
		}

		gl.useProgram(program);

		const posBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW,
		);

		const aPosLoc = gl.getAttribLocation(program, "a_pos");
		gl.enableVertexAttribArray(aPosLoc);
		gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

		const hexToRgb = (hex: string): [number, number, number] => {
			const clean = hex.replace("#", "");
			const num = parseInt(clean, 16);
			return [
				((num >> 16) & 255) / 255,
				((num >> 8) & 255) / 255,
				(num & 255) / 255,
			];
		};

		const c1 = hexToRgb(colors[0] || "#2b080c");
		const c2 = hexToRgb(colors[1] || "#4a0e17");
		const c3 = hexToRgb(colors[2] || "#721422");
		const c4 = hexToRgb(colors[3] || "#1a0b0b");
		const c5 = hexToRgb(colors[4] || "#d4af37");

		gl.uniform3f(
			gl.getUniformLocation(program, "u_color1"),
			c1[0],
			c1[1],
			c1[2],
		);
		gl.uniform3f(
			gl.getUniformLocation(program, "u_color2"),
			c2[0],
			c2[1],
			c2[2],
		);
		gl.uniform3f(
			gl.getUniformLocation(program, "u_color3"),
			c3[0],
			c3[1],
			c3[2],
		);
		gl.uniform3f(
			gl.getUniformLocation(program, "u_color4"),
			c4[0],
			c4[1],
			c4[2],
		);
		gl.uniform3f(
			gl.getUniformLocation(program, "u_color5"),
			c5[0],
			c5[1],
			c5[2],
		);

		const uResLoc = gl.getUniformLocation(program, "u_resolution");
		const uTimeLoc = gl.getUniformLocation(program, "u_time");

		let animId: number;
		const startTime = performance.now();
		const reducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const resize = () => {
			if (!canvas) return;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = canvas.clientWidth * dpr;
			const height = canvas.clientHeight * dpr;
			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
				gl.viewport(0, 0, width, height);
			}
		};

		const render = (now: number) => {
			resize();
			// noiseSpeed parameter scales elapsed time (ambient slow wave)
			const elapsed =
				(now - startTime) * (noiseSpeed > 0 ? noiseSpeed * 28000 : 0.25);

			gl.uniform2f(uResLoc, canvas.width, canvas.height);
			gl.uniform1f(uTimeLoc, elapsed);

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			if (!reducedMotion) {
				animId = requestAnimationFrame(render);
			}
		};

		resize();
		render(startTime);

		window.addEventListener("resize", resize, { passive: true });

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", resize);
			if (program && gl) {
				gl.deleteProgram(program);
			}
			if (vs && gl) gl.deleteShader(vs);
			if (fs && gl) gl.deleteShader(fs);
			if (posBuffer && gl) gl.deleteBuffer(posBuffer);
		};
	}, [colors, noiseSpeed]);

	return <canvas ref={canvasRef} className={className} />;
};

export default GradientWave;
