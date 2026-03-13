/**
 * Converts a string into a URL-friendly slug.
 * This function is optimized to handle common Brazilian Portuguese characters.
 *
 * @param text The string to convert.
 * @returns The slugified string.
 *
 * @example
 * slugify("Nike");
 * // "nike"
 *
 * @example
 * slugify("Minha Marca Incrível");
 * // "minha-marca-incrivel"
 *
 * @example
 * slugify("Tênis com Tração & Aderência");
 * // "tenis-com-tracao-e-aderencia"
 *
 * @example
 * slugify("  O Boticário-  ");
 * // "o-boticario"
 */
export const slugify = (text: string): string => {
  if (typeof text !== "string") {
    return "";
  }

  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return text
    .toString()
    .toLowerCase()
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/[\s_]+/g, "-")
    .replace(/&/g, "-e-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

/**
 * Extracts a search term from a URL, specifically handling complex VTEX brand URLs.
 * It uses the 'map' query parameter to identify the correct URL segment for the brand.
 *
 * @param url The URL object to parse.
 * @param termIdentifier The identifier in the 'map' param to look for. Defaults to 'b' for brand.
 * @returns The extracted and slugified term (e.g., a brand slug) or null if not found.
 *
 * @example
 * // Extracts brand from a VTEX URL by matching the 'map' index
 * const url1 = new URL("https://store.com/western/WESTERN-DIGITAL?map=ft,b");
 * getTermFromURL(url1);
 * // "western-digital"
 *
 * @example
 * // Handles simple slug-based URLs as a fallback
 * const url2 = new URL("https://store.com/western-digital");
 * getTermFromURL(url2);
 * // "western-digital"
 *
 * @example
 * // Returns the last segment as a fallback if the map is missing or doesn't match
 * const url3 = new URL("https://store.com/department/brand-name");
 * getTermFromURL(url3);
 * // "brand-name"
 *
 * @example
 * // Returns null for root URLs
 * const url4 = new URL("https://store.com/");
 * getTermFromURL(url4);
 * // null
 */
/**
 * Converts a slugified string back to a readable format.
 * This is the reverse operation of slugify, useful for displaying search terms.
 *
 * @param slug The slugified string to convert back.
 * @returns The unslugified string with proper capitalization.
 *
 * @example
 * unslugify("hd-externo");
 * // "hd externo"
 *
 * @example
 * unslugify("minha-marca-incrivel");
 * // "minha marca incrivel"
 */
export const unslugify = (slug: string): string => {
  if (typeof slug !== "string" || !slug.trim()) {
    return "";
  }

  return slug.replace(/-/g, " ").trim();
};

export const getTermFromURL = (
  url: URL,
  termIdentifier = "b",
): string | null => {
  if (!(url instanceof URL)) {
    return null;
  }

  const pathname = url.pathname;
  const searchParams = url.searchParams;
  const map = searchParams.get("map");

  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) {
    return null;
  }

  if (map) {
    const mapSegments = map.split(",");
    const brandIndex = mapSegments.indexOf(termIdentifier);

    if (brandIndex !== -1 && pathSegments[brandIndex]) {
      return slugify(pathSegments[brandIndex]);
    }
  }

  if (searchParams.get("q")) {
    return null;
  }

  const lastSegment = pathSegments[pathSegments.length - 1];
  return slugify(lastSegment);
};
