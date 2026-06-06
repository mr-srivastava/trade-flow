'use client';

import { useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import DottedMap from 'dotted-map';
import Image from 'next/image';
import React from 'react';

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

function WorldMap({ dots = [], lineColor = '#0ea5e9' }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const map = useMemo(() => new DottedMap({ height: 100, grid: 'diagonal' }), []);

  const svgMap = useMemo(
    () =>
      map.getSVG({
        radius: 0.22,
        color: '#33415540',
        shape: 'circle',
        backgroundColor: '#f1f5f9',
      }),
    [map],
  );

  return (
    <div className='w-full aspect-[2/1] bg-syntara-dark rounded-lg relative font-sans'>
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className='h-full w-full pointer-events-none select-none'
        alt='world map'
        height='495'
        width='1056'
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox='0 0 800 400'
        className='w-full h-full absolute inset-0 pointer-events-none select-none'
      >
        <defs>
          <linearGradient id='path-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop offset='0%' stopColor='white' stopOpacity='0' />
            <stop offset='5%' stopColor={lineColor} stopOpacity='0.6' />
            <stop offset='95%' stopColor={lineColor} stopOpacity='0.6' />
            <stop offset='100%' stopColor='white' stopOpacity='0' />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          const path = createCurvedPath(startPoint, endPoint);

          return (
            <g key={`path-group-${i}`}>
              <path
                d={path}
                fill='none'
                stroke={lineColor}
                strokeWidth='0.6'
                strokeOpacity='0.08'
              />
              <motion.path
                d={path}
                fill='none'
                stroke='url(#path-gradient)'
                strokeWidth='0.8'
                strokeLinecap='round'
                style={{ pathLength: 0.25 }}
                initial={{ pathOffset: 0 }}
                animate={{ pathOffset: 1 }}
                transition={{
                  duration: 2.5,
                  delay: 0.4 * i,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
              {/* start point */}
              <circle cx={startPoint.x} cy={startPoint.y} r='2' fill={lineColor} />
              <circle cx={startPoint.x} cy={startPoint.y} r='2' fill={lineColor} opacity='0.5'>
                <animate attributeName='r' from='2' to='8' dur='1.5s' repeatCount='indefinite' />
                <animate
                  attributeName='opacity'
                  from='0.5'
                  to='0'
                  dur='1.5s'
                  repeatCount='indefinite'
                />
              </circle>

              {/* end point */}
              <circle cx={endPoint.x} cy={endPoint.y} r='2' fill={lineColor} />
              <circle cx={endPoint.x} cy={endPoint.y} r='2' fill={lineColor} opacity='0.5'>
                <animate attributeName='r' from='2' to='8' dur='1.5s' repeatCount='indefinite' />
                <animate
                  attributeName='opacity'
                  from='0.5'
                  to='0'
                  dur='1.5s'
                  repeatCount='indefinite'
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default React.memo(WorldMap);
