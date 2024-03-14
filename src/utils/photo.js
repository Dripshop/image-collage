import fs from "fs";

export async function getPhoto(src) {
  if (src instanceof Buffer) {
    return src;
  }

  if (typeof src !== "string") {
    throw new Error(`Unsupported source type: ${src}`);
  }

  if (/^http/.test(src) || /^ftp/.test(src)) {
    try {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (_) {
      throw new Error(`Could not download url source: ${src}`);
    }
  }

  try {
    return await fs.promises.readFile(src);
  } catch (_) {
    throw new Error(`Could not load file source: ${src}`);
  }
}
