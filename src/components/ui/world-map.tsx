'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DottedMap from 'dotted-map';
import React from 'react';

function getCssVar(name: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '';
}

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

// Memoized animated dot component to prevent unnecessary re-renders
const AnimatedDot = React.memo(({ x, y, color }: { x: number; y: number; color: string }) => (
  <>
    <circle cx={x} cy={y} r="2" fill={color} />
    <circle cx={x} cy={y} r="2" fill={color} opacity="0.5">
      <animate attributeName="r" from="2" to="8" dur="1.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
    </circle>
  </>
));

AnimatedDot.displayName = 'AnimatedDot';

function WorldMap({ dots = [], lineColor: lineColorProp }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [themeColors, setThemeColors] = useState({
    primaryHex: '#2563eb',
    backgroundHex: '#121620',
    mapDotFill: 'rgba(255, 255, 255, 0.25)',
  });

  useEffect(() => {
    const primaryHex = getCssVar('--primary-hex') || '#2563eb';
    const backgroundHex = getCssVar('--syntara-dark-hex') || '#121620';
    const mapDotFill = getCssVar('--map-dot-fill') || 'rgba(255, 255, 255, 0.25)';
    setThemeColors({ primaryHex, backgroundHex, mapDotFill });
  }, []);

  const lineColor = lineColorProp || themeColors.primaryHex;

  // Optimize map creation with reduced detail for better performance
  const map = useMemo(() => new DottedMap({ height: 80, grid: 'diagonal' }), []);

  // Cache the SVG string to avoid regeneration (uses theme colors from globals.css)
  const svgString = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: themeColors.mapDotFill,
        shape: 'circle',
        backgroundColor: themeColors.backgroundHex,
      }),
    [map, themeColors.mapDotFill, themeColors.backgroundHex],
  );

  // Memoize processed dots to avoid recalculating on every render
  const processedDots = useMemo(
    () =>
      dots.map((dot, i) => {
        const startPoint = projectPoint(dot.start.lat, dot.start.lng);
        const endPoint = projectPoint(dot.end.lat, dot.end.lng);
        const path = createCurvedPath(startPoint, endPoint);

        return {
          id: `path-group-${i}`,
          startPoint,
          endPoint,
          path,
          delay: 0.5 * i,
        };
      }),
    [dots],
  );

  return (
    <div className="w-full aspect-[2/1] bg-syntara-dark rounded-lg relative font-sans">
      {/* Use dangerouslySetInnerHTML for better performance than Image + data URI */}
      <div
        className="h-full w-full pointer-events-none select-none"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {processedDots.map((dot) => (
          <g key={dot.id}>
            <motion.path
              d={dot.path}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                delay: dot.delay,
                ease: 'easeOut',
              }}
            />
            <AnimatedDot x={dot.startPoint.x} y={dot.startPoint.y} color={lineColor} />
            <AnimatedDot x={dot.endPoint.x} y={dot.endPoint.y} color={lineColor} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default React.memo(WorldMap);
