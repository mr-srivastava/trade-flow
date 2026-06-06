import React from 'react';
import WorldMap from '../ui/world-map';

export default function MapBackground() {
  return (
    <div className='w-full'>
      <WorldMap
        dots={[
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
            end: { lat: 23.8103, lng: 90.4125 }, // Dhaka, Bangladesh
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
            end: { lat: 25.2048, lng: 55.2708 }, // Dubai, UAE
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
            end: { lat: 51.9244, lng: 4.4777 }, // Rotterdam, Europe
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
            end: { lat: 51.5074, lng: -0.1278 }, // London, UK
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
            end: { lat: 40.7128, lng: -74.006 }, // New York, USA
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
            end: { lat: 35.6762, lng: 139.6503 }, // Tokyo, Japan
          },
          {
            start: { lat: 19.076, lng: 72.8777 }, // Mumbai, India
            end: { lat: -33.8688, lng: 151.2093 }, // Sydney, Australia
          },
        ]}
      />
    </div>
  );
}
