import { useState } from 'react';
import './ListingDetails.css';
import bedroomImg from '../../assets/bedroom.jpeg';
import livingImg from '../../assets/living.jpeg';
import AmenitiesModal from '../AmenitiesModal/AmenitiesModal';
import PropertyCalendar from '../PropertyCalendar/PropertyCalendar';
import ReviewsSection from '../ReviewsSection/ReviewsSection';
import HostSection from '../HostSection/HostSection';
import ThingsToKnow from '../ThingsToKnow/ThingsToKnow';
import MoreStays from '../MoreStays/MoreStays';
import { 
  Star, 
  ChevronDown, 
  Flag
} from 'lucide-react';

/* Authentic Airbnb Amenity SVGs */
const KitchenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M26 1a5 5 0 0 1 5 5c0 6.39-1.6 13.19-4 14.7V31h-2V20.7c-2.36-1.48-3.94-8.07-4-14.36v-.56A5 5 0 0 1 26 1zm-9 0v18.12c2.32.55 4 3 4 5.88 0 3.27-2.18 6-5 6s-5-2.73-5-6c0-2.87 1.68-5.33 4-5.88V1zM2 1h1c4.47 0 6.93 6.37 7 18.5V21H4v10H2zm14 20c-1.6 0-3 1.75-3 4s1.4 4 3 4 3-1.75 3-4-1.4-4-3-4zM4 3.24V19h4l-.02-.96-.03-.95C7.67 9.16 6.24 4.62 4.22 3.36L4.1 3.3zm19 2.58v.49c.05 4.32 1.03 9.13 2 11.39V3.17a3 3 0 0 0-2 2.65zm4-2.65V17.7c.99-2.31 2-7.3 2-11.7a3 3 0 0 0-2-2.83z" />
  </svg>
);

const WifiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M16 20.33a3.67 3.67 0 1 1 0 7.34 3.67 3.67 0 0 1 0-7.34zm0 2a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34zM16 15a9 9 0 0 1 8.04 4.96l-1.51 1.51a7 7 0 0 0-13.06 0l-1.51-1.51A9 9 0 0 1 16 15zm0-5.33c4.98 0 9.37 2.54 11.94 6.4l-1.45 1.44a12.33 12.33 0 0 0-20.98 0l-1.45-1.45A14.32 14.32 0 0 1 16 9.66zm0-5.34c6.45 0 12.18 3.1 15.76 7.9l-1.43 1.44a17.64 17.64 0 0 0-28.66 0L.24 12.24c3.58-4.8 9.3-7.9 15.76-7.9z" />
  </svg>
);

const WorkspaceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M26 2a1 1 0 0 1 .92.61l.04.12 2 7a1 1 0 0 1-.85 1.26L28 11h-3v5h6v2h-2v13h-2v-2.54a3.98 3.98 0 0 1-1.73.53L25 29H7a3.98 3.98 0 0 1-2-.54V31H3V18H1v-2h5v-4a1 1 0 0 1 .88-1h.36L6.09 8.4l1.82-.8L9.43 11H12a1 1 0 0 1 1 .88V16h10v-5h-3a1 1 0 0 1-.99-1.16l.03-.11 2-7a1 1 0 0 1 .84-.72L22 2h4zm1 16H5v7a2 2 0 0 0 1.7 1.98l.15.01L7 27h18a2 2 0 0 0 2-1.85V18zm-16-5H8v3h3v-3zm14.24-9h-2.49l-1.43 5h5.35l-1.43-5z" />
  </svg>
);

const ParkingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M26 19a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 18a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm20.7-5 .41 1.12A4.97 4.97 0 0 1 30 18v9a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2H8v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9c0-1.57.75-2.96 1.89-3.88L4.3 13H2v-2h3v.15L6.82 6.3A2 2 0 0 1 8.69 5h14.62c.83 0 1.58.52 1.87 1.3L27 11.15V11h3v2h-2.3zM6 25H4v2h2v-2zm22 0h-2v2h2v-2zm0-2v-5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v5h24zm-3-10h.56L23.3 7H8.69l-2.25 6H25zm-15 7h12v-2H10v2z" />
  </svg>
);

const PoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M24 26c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 28c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 28c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 26c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 26zm0-5c.99 0 1.95.35 2.67 1 .3.29.71.45 1.14.5H28v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 23c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 23c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 21c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 21zM20 3a4 4 0 0 1 4 3.8V9h4v2h-4v5a4 4 0 0 1 2.5.86l.17.15c.3.27.71.44 1.14.48l.19.01v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 18c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 18c-.5 0-.98.17-1.33.5a3.96 3.96 0 0 1-2.44 1H4v-2h.19a1.95 1.95 0 0 0 1.14-.5A3.98 3.98 0 0 1 8 16c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5a3.96 3.96 0 0 1 2.44-1H16v-5H4V9h12V7a2 2 0 0 0-4-.15V7h-2a4 4 0 0 1 7-2.65A3.98 3.98 0 0 1 20 3zm-2 13.52.46.31.21.18c.35.31.83.49 1.33.49a2 2 0 0 0 1.2-.38l.13-.11c.2-.19.43-.35.67-.49V11h-4zM20 5a2 2 0 0 0-2 1.85V9h4V7a2 2 0 0 0-2-2z" />
  </svg>
);

const HotTubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M9.5 2a4.5 4.5 0 0 1 3.53 7.3c.6.21 1.17.54 1.66.98l.19.19L17.4 13H31v2h-2v14a2 2 0 0 1-1.85 2H5a2 2 0 0 1-2-1.85V15H1v-2h2.1a5 5 0 0 1 2.96-3.6A4.5 4.5 0 0 1 9.5 2zm7.08 13H5v14h22V15h-7.59l3.3 3.3-1.42 1.4zM9.5 4a2.5 2.5 0 0 0-1 4.8V11H8a3 3 0 0 0-2.83 2h9.41l-1.12-1.12a3 3 0 0 0-1.92-.87l-.2-.01h-.84V8.8a2.5 2.5 0 0 0-1-4.8zm15.49-3a6.96 6.96 0 0 1-1.8 4.07l-.45.46A8.97 8.97 0 0 0 20.35 11h-2a10.97 10.97 0 0 1 3.2-7.12A4.96 4.96 0 0 0 22.97 1zm2 0h2a10.96 10.96 0 0 1-3.2 7.12A4.97 4.97 0 0 0 24.38 11h-2a6.97 6.97 0 0 1 1.8-4.06l.44-.47A8.96 8.96 0 0 0 26.99 1z" />
  </svg>
);

const PetsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M13.7 13.93a4 4 0 0 1 5.28.6l.29.37 4.77 6.75a4 4 0 0 1 .6 3.34 4 4 0 0 1-4.5 2.91l-.4-.08-3.48-.93a1 1 0 0 0-.52 0l-3.47.93a4 4 0 0 1-2.94-.35l-.4-.25a4 4 0 0 1-1.2-5.2l.23-.37 4.77-6.75a4 4 0 0 1 .96-.97zm3.75 1.9a2 2 0 0 0-2.98.08l-.1.14-4.84 6.86a2 2 0 0 0 2.05 3.02l.17-.04 4-1.07a1 1 0 0 1 .5 0l3.97 1.06.15.04a2 2 0 0 0 2.13-2.97l-4.95-7.01zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M23 3a2 2 0 0 1 2 1.85v1.67l5-2v11.96l-5-2V16a2 2 0 0 1-1.85 2H16.9a5 5 0 0 1-3.98 3.92A5 5 0 0 1 8.22 26H4v4H2V20h2v4h4a3 3 0 0 0 2.87-2.13A5 5 0 0 1 7.1 18H4a2 2 0 0 1-2-1.85V5a2 2 0 0 1 1.85-2H4zM12 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm11-9H4v11h3.1a5 5 0 0 1 9.8 0H23zm5 2.48-3 1.2v3.64l3 1.2zM7 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

const CarbonMonoxideAlarmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="M2.05 6.3 4 8.23V25a3 3 0 0 0 2.82 3h16.94l1.95 1.95c-.16.02-.33.04-.5.04L25 30H7a5 5 0 0 1-5-4.78V7c0-.24.02-.48.05-.7zm1.66-4 26 26-1.42 1.4-26-26 1.42-1.4zM25 2a5 5 0 0 1 5 4.78V25a5 5 0 0 1-.05.7L28 23.77V7a3 3 0 0 0-2.82-3H8.24L6.3 2.05c.16-.02.33-.04.5-.04L7 2h18zM11.1 17a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

const SmokeAlarmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}>
    <path d="m3.49 7.73 1.44 1.44A12.94 12.94 0 0 0 3 16a13 13 0 0 0 19.82 11.07l1.45 1.44A14.93 14.93 0 0 1 16 31 15 15 0 0 1 3.49 7.73zm.22-5.44 26 26-1.42 1.42-26-26 1.42-1.42zM16 1a15 15 0 0 1 12.52 23.27l-1.45-1.45A12.94 12.94 0 0 0 29 16 13 13 0 0 0 16 3a12.94 12.94 0 0 0-6.83 1.93L7.74 3.5A14.93 14.93 0 0 1 16 1zm-4.9 16a5 5 0 0 0 3.9 3.9v2.03A7 7 0 0 1 9.07 17h2.03zm5.9 4.24 1.35 1.36a6.95 6.95 0 0 1-1.35.33v-1.69zM21.24 17h1.69c-.07.47-.18.92-.34 1.35L21.24 17zM17 9.07A7 7 0 0 1 22.93 15H20.9a5 5 0 0 0-3.9-3.9V9.07zm-7.6 4.58L10.76 15H9.07c.07-.47.18-.92.33-1.35zM15 9.07v1.69L13.65 9.4A6.95 6.95 0 0 1 15 9.07zM23 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

const featuredAmenities = [
  { name: 'Kitchen', icon: KitchenIcon },
  { name: 'Wifi', icon: WifiIcon },
  { name: 'Dedicated workspace', icon: WorkspaceIcon },
  { name: 'Free parking on premises', icon: ParkingIcon },
  { name: 'Pool', icon: PoolIcon },
  { name: 'Hot tub', icon: HotTubIcon },
  { name: 'Pets allowed', icon: PetsIcon },
  { name: 'Exterior security cameras on property', icon: CameraIcon },
  { name: 'Carbon monoxide alarm', icon: CarbonMonoxideAlarmIcon, unavailable: true },
  { name: 'Smoke alarm', icon: SmokeAlarmIcon, unavailable: true },
];

/* Exact Official Airbnb Laurel Wreath SVGs */
const LaurelLeft = () => (
  <svg 
    viewBox="0 0 20 32" 
    width="20" 
    height="32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="laurel-wreath"
    style={{ display: 'block', height: '32px', width: 'auto' }}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222" />
    <path fillRule="evenodd" clipRule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7" />
    <path fillRule="evenodd" clipRule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222" />
    <path fillRule="evenodd" clipRule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7" />
    <path fillRule="evenodd" clipRule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7" />
    <path fillRule="evenodd" clipRule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222" />
  </svg>
);

const LaurelRight = () => (
  <svg 
    viewBox="0 0 20 32" 
    width="20" 
    height="32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="laurel-wreath"
    style={{ display: 'block', height: '32px', width: 'auto' }}
  >
    <g transform="translate(20, 0) scale(-1, 1)">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222" />
      <path fillRule="evenodd" clipRule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222" />
      <path fillRule="evenodd" clipRule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222" />
      <path fillRule="evenodd" clipRule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222" />
    </g>
  </svg>
);

/* Solid Green Price Tag SVG matching reference discount card */
const DiscountTagIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    className="promo-tag-icon"
    aria-hidden="true"
  >
    <g transform="rotate(-45 12 12)">
      {/* Hanging string loop */}
      <path d="M12 5V1.5" stroke="#8E8E8E" strokeWidth="1.5" strokeLinecap="round" />
      {/* Solid green price tag */}
      <path 
        d="M12 4.5 L17.5 10 V20.5 C17.5 21.3 16.8 22 16 22 H8 C7.2 22 6.5 21.3 6.5 20.5 V10 L12 4.5 Z" 
        fill="#56933A" 
      />
      {/* White punch hole */}
      <circle cx="12" cy="8" r="1.5" fill="#FFFFFF" />
    </g>
  </svg>
);

/* Highlights SVGs matching exact Airbnb official icons */
const OutdoorIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}
  >
    <path d="m15.59 1.91 1.02.8C22.17 7.04 25 11.46 25 15.98a8.99 8.99 0 0 1-.5 3.02H31v2h-2v9a1 1 0 0 1-.88 1H4a1 1 0 0 1-1-.88V21H1v-2h6.42c-.28-.9-.42-1.91-.42-3.01 0-2.25 1.1-4.82 3.27-7.75l.27-.35.55-.73 1.78 1.12L15.6 1.9zM27 21H5v8h22v-8zM16.4 5.1l-2.6 6.1-2.21-1.37-.17.24C9.87 12.3 9.07 14.2 9 15.77l-.01.21c0 1.1.17 2.04.48 2.85l.07.17h3a6.1 6.1 0 0 1-.05-.83c0-1.52.86-3.19 2.52-5.07l.24-.27.74-.81.74.8c1.82 2 2.76 3.76 2.76 5.35 0 .3-.02.57-.05.83h3.06l-.14-.07a6.7 6.7 0 0 0 .63-2.95c0-3.42-2.03-6.93-6.17-10.51l-.43-.36zm-.4 9.94-.08.1c-.9 1.14-1.36 2.11-1.41 2.88l-.01.15c0 .35.03.63.09.83h2.82c.06-.2.09-.48.09-.83 0-.79-.46-1.8-1.42-3.04l-.08-.1z" />
  </svg>
);

const CoolIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}
  >
    <path d="M20.33 3.08c1.5 2.24.96 5.55-1.38 9.9l-.12.2.18.18c.1.13.21.26.3.4l.23.38.14.02c.7.06 1.78-.11 2.87-.48.89-.3 1.78-.78 2.68-1.45l.66-.52a3 3 0 0 1 4.77 1.33l.12.44c.59 3.35.02 5.73-1.86 6.98-2.24 1.5-5.54.96-9.9-1.39a3 3 0 0 1-.27-.16l-.07.07-.39.3-.28.19V20c-.03.7.15 1.68.48 2.68.3.88.78 1.78 1.45 2.68l.26.33.26.33a3 3 0 0 1-.36 4.22C19 31 17.95 31 17 31h-.54l-1.39-.1c-1.24-.19-2.56-.65-3.36-1.84-1.5-2.25-.96-5.55 1.39-9.91.04-.09.1-.17.15-.25a4.12 4.12 0 0 1-.37-.4.82.82 0 0 0-.18-.23.5.5 0 0 0-.21-.11c-.7-.1-1.85.06-3.04.46-.88.3-1.78.78-2.68 1.45l-.66.52a3 3 0 0 1-4.77-1.33l-.12-.44c-.59-3.35-.02-5.73 1.86-6.98 2.24-1.5 5.55-.96 9.9 1.38l.1.05c.3-.3.55-.5.72-.61l.2-.13.03-.2c.06-.7-.11-1.78-.48-2.88a9.6 9.6 0 0 0-1.45-2.68l-.52-.66a3 3 0 0 1 1.33-4.77l.44-.12c3.35-.59 5.73-.02 6.98 1.86zm-5.31 16.8-.16.22c-2.04 3.77-2.5 6.45-1.49 7.85 1.13 1.55 4.63 1.55 5.44.77.38-.36.47-.89.2-1.31l-.37-.45a11.94 11.94 0 0 1-2.05-3.64 10.93 10.93 0 0 1-.59-3.03V20h-.14a4.01 4.01 0 0 1-.63-.07l-.21-.05zM4.09 13.52c-1.56 1.13-1.56 4.63-.78 5.44.36.38.9.46 1.32.19l.44-.36c1.2-.96 2.42-1.64 3.65-2.05 1.16-.4 2.33-.6 3.28-.6V16c0-.14 0-.28.02-.42l.08-.46-.16-.12c-3.78-2.03-6.46-2.5-7.85-1.48zm23.24-.36-.45.36c-1.2.96-2.41 1.64-3.64 2.05-1.15.38-2.3.6-3.24.6-.01.25-.05.5-.1.74l-.07.26.19.14c3.77 2.03 6.45 2.5 7.85 1.48 1.55-1.13 1.55-4.63.78-5.44-.36-.38-.9-.47-1.32-.19zM16 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13.2 3.39c-.37.36-.46.89-.18 1.31l.36.45c.95 1.2 1.64 2.42 2.05 3.64.37 1.14.59 2.27.59 3.2l.54.05.3.05.2.05.1-.13c2.04-3.77 2.5-6.45 1.49-7.84-1.13-1.56-4.63-1.56-5.44-.78z" />
  </svg>
);

const SelfCheckInIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 32 32" 
    aria-hidden="true" 
    role="presentation" 
    focusable="false" 
    style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }}
  >
    <path d="M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z" />
  </svg>
);

const ListingDetails = ({ 
  subtitle, 
  host, 
  details, 
  price, 
  nights = 5,
  checkIn = '10/18/2026',
  checkOut = '10/23/2026',
  freeCancellationDate = '17 October',
  rating = 4.95, 
  reviewCount = 19, 
  description, 
  amenities,
  onReserveClick
}) => {
  const [guestsCount, setGuestsCount] = useState(2);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);

  return (
    <div className="listing-details-container">
      <div className="listing-details">
        {/* Left Content Column */}
        <div className="listing-details__main">
        
        {/* Title and Basics Header */}
        <div className="listing-details__header">
          <h2>{subtitle || 'Entire serviced apartment in Candolim, India'}</h2>
          <div className="listing-details__basics">
            <span>{details.guests} guests</span>
            <span className="dot">·</span>
            <span>{details.bedrooms} bedroom</span>
            <span className="dot">·</span>
            <span>{details.beds} bed</span>
            <span className="dot">·</span>
            <span>{details.baths} bathroom</span>
          </div>
        </div>

        {/* Guest Favourite Card */}
        <div className="guest-favourite-card" role="region" aria-label="Guest favourite highlight">
          <div className="guest-favourite-card__left">
            <div className="guest-favourite-badge">
              <LaurelLeft />
              <div className="guest-favourite-title-wrap">
                <span className="guest-favourite-title-top">Guest</span>
                <span className="guest-favourite-title-bottom">favourite</span>
              </div>
              <LaurelRight />
            </div>
            <p className="guest-favourite-desc">
              One of the most loved homes on Airbnb, according to guests
            </p>
          </div>

          <div className="guest-favourite-card__right">
            <div className="rating-block">
              <span className="rating-num">{rating}</span>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="#222" color="#222" />
                ))}
              </div>
            </div>
            <div className="rating-divider"></div>
            <div className="reviews-block">
              <span className="reviews-num">{reviewCount}</span>
              <u className="reviews-label">Reviews</u>
            </div>
          </div>
        </div>

        {/* Host Section */}
        <div className="listing-details__host-section">
          <img 
            src={host.avatar} 
            alt={`Host ${host.name}`} 
            className="host-avatar-circle" 
          />
          <div className="host-info">
            <h3>Hosted by {host.name}</h3>
            <p>{host.hostingDuration || '2 years hosting'}</p>
          </div>
        </div>

        <hr className="divider" />

        {/* Highlights List */}
        <div className="listing-details__highlights">
          <div className="highlight-row">
            <div className="highlight-icon">
              <OutdoorIcon />
            </div>
            <div className="highlight-text">
              <h4>Outdoor entertainment</h4>
              <p>The pool and alfresco dining are great for summer trips.</p>
            </div>
          </div>

          <div className="highlight-row">
            <div className="highlight-icon">
              <CoolIcon />
            </div>
            <div className="highlight-text">
              <h4>Designed for staying cool</h4>
              <p>Beat the heat with the A/C and ceiling fan.</p>
            </div>
          </div>

          <div className="highlight-row">
            <div className="highlight-icon">
              <SelfCheckInIcon />
            </div>
            <div className="highlight-text">
              <h4>Self check-in</h4>
              <p>You can check in with the building staff.</p>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Translation Notice */}
        <div className="translation-box">
          <span>Some info has been automatically translated. </span>
          <button className="translation-link">Show original</button>
        </div>

        {/* Description Section */}
        <div className="listing-details__description">
          <p className="description-paragraph">
            🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors.
            {isDescriptionExpanded ? (
            <p className="description-paragraph">
              Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️ 🌴
            </p>
          ) : (
            <p className="description-paragraph description-paragraph--faded">
              Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's
            </p>
          )}
          </p>
          
          <button 
            className="show-more-link"
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            aria-expanded={isDescriptionExpanded}
          >
            <u>{isDescriptionExpanded ? 'Show less' : 'Show more'}</u>
            <span className="show-more-chevron">&gt;</span>
          </button>
        </div>

        <hr className="divider" />

        {/* Where you'll sleep */}
        <div className="listing-details__sleep">
          <h2>Where you'll sleep</h2>
          <div className="sleep-cards-grid">
            <div className="sleep-card">
              <img 
                src={bedroomImg} 
                alt="Bedroom with double bed" 
                className="sleep-card__image" 
              />
              <div className="sleep-card__info">
                <h3>Bedroom</h3>
                <p>1 double bed</p>
              </div>
            </div>
            <div className="sleep-card">
              <img 
                src={livingImg} 
                alt="Living room with sofa" 
                className="sleep-card__image" 
              />
              <div className="sleep-card__info">
                <h3>Living room</h3>
                <p>1 sofa</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* What this place offers */}
        <div className="listing-details__amenities" id="amenities">
          <h2>What this place offers</h2>
          <div className="amenities-grid">
            {featuredAmenities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`amenity-item ${item.unavailable ? 'amenity-item--unavailable' : ''}`}
                >
                  <IconComp />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
          <button 
            className="amenities-btn"
            onClick={() => setIsAmenitiesModalOpen(true)}
          >
            Show all 50 amenities
          </button>
        </div>

        {/* Calendar Section */}
        <PropertyCalendar 
          city="Candolim"
          initialCheckIn="2026-10-18"
          initialCheckOut="2026-10-23"
        />

      </div>
      
      {/* Right Column: Promotional Card + Reservation Card */}
      <aside className="listing-details__sidebar" id="booking-sidebar">
        
        {/* Promotional 10% Discount Card */}
        <div className="promo-card">
          <div className="promo-card__left">
            <DiscountTagIcon />
            <div className="promo-card__text">
              <span className="promo-title">Get 10% off your next stay.</span>
              <a href="#terms" className="promo-terms" onClick={(e) => e.preventDefault()}>Terms apply</a>
            </div>
          </div>
          <button 
            className="promo-claim-btn"
            onClick={() => setIsClaimed(!isClaimed)}
          >
            {isClaimed ? 'Claimed' : 'Claim'}
          </button>
        </div>

        {/* Reservation Card */}
        <div className="reservation-card" role="complementary" aria-label="Reservation card">
          
          {/* Price Header */}
          <div className="reservation-card__price-row">
            <span className="reservation-price">{price}</span>
            <span className="reservation-period"> for {nights} nights</span>
          </div>

          {/* Date & Guest Form Box */}
          <div className="reservation-form-box">
            <div className="reservation-dates-row">
              <div className="date-field border-right">
                <span className="field-label">CHECK-IN</span>
                <span className="field-value">{checkIn}</span>
              </div>
              <div className="date-field">
                <span className="field-label">CHECKOUT</span>
                <span className="field-value">{checkOut}</span>
              </div>
            </div>
            
            <div 
              className="guest-field"
              onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
              tabIndex={0}
              role="button"
              aria-label="Select guests"
            >
              <div className="guest-field__content">
                <span className="field-label">GUESTS</span>
                <span className="field-value">{guestsCount} guests</span>
              </div>
              <ChevronDown size={18} color="#222" />
            </div>
          </div>

          {/* Guest Selector Dropdown */}
          {isGuestDropdownOpen && (
            <div className="guest-dropdown">
              <div className="guest-dropdown__row">
                <span>Guests</span>
                <div className="guest-counter">
                  <button 
                    disabled={guestsCount <= 1}
                    onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                  >-</button>
                  <span>{guestsCount}</span>
                  <button 
                    disabled={guestsCount >= details.guests}
                    onClick={() => setGuestsCount(Math.min(details.guests, guestsCount + 1))}
                  >+</button>
                </div>
              </div>
            </div>
          )}

          {/* Cancellation Notice Banner */}
          <div className="cancellation-badge">
            <span>Free cancellation before </span>
            <strong>{freeCancellationDate}</strong>
          </div>

          {/* Primary Reserve Button */}
          <button className="reserve-btn-main" onClick={onReserveClick}>
            Reserve
          </button>

          <p 
            className="reservation-disclaimer" 
            onClick={onReserveClick}
            style={{ cursor: 'pointer' }}
          >
            You won't be charged yet
          </p>

        </div>

        {/* Report Listing */}
        <div className="report-listing-row">
          <Flag size={14} color="#717171" />
          <button className="report-link">Report this listing</button>
        </div>

      </aside>
      </div>

      {/* Full Screen / Full Container Width Sections: Reviews & Location */}
      <div className="listing-details-fullwidth">
        <hr className="divider divider--full" id="reviews" />
        <ReviewsSection 
          rating={rating}
          reviewCount={reviewCount}
        />

        <hr className="divider divider--full" id="location" />
        <div className="listing-details__location">
          <h2>Where you'll be</h2>
          <p className="location-name">Candolim, Goa, India</p>
          <div className="location-map-container">
            <iframe
              title="Listing Location Map"
              width="100%"
              height="440"
              style={{ border: 0, borderRadius: '16px', marginTop: '24px' }}
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=Candolim,%20Goa,%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
          </div>

          {/* Host Section with Neighbourhood Highlights, Profile Card, Co-Hosts, and Details */}
          <HostSection />

          {/* Things to know: Cancellation policy, House rules, Safety & property */}
          <ThingsToKnow />

          {/* More stays nearby with pagination (1/2, 2/2) */}
          <MoreStays />
        </div>
      </div>

      {/* Mobile Sticky Bottom Floating Bar (< 768px) */}
      <div className="mobile-reservation-bar">
        <div className="mobile-reservation-bar__info">
          <div>
            <span className="price-amount">{price}</span>
            <span className="price-period"> for {nights} nights</span>
          </div>
          <div className="mobile-reservation-bar__rating">
            <Star size={12} fill="#222" color="#222" />
            <span>{rating} ({reviewCount})</span>
          </div>
        </div>
        <button className="mobile-reserve-btn" onClick={onReserveClick}>Reserve</button>
      </div>

      {/* Categorized 50 Amenities Full Modal */}
      <AmenitiesModal 
        isOpen={isAmenitiesModalOpen} 
        onClose={() => setIsAmenitiesModalOpen(false)} 
      />

    </div>
  );
};

export default ListingDetails;
