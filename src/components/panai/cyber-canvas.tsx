"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  size: number;
}

interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  width: number;
  green: boolean;
  targetClose: number;
  animSpeed: number;
}

export function CyberCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.15 + Math.random() * 0.6,
      opacity: 0.08 + Math.random() * 0.25,
      size: 0.8 + Math.random() * 1.5,
    }));

    const candleCount = Math.floor(w / 18);
    const cw = w / candleCount;
    const candles: Candle[] = Array.from({ length: candleCount }, (_, i) => {
      const green = Math.random() > 0.42;
      const base = h * 0.72 + Math.random() * h * 0.14;
      const bodyH = 8 + Math.random() * 35;
      const openVal = green ? base : base - bodyH;
      const closeVal = green ? base - bodyH : base;
      return {
        x: i * cw + cw * 0.15,
        open: openVal,
        close: closeVal,
        high: Math.min(openVal, closeVal) - Math.random() * 18,
        low: Math.max(openVal, closeVal) + Math.random() * 18,
        width: cw * 0.7,
        green,
        targetClose: closeVal + (Math.random() - 0.5) * 30,
        animSpeed: 0.3 + Math.random() * 1.2,
      };
    });

    let gridPhase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      gridPhase += 0.002;
      const gridAlpha = 0.025 + Math.sin(gridPhase) * 0.008;
      ctx.strokeStyle = `rgba(0, 240, 255, ${gridAlpha})`;
      ctx.lineWidth = 0.5;

      const spacing = 50;
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      for (const p of particles) {
        p.y -= p.speed;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.fill();
      }

      for (const c of candles) {
        const diff = c.targetClose - c.close;
        c.close += diff * 0.008 * c.animSpeed;

        if (Math.abs(diff) < 0.5) {
          c.targetClose = c.close + (Math.random() - 0.5) * 40;
          c.green = c.close < c.open;
        }

        const topBody = Math.min(c.open, c.close);
        const botBody = Math.max(c.open, c.close);
        const bodyH = Math.max(botBody - topBody, 1);
        const alpha = 0.12;
        const color = c.green
          ? `rgba(0, 255, 136, ${alpha})`
          : `rgba(255, 0, 100, ${alpha})`;

        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        const cx = c.x + c.width / 2;
        ctx.moveTo(cx, c.high);
        ctx.lineTo(cx, c.low);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillRect(c.x, topBody, c.width, bodyH);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const cleanup = setup();
    return cleanup;
  }, [setup]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}
