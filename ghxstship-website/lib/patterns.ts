/**
 * Generate Ben-Day dot pattern (comic book style)
 * @param size - Size of each dot
 * @param spacing - Spacing between dots
 * @param color - Color of the dots ('black' or 'white')
 * @returns SVG data URL
 */
export function generateDotPattern(
  size: number = 2,
  spacing: number = 8,
  color: 'black' | 'white' = 'black'
): string {
  const fillColor = color === 'black' ? '#000000' : '#FFFFFF';
  const svg = `
    <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${spacing / 2}" cy="${spacing / 2}" r="${size}" fill="${fillColor}" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Generate halftone pattern
 * @param density - Density of the pattern (0-1)
 * @returns SVG data URL
 */
export function generateHalftonePattern(density: number = 0.5): string {
  const size = 10;
  const dotSize = size * density;
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${dotSize}" fill="#000000" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Generate diagonal stripes pattern
 * @param angle - Angle of the stripes in degrees
 * @param spacing - Spacing between stripes
 * @param strokeWidth - Width of each stripe
 * @returns SVG data URL
 */
export function generateStripesPattern(
  angle: number = 45,
  spacing: number = 10,
  strokeWidth: number = 2
): string {
  const svg = `
    <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="${spacing}" height="${spacing}" patternTransform="rotate(${angle})">
          <line x1="0" y1="0" x2="0" y2="${spacing}" stroke="#000000" stroke-width="${strokeWidth}" />
        </pattern>
      </defs>
      <rect width="${spacing}" height="${spacing}" fill="url(#stripes)" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Generate grid pattern
 * @param size - Size of grid cells
 * @param strokeWidth - Width of grid lines
 * @returns SVG data URL
 */
export function generateGridPattern(
  size: number = 20,
  strokeWidth: number = 1
): string {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="none" stroke="#000000" stroke-width="${strokeWidth}" />
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Generate geometric shape pattern (circles, squares, triangles)
 * @param shape - Type of shape ('circle', 'square', 'triangle')
 * @param size - Size of the shape
 * @param spacing - Spacing between shapes
 * @returns SVG data URL
 */
export function generateGeometricPattern(
  shape: 'circle' | 'square' | 'triangle' = 'circle',
  size: number = 8,
  spacing: number = 16
): string {
  let shapeElement = '';
  
  switch (shape) {
    case 'circle':
      shapeElement = `<circle cx="${spacing / 2}" cy="${spacing / 2}" r="${size / 2}" fill="#000000" />`;
      break;
    case 'square':
      shapeElement = `<rect x="${(spacing - size) / 2}" y="${(spacing - size) / 2}" width="${size}" height="${size}" fill="#000000" />`;
      break;
    case 'triangle':
      const half = size / 2;
      const height = (Math.sqrt(3) / 2) * size;
      shapeElement = `<polygon points="${spacing / 2},${(spacing - height) / 2} ${(spacing - size) / 2},${(spacing + height) / 2} ${(spacing + size) / 2},${(spacing + height) / 2}" fill="#000000" />`;
      break;
  }
  
  const svg = `
    <svg width="${spacing}" height="${spacing}" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement}
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * CSS class generator for applying patterns
 */
export const patternClasses = {
  dots: (size: number = 2, spacing: number = 8) => ({
    backgroundImage: `url("${generateDotPattern(size, spacing)}")`,
    backgroundRepeat: 'repeat',
  }),
  halftone: (density: number = 0.5) => ({
    backgroundImage: `url("${generateHalftonePattern(density)}")`,
    backgroundRepeat: 'repeat',
  }),
  stripes: (angle: number = 45, spacing: number = 10) => ({
    backgroundImage: `url("${generateStripesPattern(angle, spacing)}")`,
    backgroundRepeat: 'repeat',
  }),
  grid: (size: number = 20) => ({
    backgroundImage: `url("${generateGridPattern(size)}")`,
    backgroundRepeat: 'repeat',
  }),
};
