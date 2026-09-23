import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './AmenitiesModal.css';

/* Authentic Airbnb Amenity SVGs */
const Icons = {
  Cutlery: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z" />
    </svg>
  ),
  Wifi: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z" />
    </svg>
  ),
  Desk: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z" />
    </svg>
  ),
  Pool: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z" />
    </svg>
  ),
  HotTub: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M9.5 2a4.5 4.5 0 0 1 3.53 7.3c.6.21 1.17.54 1.66.98l.19.19L17.4 13H31v2h-2v14a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V15H1v-2h2.1a5 5 0 0 1 2.96-3.6A4.5 4.5 0 0 1 9.5 2zm7.08 13H5v14h22V15h-7.59l3.3 3.3-1.42 1.4zM9.5 4a2.5 2.5 0 0 0-1 4.8V11H8a3 3 0 0 0-2.83 2h9.41l-1.12-1.12a3 3 0 0 0-1.92-.87l-.2-.01h-.84V8.8a2.5 2.5 0 0 0-1-4.8zm15.49-3a6.96 6.96 0 0 1-1.8 4.07l-.45.46A8.97 8.97 0 0 0 20.35 11h-2a10.97 10.97 0 0 1 3.2-7.12A4.96 4.96 0 0 0 22.97 1zm2 0h2a10.96 10.96 0 0 1-3.2 7.12A4.97 4.97 0 0 0 24.38 11h-2a6.97 6.97 0 0 1 1.8-4.06l.44-.47A8.96 8.96 0 0 0 26.99 1z" />
    </svg>
  ),
  Pets: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  ),
  Camera: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M23 3a2 2 0 0 1 2 1.85v1.67l5-2v11.96l-5-2V16a2 2 0 0 1-1.85 2H16.9a5 5 0 0 1-3.98 3.92A5 5 0 0 1 8.22 26H4v4H2V20h2v4h4a3 3 0 0 0 2.87-2.13A5 5 0 0 1 7.1 18H4a2 2 0 0 1-2-1.85V5a2 2 0 0 1 1.85-2H4zM12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm11-9H4v11h3.1a5 5 0 0 1 9.8 0H23zm5 2.48-3 1.2v3.64l3 1.2zM7 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  Car: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z" />
    </svg>
  ),
  CarbonMonoxideAlarm: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="M2.05 6.3 4 8.23V25a3 3 0 0 0 2.82 3h16.94l1.95 1.95c-.16.02-.33.04-.5.04L25 30H7a5 5 0 0 1-5-4.78V7c0-.24.02-.48.05-.7zm1.66-4 26 26-1.42 1.4-26-26 1.42-1.4zM25 2a5 5 0 0 1 5 4.78V25a5 5 0 0 1-.05.7L28 23.77V7a3 3 0 0 0-2.82-3H8.24L6.3 2.05c.16-.02.33-.04.5-.04L7 2h18zM11.1 17a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  SmokeAlarm: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
      <path d="m3.49 7.73 1.44 1.44A12.94 12.94 0 0 0 3 16a13 13 0 0 0 19.82 11.07l1.45 1.44A14.93 14.93 0 0 1 16 31 15 15 0 0 1 3.49 7.73zm.22-5.44 26 26-1.42 1.42-26-26 1.42-1.42zM16 1a15 15 0 0 1 12.52 23.27l-1.45-1.45A12.94 12.94 0 0 0 29 16 13 13 0 0 0 16 3a12.94 12.94 0 0 0-6.83 1.93L7.74 3.5A14.93 14.93 0 0 1 16 1zm-4.9 16a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  ),
  WashingMachine: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="16" cy="16" r="12" />
      <line x1="7.5" y1="7.5" x2="24.5" y2="24.5" />
    </svg>
  ),
  Hairdryer: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h14a6 6 0 0 1 6 6v0a6 6 0 0 1-6 6H4V8z" />
      <path d="M12 20v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-8" />
      <line x1="28" y1="11" x2="30" y2="11" />
      <line x1="28" y1="14" x2="31" y2="14" />
      <line x1="28" y1="17" x2="30" y2="17" />
    </svg>
  ),
  Spray: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 12h12v16a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V12z" />
      <path d="M14 12V8h4v4" />
      <path d="M18 4H10v4" />
      <path d="M18 4l6 4" />
    </svg>
  ),
  Bottle: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="11" width="14" height="17" rx="3" />
      <path d="M13 11V6h6v5" />
      <path d="M11 6h10" />
      <path d="M16 2v4" />
    </svg>
  ),
  HotWater: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 22c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M6 27c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <line x1="12" y1="4" x2="12" y2="14" />
      <line x1="16" y1="2" x2="16" y2="14" />
      <line x1="20" y1="4" x2="20" y2="14" />
    </svg>
  ),
  Hanger: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 7a3 3 0 1 0-3-3" />
      <path d="M16 7v6L4 21a2 2 0 0 0 1 3h22a2 2 0 0 0 1-3L16 13z" />
    </svg>
  ),
  BedSheet: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="24" height="20" rx="3" />
      <line x1="4" y1="13" x2="28" y2="13" />
      <line x1="12" y1="6" x2="12" y2="13" />
    </svg>
  ),
  Blinds: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="5" width="24" height="22" rx="2" />
      <line x1="4" y1="11" x2="28" y2="11" />
      <line x1="4" y1="17" x2="28" y2="17" />
      <line x1="4" y1="23" x2="28" y2="23" />
    </svg>
  ),
  Iron: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22h24a2 2 0 0 0 2-2c0-5-5-10-12-10H8a4 4 0 0 0-4 4v8z" />
      <line x1="8" y1="10" x2="8" y2="6" />
      <line x1="8" y1="6" x2="20" y2="6" />
    </svg>
  ),
  Wardrobe: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="4" width="22" height="24" rx="2" />
      <line x1="16" y1="4" x2="16" y2="28" />
      <circle cx="13" cy="16" r="1" fill="currentColor" />
      <circle cx="19" cy="16" r="1" fill="currentColor" />
    </svg>
  ),
  Cot: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="10" width="24" height="14" rx="2" />
      <line x1="4" y1="18" x2="28" y2="18" />
      <line x1="10" y1="10" x2="10" y2="18" />
      <line x1="16" y1="10" x2="16" y2="18" />
      <line x1="22" y1="10" x2="22" y2="18" />
      <line x1="6" y1="24" x2="6" y2="28" />
      <line x1="26" y1="24" x2="26" y2="28" />
    </svg>
  ),
  TV: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="26" height="18" rx="2" />
      <path d="M11 28h10" />
      <path d="M16 24v4" />
    </svg>
  ),
  AC: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="24" height="12" rx="2" />
      <line x1="7" y1="16" x2="25" y2="16" />
      <path d="M8 24c1 2 2 3 4 3" />
      <path d="M14 24c1 2 2 3 4 3" />
      <path d="M20 24c1 2 2 3 4 3" />
    </svg>
  ),
  Fan: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="16" cy="16" r="3" />
      <path d="M16 13C16 8 20 6 22 8s0 6-6 5z" />
      <path d="M13 16c-5 0-7 4-5 6s6 0 5-6z" />
      <path d="M16 19c0 5-4 7-6 5s0-6 6-5z" />
      <path d="M19 16c5 0 7-4 5-6s-6 0-5 6z" />
    </svg>
  ),
  Fridge: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="3" width="18" height="26" rx="2" />
      <line x1="7" y1="12" x2="25" y2="12" />
      <line x1="10" y1="7" x2="10" y2="10" />
      <line x1="10" y1="15" x2="10" y2="20" />
    </svg>
  ),
  Microwave: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="24" height="18" rx="2" />
      <rect x="7" y="9" width="13" height="12" rx="1" />
      <line x1="23" y1="10" x2="25" y2="10" />
      <line x1="23" y1="14" x2="25" y2="14" />
      <circle cx="24" cy="18" r="1.5" fill="currentColor" />
    </svg>
  ),
  Kettle: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 26h16a2 2 0 0 0 2-2l-3-12H9L6 24a2 2 0 0 0 2 2z" />
      <path d="M12 12V8a4 4 0 0 1 8 0v4" />
      <line x1="23" y1="14" x2="27" y2="18" />
    </svg>
  ),
  Coffee: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 10h16v10a6 6 0 0 1-6 6H11a6 6 0 0 1-6-6V10z" />
      <path d="M21 12h3a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-3" />
      <line x1="3" y1="28" x2="23" y2="28" />
    </svg>
  ),
  Wine: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4h14v7a7 7 0 0 1-14 0V4z" />
      <line x1="16" y1="18" x2="16" y2="26" />
      <line x1="10" y1="26" x2="22" y2="26" />
    </svg>
  ),
  Toaster: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="10" width="22" height="16" rx="3" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="17" y1="6" x2="23" y2="6" />
      <circle cx="23" cy="18" r="1.5" fill="currentColor" />
    </svg>
  ),
  Blender: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 5h12l-2 14h-8L10 5z" />
      <rect x="9" y="21" width="14" height="7" rx="2" />
      <circle cx="16" cy="24" r="1" fill="currentColor" />
    </svg>
  ),
  Cooker: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="5" width="20" height="22" rx="2" />
      <circle cx="11" cy="12" r="2.5" />
      <circle cx="21" cy="12" r="2.5" />
      <circle cx="11" cy="20" r="2.5" />
      <circle cx="21" cy="20" r="2.5" />
    </svg>
  ),
  Entrance: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 28V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v22" />
      <line x1="4" y1="28" x2="24" y2="28" />
      <circle cx="18" cy="17" r="1" fill="currentColor" />
    </svg>
  ),
  Balcony: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="16" x2="28" y2="16" />
      <line x1="4" y1="26" x2="28" y2="26" />
      <line x1="8" y1="16" x2="8" y2="26" />
      <line x1="16" y1="16" x2="16" y2="26" />
      <line x1="24" y1="16" x2="24" y2="26" />
      <rect x="7" y="6" width="18" height="10" rx="1" />
    </svg>
  ),
  OutdoorDining: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 14h24" />
      <path d="M8 14v12" />
      <path d="M24 14v12" />
      <path d="M12 14c0-4 2-8 4-8s4 4 4 8" />
    </svg>
  ),
  Gym: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12v8" />
      <path d="M8 8v16" />
      <path d="M24 8v16" />
      <path d="M28 12v8" />
      <line x1="4" y1="16" x2="28" y2="16" />
    </svg>
  ),
  LongTerm: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="24" height="22" rx="2" />
      <line x1="4" y1="12" x2="28" y2="12" />
      <line x1="10" y1="3" x2="10" y2="7" />
      <line x1="22" y1="3" x2="22" y2="7" />
    </svg>
  ),
  SelfCheckIn: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="10" width="18" height="18" rx="2" />
      <path d="M11 10V6a5 5 0 0 1 10 0v4" />
      <circle cx="16" cy="18" r="2" fill="currentColor" />
      <path d="M16 20v3" />
    </svg>
  ),
  Generic: () => (
    <svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="16" cy="16" r="12" />
      <path d="M12 16l3 3 6-6" />
    </svg>
  )
};

const fullAmenitiesList = [
  {
    category: 'Bathroom',
    items: [
      { name: 'Hairdryer', icon: 'Hairdryer' },
      { name: 'Cleaning products', icon: 'Spray' },
      { name: 'Shampoo', icon: 'Bottle' },
      { name: 'Hot water', icon: 'HotWater' },
      { name: 'Shower gel', icon: 'Bottle' }
    ]
  },
  {
    category: 'Bedroom and laundry',
    items: [
      { name: 'Washing machine', icon: 'WashingMachine', unavailable: true },
      { name: 'Hangers', icon: 'Hanger' },
      { name: 'Bed linen', icon: 'BedSheet' },
      { name: 'Room-darkening blinds', icon: 'Blinds' },
      { name: 'Iron', icon: 'Iron' },
      { name: 'Clothes storage', icon: 'Wardrobe' },
      { name: 'Cot', icon: 'Cot' }
    ]
  },
  {
    category: 'Entertainment',
    items: [
      { name: 'TV', icon: 'TV' }
    ]
  },
  {
    category: 'Family',
    items: [
      { name: 'Cot', icon: 'Cot' }
    ]
  },
  {
    category: 'Heating and cooling',
    items: [
      { name: 'Air conditioning', icon: 'AC' },
      { name: 'Ceiling fan', icon: 'Fan' }
    ]
  },
  {
    category: 'Home safety',
    items: [
      { name: 'Exterior security cameras on property', icon: 'Camera' },
      { name: 'Carbon monoxide alarm', icon: 'CarbonMonoxideAlarm', unavailable: true },
      { name: 'Smoke alarm', icon: 'SmokeAlarm', unavailable: true }
    ]
  },
  {
    category: 'Internet and office',
    items: [
      { name: 'Wifi', icon: 'Wifi' },
      { name: 'Dedicated workspace', icon: 'Desk' }
    ]
  },
  {
    category: 'Kitchen and dining',
    items: [
      { name: 'Kitchen', icon: 'Cutlery' },
      { name: 'Fridge', icon: 'Fridge' },
      { name: 'Freezer', icon: 'Fridge' },
      { name: 'Microwave', icon: 'Microwave' },
      { name: 'Cooking basics', icon: 'Cutlery' },
      { name: 'Crockery and cutlery', icon: 'Cutlery' },
      { name: 'Kettle', icon: 'Kettle' },
      { name: 'Coffee', icon: 'Coffee' },
      { name: 'Wine glasses', icon: 'Wine' },
      { name: 'Toaster', icon: 'Toaster' },
      { name: 'Blender', icon: 'Blender' },
      { name: 'Cooker', icon: 'Cooker' }
    ]
  },
  {
    category: 'Location features',
    items: [
      { name: 'Private entrance', icon: 'Entrance' }
    ]
  },
  {
    category: 'Outdoor',
    items: [
      { name: 'Patio or balcony', icon: 'Balcony' },
      { name: 'Outdoor dining area', icon: 'OutdoorDining' }
    ]
  },
  {
    category: 'Parking and facilities',
    items: [
      { name: 'Free parking on premises', icon: 'Car' },
      { name: 'Pool', icon: 'Pool' },
      { name: 'Hot tub', icon: 'HotTub' },
      { name: 'Gym', icon: 'Gym' }
    ]
  },
  {
    category: 'Services',
    items: [
      { name: 'Pets allowed', icon: 'Pets' },
      { name: 'Cleaning available during stay', icon: 'Spray' },
      { name: 'Long-term stays allowed', icon: 'LongTerm' },
      { name: 'Self check-in', icon: 'SelfCheckIn' }
    ]
  }
];

const AmenitiesModal = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="amenities-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="What this place offers">
      <div className="amenities-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Sticky Header with Close Button */}
        <div className="amenities-modal-header">
          <button 
            className="amenities-modal-close-btn" 
            onClick={onClose}
            ref={closeButtonRef}
            aria-label="Close amenities modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="amenities-modal-body">
          <h2 className="amenities-modal-title">What this place offers</h2>
          
          {fullAmenitiesList.map((cat, idx) => (
            <div key={idx} className="amenities-modal-section">
              <h3 className="amenities-modal-category-title">{cat.category}</h3>
              <div className="amenities-modal-items">
                {cat.items.map((item, iIdx) => {
                  const IconComp = Icons[item.icon] || Icons.Generic;
                  return (
                    <div key={iIdx} className={`amenities-modal-row ${item.unavailable ? 'amenities-modal-row--unavailable' : ''}`}>
                      <div className="amenities-modal-row__icon">
                        <IconComp />
                      </div>
                      <span className={`amenities-modal-row__name ${item.unavailable ? 'amenities-modal-row__name--unavailable' : ''}`}>
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AmenitiesModal;
