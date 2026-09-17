import { useState, memo, useCallback, type CSSProperties } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { countries } from "@/data/countries";
import { useExplorations, type ExplorationRow } from "@/hooks/useExplorations";
import { ZoomIn, ZoomOut } from "lucide-react";
import { CountryInfoPanel } from "@/components/CountryInfoPanel";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const geoNameToId: Record<string, string> = {};
const nameOverrides: Record<string, string> = {
  "United States of America": "united-states",
  "Dem. Rep. Congo": "dr-congo",
  "Dominican Rep.": "dominican-republic",
  "Central African Rep.": "central-african-republic",
  "S. Sudan": "south-sudan",
  "Eq. Guinea": "equatorial-guinea",
  "W. Sahara": "western-sahara",
  "Solomon Is.": "solomon-islands",
  "Marshall Is.": "marshall-islands",
  "Bosnia and Herz.": "bosnia-and-herzegovina",
  "N. Macedonia": "north-macedonia",
  "Czech Rep.": "czech-republic",
  "Czechia": "czech-republic",
  "Korea": "south-korea",
  "Dem. Rep. Korea": "north-korea",
  "Lao PDR": "laos",
  "Côte d'Ivoire": "cote-d-ivoire",
  "Ivory Coast": "cote-d-ivoire",
  "eSwatini": "eswatini",
  "Swaziland": "eswatini",
  "Timor-Leste": "timor-leste",
  "East Timor": "timor-leste",
  "Brunei Darussalam": "brunei",
  "Myanmar": "myanmar",
  "Palestine": "palestine",
  "Israel": "palestine",
  "Fr. S. Antarctic Lands": "",
  "Falkland Is.": "",
  "Cabo Verde": "cabo-verde",
  "Cape Verde": "cabo-verde",
  "São Tomé and Principe": "sao-tome-and-principe",
  "Vatican": "vatican-city",
  "United Arab Emirates": "united-arab-emirates",
  "Saudi Arabia": "saudi-arabia",
  "South Korea": "south-korea",
  "North Korea": "north-korea",
  "South Africa": "south-africa",
  "New Zealand": "new-zealand",
  "Sri Lanka": "sri-lanka",
  "Costa Rica": "costa-rica",
  "El Salvador": "el-salvador",
  "Trinidad and Tobago": "trinidad-and-tobago",
  "Antigua and Barb.": "antigua-and-barbuda",
  "St. Vin. and Gren.": "saint-vincent-and-the-grenadines",
  "St. Kitts and Nevis": "saint-kitts-and-nevis",
  "St. Lucia": "saint-lucia",
  "Papua New Guinea": "papua-new-guinea",
  "Burkina Faso": "burkina-faso",
  "Sierra Leone": "sierra-leone",
  "Guinea-Bissau": "guinea-bissau",
  "Equatorial Guinea": "equatorial-guinea",
};
countries.forEach(c => { geoNameToId[c.name] = c.id; });
Object.entries(nameOverrides).forEach(([geoName, id]) => { if (id) geoNameToId[geoName] = id; });

function getStatusColor(status?: string): string {
  if (status === "completed") return "#22c55e";
  if (status === "in_progress") return "#14b8a6";
  return "#e5e7eb";
}

function getHoverColor(status?: string): string {
  if (status === "completed") return "#16a34a";
  if (status === "in_progress") return "#0d9488";
  return "#d1d5db";
}

const MapChart = memo(function MapChart({ onCountryClick, setTooltip, explorations, zoom, center }: {
  onCountryClick: (id: string) => void;
  setTooltip: (t: string | null) => void;
  explorations: ExplorationRow[];
  zoom: number;
  center: [number, number];
}) {
  const getExploration = (countryId: string) => explorations.find(e => e.country_id === countryId);

  return (
    <ComposableMap projection="geoNaturalEarth1" width={900} height={500} style={{ width: "100%", height: "auto" }}>
      <ZoomableGroup center={center} zoom={zoom} minZoom={1} maxZoom={8}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const countryId = geoNameToId[name];
              const exploration = countryId ? getExploration(countryId) : undefined;
              const fill = getStatusColor(exploration?.status);
              const country = countryId ? countries.find(c => c.id === countryId) : null;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="hsl(var(--background))"
                  strokeWidth={0.5}
                  className="gej-geography"
                  style={{
                    "--fill": fill,
                    "--fill-hover": country ? getHoverColor(exploration?.status) : getHoverColor(),
                    cursor: country ? "pointer" : "default",
                  } as CSSProperties}
                  onMouseEnter={() => {
                    if (country) {
                      const status = exploration?.status === "completed" ? "✅ Completed" : exploration?.status === "in_progress" ? "🌀 In Progress" : "🔒 Not Explored";
                      setTooltip(`${country.flag} ${country.name} — ${status}`);
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => { if (country) onCountryClick(country.id); }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
});

export default function WorldMap() {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const { data: explorations = [] } = useExplorations();

  const selectedExploration = selected ? explorations.find(e => e.country_id === selected) : undefined;

  const handleCountryClick = useCallback((id: string) => {
    setSelected(id);
  }, []);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto animate-fade-slide-in">
      <h1 className="text-3xl text-foreground mb-4">World Map 🗺️</h1>

      {/* Map */}
      <div className="relative bg-card rounded-2xl border-2 border-border overflow-hidden mb-4">
        <MapChart onCountryClick={handleCountryClick} setTooltip={setTooltip} explorations={explorations} zoom={zoom} center={[0, 20]} />

        {tooltip && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-bold shadow-lg z-10 pointer-events-none">
            {tooltip}
          </div>
        )}

        <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
          <button onClick={() => setZoom(z => Math.min(z * 1.5, 8))} className="bg-card/90 backdrop-blur border-2 border-border rounded-lg p-2 hover:bg-muted transition-colors">
            <ZoomIn className="w-4 h-4 text-foreground" />
          </button>
          <button onClick={() => setZoom(z => Math.max(z / 1.5, 1))} className="bg-card/90 backdrop-blur border-2 border-border rounded-lg p-2 hover:bg-muted transition-colors">
            <ZoomOut className="w-4 h-4 text-foreground" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur rounded-xl border-2 border-border px-4 py-3 flex flex-col gap-1.5 text-xs font-semibold z-10">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} /> Completed</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#14b8a6" }} /> In Progress</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ background: "#e5e7eb" }} /> Not Explored</div>
        </div>
      </div>

      {/* Info Panel below map */}
      <CountryInfoPanel countryId={selected} exploration={selectedExploration} />
    </div>
  );
}
