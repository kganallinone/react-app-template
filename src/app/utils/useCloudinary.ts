/**
 * Extracts the Cloudinary publicId from a given URL, removing the version part if present.
 * @param url - The full Cloudinary URL.
 * @returns The publicId if found, otherwise null.
 */
export function getCloudinaryPublicId(url: string): string | null {
  const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.[a-zA-Z]+)$/;
  const match = url.match(regex);

  return match ? match[1] : null;
}
