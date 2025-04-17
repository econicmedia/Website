// Mobile Responsiveness Testing Utility
// This utility logs breakpoint information to help debug responsive issues

export const logBreakpoint = () => {
  if (typeof window === 'undefined') return;

  const getBreakpoint = () => {
    const width = window.innerWidth;
    if (width < 640) return 'xs (< 640px)';
    if (width < 768) return 'sm (640px - 767px)';
    if (width < 1024) return 'md (768px - 1023px)';
    if (width < 1280) return 'lg (1024px - 1279px)';
    return 'xl (≥ 1280px)';
  };

  console.log(`Current breakpoint: ${getBreakpoint()}`);
  console.log(`Window dimensions: ${window.innerWidth}px × ${window.innerHeight}px`);
};

export const watchResize = () => {
  if (typeof window === 'undefined') return () => {};
  
  const handleResize = () => {
    logBreakpoint();
  };
  
  window.addEventListener('resize', handleResize);
  // Initial log
  logBreakpoint();
  
  // Return function to remove listener
  return () => window.removeEventListener('resize', handleResize);
};
