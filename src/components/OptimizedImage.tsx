import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component that implements best practices for image loading
 * - Lazy loading by default
 * - Proper alt text enforcement
 * - Size optimization
 * - Responsive sizing
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw',
  quality = 85,
  fill = false,
  style,
  objectFit,
  objectPosition,
  placeholder = 'empty',
  blurDataURL,
  loading,
  onLoad,
  onError,
}) => {
  // Generate placeholder blur data for images without one provided
  const defaultBlurDataURL = !blurDataURL && placeholder === 'blur' 
    ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNFMEY3RkEiLz48L3N2Zz4='
    : blurDataURL;

  // Set default loading strategy based on priority
  const imgLoading = loading || (priority ? 'eager' : 'lazy');

  // Combine object-fit and object-position into style if provided
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(objectFit && { objectFit }),
    ...(objectPosition && { objectPosition }),
  };

  return (
    <div className={`relative ${className}`} style={{ overflow: 'hidden' }}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        fill={fill}
        style={combinedStyle}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        loading={imgLoading}
        onLoad={onLoad}
        onError={onError}
        className={fill ? 'object-cover w-full h-full' : ''}
        // Accessibility attributes
        role="img"
        aria-label={alt}
      />
    </div>
  );
};

export default OptimizedImage;
