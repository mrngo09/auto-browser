import { writeFile } from "fs/promises";

export async function saveBase64AsImage(
  base64String: string,
  outputDir: string
) {
  try {

    // Convert to Buffer
    const buffer = Buffer.from(base64String, "base64");

    // Define output path
    const outputPath = `${outputDir}`;

    // Save the file
    await writeFile(outputPath, buffer);
    console.log(`Image saved to ${outputPath}`);
  } catch (error) {
    console.error("Error saving image:", error);
  }
}
