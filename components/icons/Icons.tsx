import React from 'react';

export const WaterDropIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);
export const PumpIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l16.5-16.5m-16.5 0h16.5v16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-5.113 0-9.25-4.137-9.25-9.25S6.887 3.25 12 3.25s9.25 4.137 9.25 9.25-4.137 9.25-9.25 9.25z" />
</svg>
);
export const SoilIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345h5.584a.563.563 0 01.321.988l-4.204 3.192a.563.563 0 00-.182.557l1.528 4.707a.562.562 0 01-.827.636l-4.204-3.192a.563.563 0 00-.58 0l-4.204 3.192a.562.562 0 01-.827-.636l1.528-4.707a.563.563 0 00-.182-.557l-4.204-3.192a.563.563 0 01.321-.988h5.584a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);
export const HomeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 13.5V21h6V15h6v6h6V13.5M9 21v-6a3 3 0 013-3h0a3 3 0 013 3v6" />
  </svg>
);
export const ChartIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18h18M3.75 18.75h18M9 14.25l6-6m-6 0l6 6" />
  </svg>
);
export const SettingsIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.226.55-.22 1.156-.22 1.706 0 .55.219 1.02.684 1.11 1.226l.043.256c.23.136.45.292.658.468l.21.176c.414.348.993.348 1.406 0l.21-.176a3.75 3.75 0 014.28 4.28l-.176.21a1.5 1.5 0 000 1.406l.176.21a3.75 3.75 0 01-4.28 4.28l-.21.176a1.5 1.5 0 00-1.406 0l-.21-.176a4.5 4.5 0 01-.658.468l-.043.256c-.09.542-.56 1.007-1.11 1.226-.55.22-1.156-.22-1.706 0-.55-.219-1.02-.684-1.11-1.226l-.043-.256a4.5 4.5 0 01-.658-.468l-.21-.176a1.5 1.5 0 00-1.406 0l-.21.176a3.75 3.75 0 01-4.28-4.28l.176-.21a1.5 1.5 0 000-1.406l-.176-.21a3.75 3.75 0 014.28-4.28l.21-.176c.413-.348.992-.348 1.406 0l.21.176c.208.176.428.332.658.468l.043.256zM12 15a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);
export const InfoIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
export const DashboardIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);
export const BellIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);
export const WarningAlertIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);
export const InfoAlertIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);