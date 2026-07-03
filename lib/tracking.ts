const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

function classifyTarget(url: string): string {
  if (/wa\.me|whatsapp/i.test(url)) return "whatsapp";
  if (/instagram\.com/i.test(url)) return "instagram";
  if (/\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)) return "image";
  return "link";
}

export function injectTracking(html: string, campaignId: string, contactId: string): string {
  const pixel = `<img src="${BASE_URL}/api/track/open?c=${campaignId}&u=${contactId}" width="1" height="1" style="display:none" alt="" />`;

  // Replace all <a href="..."> except those already pointing to our tracker
  const tracked = html.replace(
    /<a\s+([^>]*?)href="([^"]+)"([^>]*?)>/gi,
    (match, before, url, after) => {
      if (url.startsWith(BASE_URL)) return match;
      const target = classifyTarget(url);
      const trackUrl = `${BASE_URL}/api/track/click?c=${campaignId}&u=${contactId}&t=${target}&url=${encodeURIComponent(url)}`;
      return `<a ${before}href="${trackUrl}"${after}>`;
    }
  );

  // Inject pixel before </body> or at the end
  return tracked.includes("</body>")
    ? tracked.replace("</body>", `${pixel}</body>`)
    : tracked + pixel;
}
