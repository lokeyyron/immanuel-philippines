const CHANNEL_ID = "UC5-kEghie5b3uts5GO010Dg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export const revalidate = 300;

function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(x[\da-f]+|\d+);/gi, (_, code) => {
      const parsed = code.toLowerCase().startsWith("x")
        ? Number.parseInt(code.slice(1), 16)
        : Number.parseInt(code, 10);
      return Number.isFinite(parsed) ? String.fromCodePoint(parsed) : _;
    })
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();
}

function readTag(entry, tag) {
  const match = entry.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function formatDate(published) {
  if (!published) return "";
  const date = new Date(published);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    // YouTube publishes these timestamps in UTC. Keeping the calendar date
    // in that source timezone avoids late-night broadcasts rolling forward
    // to the next day in the card labels.
    timeZone: "UTC",
  }).format(date);
}

function parseFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)]
    .map(([, entry]) => {
      const id = readTag(entry, "yt:videoId");
      const title = readTag(entry, "title");
      const published = readTag(entry, "published") || readTag(entry, "updated");
      const description = readTag(entry, "media:description");
      if (!id || !title) return null;
      return {
        id,
        title,
        published,
        date: formatDate(published),
        description,
      };
    })
    .filter(Boolean);
}

export async function GET() {
  try {
    const response = await fetch(FEED_URL, {
      headers: { "User-Agent": "ImmanuelChurchPH/1.0" },
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);
    const videos = parseFeed(await response.text());
    return Response.json({ videos }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    // The page keeps its curated archive if YouTube is temporarily unavailable.
    return Response.json({ videos: [] }, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  }
}
