import { useEffect,type RefObject } from 'react';

export const useFluidScroll = <C extends HTMLElement, T extends HTMLElement>(
  containerRef: RefObject<C>,
  activeRef: RefObject<T>,
  trigger: any
) => {
  useEffect(() => {
    // 1. Guard Clauses: Check for existence
    if (!containerRef.current || !activeRef.current) return;

    const container = containerRef.current;
    const target = activeRef.current;

    // 2. MATH CALCULATIONS
    
    // Calculate exact center pixel of the container
    const containerCenter = container.clientHeight / 2;
    
    // Calculate exact center pixel of the active word relative to the container parent
    const targetTop = target.offsetTop;
    const targetHeight = target.clientHeight;
    const targetCenter = targetTop + (targetHeight / 2);
    
    // The Scroll Destination:
    // "Where should the top of the viewport be so the target aligns with the center?"
    const scrollDest = targetCenter - containerCenter;

    // 3. APPLY SCROLL
    container.scrollTo({
      top: scrollDest,
      behavior: 'smooth'
    });
    
  }, [trigger, containerRef, activeRef]);
};