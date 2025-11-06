import sharp from 'sharp';

/**
 * Convert an image to high-contrast black and white
 * @param inputPath - Path to the input image
 * @param outputPath - Path where the processed image will be saved
 */
export async function convertToMonochrome(
  inputPath: string,
  outputPath: string
): Promise<void> {
  try {
    await sharp(inputPath)
      .grayscale() // Convert to greyscale
      .normalize() // Enhance contrast
      .modulate({
        brightness: 1.1,
        saturation: 0,
      })
      .toFile(outputPath);
  } catch (error) {
    console.error('Error converting image to monochrome:', error);
    throw error;
  }
}

/**
 * Apply halftone effect to an image
 * @param inputPath - Path to the input image
 * @param outputPath - Path where the processed image will be saved
 * @param dotSize - Size of halftone dots (default: 4)
 */
export async function applyHalftone(
  inputPath: string,
  outputPath: string,
  dotSize: number = 4
): Promise<void> {
  try {
    // First convert to grayscale
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    await image
      .grayscale()
      .threshold(128) // Convert to pure black and white
      .toFile(outputPath);
    
    // Note: Full halftone effect would require canvas manipulation
    // This is a simplified version using threshold
  } catch (error) {
    console.error('Error applying halftone:', error);
    throw error;
  }
}

/**
 * Create a duotone image with black and white
 * @param inputPath - Path to the input image
 * @param outputPath - Path where the processed image will be saved
 */
export async function createDuotone(
  inputPath: string,
  outputPath: string
): Promise<void> {
  try {
    await sharp(inputPath)
      .grayscale()
      .linear(1.2, -(128 * 0.2)) // Increase contrast
      .toFile(outputPath);
  } catch (error) {
    console.error('Error creating duotone:', error);
    throw error;
  }
}

/**
 * Batch process multiple images to monochrome
 * @param inputPaths - Array of input image paths
 * @param outputDir - Directory where processed images will be saved
 */
export async function batchConvertToMonochrome(
  inputPaths: string[],
  outputDir: string
): Promise<void> {
  const promises = inputPaths.map((inputPath) => {
    const filename = inputPath.split('/').pop();
    const outputPath = `${outputDir}/${filename}`;
    return convertToMonochrome(inputPath, outputPath);
  });
  
  await Promise.all(promises);
}

/**
 * Get image metadata
 * @param imagePath - Path to the image
 */
export async function getImageMetadata(imagePath: string) {
  try {
    const metadata = await sharp(imagePath).metadata();
    return metadata;
  } catch (error) {
    console.error('Error getting image metadata:', error);
    throw error;
  }
}
