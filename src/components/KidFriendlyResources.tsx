import { ExternalLink } from "lucide-react";

const BOOK_COUNTRIES = new Set(["ghana", "china", "south-korea", "greece"]);
const BOOK_COUNTRY_NAMES: Record<string, string> = {
  "ghana": "Phyllis Goes to Ghana",
  "china": "Gerri Goes to China",
  "south-korea": "Bernard Goes to South Korea",
  "greece": "Eleanor Goes to Greece",
};

const BORDER_COLORS = [
  "border-l-blue-400",
  "border-l-emerald-400",
  "border-l-purple-400",
  "border-l-orange-400",
  "border-l-pink-400",
  "border-l-cyan-400",
  "border-l-amber-400",
  "border-l-rose-400",
];

function ResourceCard({ emoji, name, note, url, featured, borderColor }: {
  emoji: string; name: string; note: string; url: string; featured?: boolean; borderColor?: string;
}) {
  const handleClick = () => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <button
      onClick={handleClick}
      className={`rounded-2xl p-4 flex items-start gap-3 group text-left w-full transition-all border-l-4 ${
        featured
          ? "bg-yellow-50 border-2 border-yellow-400 border-l-yellow-400"
          : `bg-card border-2 border-border ${borderColor || "border-l-primary"}`
      }`}
    >
      <span className="text-2xl flex-shrink-0">{emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{name}</p>
          {featured && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900">⭐ Featured Book</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{note}</p>
      </div>
      <span className="flex-shrink-0 text-xs font-bold text-primary flex items-center gap-1 mt-1">
        Open <ExternalLink className="w-3 h-3" />
      </span>
    </button>
  );
}

export default function KidFriendlyResources({ countryName, countryId }: { countryName: string; countryId?: string }) {
  const q = encodeURIComponent(countryName);
  const wikiName = countryName.replace(/\s+/g, "_");

  const resources = [
    { emoji: "🌐", name: "Simple Wikipedia — Easy to read! 📖", note: `Learn about ${countryName} in simple English`, url: `https://simple.wikipedia.org/wiki/${wikiName}` },
    { emoji: "🌍", name: "National Geographic 🌍", note: "Explore amazing photos and facts about our world!", url: "https://www.nationalgeographic.com" },
    { emoji: "📜", name: "Nat Geo History 📜", note: "Discover history and ancient civilizations!", url: "https://www.nationalgeographic.com/history" },
    { emoji: "✈️", name: "BBC Travel ✈️", note: "Beautiful stories and guides from around the world!", url: "https://www.bbc.com/travel/destinations" },
    { emoji: "🗺️", name: "Explore on Google Maps 🗺️", note: `See ${countryName} from above and explore street view!`, url: `https://www.google.com/maps/place/${q}` },
    { emoji: "🎥", name: "Watch Videos 🎥 — Search Google Videos", note: "Ask a grown-up to help you watch!", url: `https://www.google.com/search?q=${q}+for+kids&tbm=vid` },
    { emoji: "🔍", name: "Search for Facts on Google 🔍", note: "Ask a grown-up to help you search!", url: `https://www.google.com/search?q=${q}+facts+for+kids` },
  ];

  const hasBook = countryId && BOOK_COUNTRIES.has(countryId);

  return (
    <div className="rounded-2xl border-2 border-border p-5" style={{ background: "hsl(172 66% 95%)" }}>
      <h3 className="text-lg font-heading text-foreground mb-1">Learn More About {countryName}! 📚</h3>
      <p className="text-xs font-semibold text-muted-foreground mb-4">🙋 Always ask a parent or teacher before visiting websites!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {hasBook && (
          <ResourceCard
            emoji="📗"
            name={`Read "${BOOK_COUNTRY_NAMES[countryId!]}"!`}
            note="A Melanated Stamps book by Dr. Jenaya Perdue"
            url="https://www.globalexeducation.com/shop"
            featured
          />
        )}
        {resources.map((r, i) => (
          <ResourceCard key={r.name} {...r} borderColor={BORDER_COLORS[i % BORDER_COLORS.length]} />
        ))}
      </div>
    </div>
  );
}
