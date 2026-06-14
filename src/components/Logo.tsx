import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  color?: string;
}

export default function Logo({ className, color }: LogoProps) {
  /**
   * We use the provided PNG logo exactly as requested.
   * To handle the 'scrolled' state where the logo needs to be visible against 
   * the dark brown background, we apply a brightness/invert filter if the 
   * requested color is the light brand peach (#f8e9d4).
   */
  const isLightMode = color === "#f8e9d4";
  
  return (
    <div className={cn("relative inline-block", className)}>
      <img
        src="/logo.png"
        alt="Craviston"
        className={cn(
          "w-full h-auto object-contain transition-all duration-300",
          isLightMode && "brightness-0 invert-[0.95] sepia-[0.2] saturate-[0.5] hue-rotate-[0deg]"
        )}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}