import React from 'react';
import logoImg from '@/assets/logo.png';


export default function Logo({ className = "h-8", iconOnly = false }) {
  return (
    <div className={`${iconOnly ? 'bg-transparent p-0' : 'bg-[#FFFFFF] dark:bg-transparent p-1'} rounded-lg flex items-center justify-center`}>
      <img src={iconOnly ? "/XebiaFavicon.png" : logoImg} className={`${className} w-auto object-contain`} alt="Xebia Logo" />
    </div>
  );
}
