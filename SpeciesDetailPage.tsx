import { useState } from "react";
import { ArrowLeft, Heart, ShoppingCart, MapPin, Thermometer, Ruler, Utensils, Anchor, Share2, BookOpen } from "lucide-react";
import { SPECIES_DATA, IUCN_COLORS, IUCN_LABELS, type Species } from "./data";

interface SpeciesDetailPageProps {
  speciesId: string;
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: (productId: string) => void;
}

const TABS = ["Overview", "Taxonomy", "Habitat", "Conservation"];

export function SpeciesDetailPage({ speciesId, onNavigate, onAddToCart }: SpeciesDetailPageProps) {
  const species = SPECIES_DATA.find((s) => s.id === speciesId);
  const [activeTab, setActiveTab] = useState("Overview");
  const [saved, setSaved] = useState(false);
  const [imageIdx, setImageIdx] = useState(0);

  if (!species) return (
    <div style={{ background: "#0B2545", minHeight: "100vh" }} className="flex items-center justify-center">
      <p style={{ color: "#8DA9C4" }}>Species not found.</p>
    </div>
  );

  const relatedSpecies = SPECIES_DATA.filter((s) => s.id !== species.id && s.habitat === species.habitat).slice(0, 3);

  const thumbnails = [species.imageUrl];

  return (
    <div style={{ background: "#0B2545", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-6 lg:px-10" style={{ background: "#071A36" }}>
        <div className="max-w-[1280px] mx-auto">
          <nav className="flex items-center gap-2 text-xs" style={{ color: "#8DA9C4" }}>
            <button onClick={() => onNavigate("home")} className="hover:text-amber-400 transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate("encyclopedia")} className="hover:text-amber-400 transition-colors">Encyclopedia</button>
            <span>/</span>
            <button onClick={() => onNavigate("encyclopedia")} className="hover:text-amber-400 transition-colors">{species.habitat}</button>
            <span>/</span>
            <span style={{ color: "#E6EDF3" }}>{species.commonName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
        {/* Back button */}
        <button
          onClick={() => onNavigate("encyclopedia")}
          className="flex items-center gap-2 mb-8 text-sm transition-colors hover:text-amber-400"
          style={{ color: "#8DA9C4" }}
        >
          <ArrowLeft size={16} />
          Back to Encyclopedia
        </button>

        {/* Hero layout */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Gallery */}
          <div>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: "4/3", boxShadow: "0 8px 32px rgba(0,0,0,0.40)" }}
            >
              <img
                src={species.imageUrl}
                alt={`${species.commonName} — ${species.scientificName} — reef fish`}
                className="w-full h-full object-cover"
                style={{ background: "#134074" }}
              />
              <div
                className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold"
                style={{
                  background: "rgba(7, 26, 54, 0.90)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${IUCN_COLORS[species.status]}50`,
                  color: "#E6EDF3",
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: IUCN_COLORS[species.status] }} />
                {IUCN_LABELS[species.status]}
              </div>
            </div>
            {/* Thumbnails placeholder */}
            <div className="flex gap-2 mt-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg overflow-hidden cursor-pointer"
                  style={{
                    border: `2px solid ${i === 0 ? "#EEB902" : "rgba(141, 169, 196, 0.20)"}`,
                    background: "#134074",
                  }}
                >
                  <img src={species.imageUrl} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                color: "#E6EDF3",
                lineHeight: 1.15,
              }}
            >
              {species.commonName}
            </h1>
            <p
              className="mt-2 italic"
              style={{ fontFamily: "var(--font-scientific)", fontSize: "1.15rem", color: "#8DA9C4" }}
            >
              {species.scientificName}
            </p>

            <div className="h-px my-5" style={{ background: "rgba(141, 169, 196, 0.15)" }} />

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: MapPin, label: "Region", value: species.region },
                { icon: Ruler, label: "Max Size", value: species.size },
                { icon: Thermometer, label: "Temperature", value: species.temp },
                { icon: Utensils, label: "Diet", value: species.diet },
                { icon: Anchor, label: "Depth", value: species.depth },
                { icon: BookOpen, label: "Habitat", value: species.habitat },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.12)" }}
                >
                  <Icon size={16} style={{ color: "#EEB902", marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p className="text-xs" style={{ color: "#8DA9C4" }}>{label}</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "#E6EDF3" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px my-5" style={{ background: "rgba(141, 169, 196, 0.15)" }} />

            {/* Actions */}
            <div className="space-y-3">
              {species.forSale && (
                <button
                  onClick={() => onNavigate("marketplace")}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 hover:scale-[1.01]"
                  style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)", fontSize: "0.95rem" }}
                >
                  <ShoppingCart size={17} />
                  Buy This Species — From ${species.price}
                </button>
              )}
              <button
                onClick={() => setSaved(!saved)}
                className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
                style={{
                  background: saved ? "rgba(238, 185, 2, 0.15)" : "transparent",
                  color: saved ? "#EEB902" : "#8DA9C4",
                  border: `1.5px solid ${saved ? "rgba(238, 185, 2, 0.40)" : "rgba(141, 169, 196, 0.25)"}`,
                }}
              >
                <Heart size={16} fill={saved ? "#EEB902" : "none"} />
                {saved ? "Saved to Collection" : "Save to Collection"}
              </button>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/10"
                style={{ color: "#8DA9C4", border: "1px solid rgba(141, 169, 196, 0.20)" }}
              >
                <Share2 size={12} />
                Share Species
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/10"
                style={{ color: "#8DA9C4", border: "1px solid rgba(141, 169, 196, 0.20)" }}
              >
                <BookOpen size={12} />
                Cite This Page
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-8" style={{ borderColor: "rgba(141, 169, 196, 0.15)" }}>
          <div className="flex gap-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px"
                style={{
                  color: activeTab === tab ? "#EEB902" : "#8DA9C4",
                  borderColor: activeTab === tab ? "#EEB902" : "transparent",
                  fontFamily: "var(--font-body)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="max-w-3xl mb-12">
          {activeTab === "Overview" && (
            <div className="space-y-6">
              <p style={{ color: "#C9D1D9", fontFamily: "var(--font-body)", lineHeight: 1.8, fontSize: "1.05rem" }}>
                {species.description}
              </p>
              <div>
                <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#E6EDF3" }}>
                  Fascinating Facts
                </h3>
                <ul className="space-y-3">
                  {species.facts.map((fact, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: "rgba(238, 185, 2, 0.15)", color: "#EEB902" }}>
                        {i + 1}
                      </span>
                      <span style={{ color: "#C9D1D9", fontSize: "0.95rem", lineHeight: 1.7 }}>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "Taxonomy" && (
            <div className="space-y-4">
              <p className="text-sm mb-6" style={{ color: "#8DA9C4" }}>
                Scientific classification of{" "}
                <em style={{ fontFamily: "var(--font-scientific)", color: "#E6EDF3" }}>{species.scientificName}</em>
                {" "}according to the modern phylogenetic taxonomy system.
              </p>
              {Object.entries(species.taxonomy).map(([rank, value]) => (
                <div
                  key={rank}
                  className="flex items-center justify-between py-3 border-b"
                  style={{ borderColor: "rgba(141, 169, 196, 0.10)" }}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8DA9C4" }}>{rank}</span>
                  <span className="italic" style={{ fontFamily: "var(--font-scientific)", color: "#E6EDF3" }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Habitat" && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl" style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.15)" }}>
                <h3 className="mb-3 font-semibold" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>Distribution</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8DA9C4" }}>
                  {species.commonName} is found across <strong style={{ color: "#E6EDF3" }}>{species.region}</strong>, primarily inhabiting{" "}
                  <strong style={{ color: "#E6EDF3" }}>{species.habitat.toLowerCase()}</strong> environments at depths of {species.depth}.
                  Water temperature range: {species.temp}.
                </p>
              </div>
              {/* Placeholder distribution map */}
              <div
                className="rounded-xl flex items-center justify-center"
                style={{ height: 200, background: "linear-gradient(135deg, #071A36 0%, #134074 100%)", border: "1px solid rgba(141, 169, 196, 0.15)" }}
              >
                <div className="text-center">
                  <MapPin size={28} style={{ color: "#EEB902", margin: "0 auto 8px" }} />
                  <p className="text-sm" style={{ color: "#8DA9C4" }}>Interactive distribution map</p>
                  <p className="text-xs mt-1" style={{ color: "#6B8BAD" }}>Mapbox integration — premium feature</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Conservation" && (
            <div className="space-y-5">
              <div
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: "#134074", border: `1px solid ${IUCN_COLORS[species.status]}30` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ background: `${IUCN_COLORS[species.status]}20`, color: IUCN_COLORS[species.status] }}
                >
                  {species.status}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>{IUCN_LABELS[species.status]}</p>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "#8DA9C4" }}>
                    {species.status === "LC" && "This species has been evaluated and does not qualify for a more threatened category. Populations are stable."}
                    {species.status === "EN" && "This species faces a very high risk of extinction in the wild. Population trends are declining due to habitat loss and overfishing."}
                    {species.status === "VU" && "This species is at high risk of extinction in the wild if threatening conditions persist. International trade is monitored."}
                    {species.status === "CR" && "This species faces an extremely high risk of extinction in the wild. Urgent conservation action required."}
                    {species.status === "NT" && "This species is close to qualifying for a threatened category or is likely to qualify in the near future."}
                    {species.status === "DD" && "There is inadequate information to make an assessment of this species."}
                  </p>
                </div>
              </div>
              <div className="p-5 rounded-xl" style={{ background: "rgba(26, 158, 92, 0.08)", border: "1px solid rgba(26, 158, 92, 0.20)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "#1A9E5C" }}>How to help</p>
                <ul className="space-y-1.5 text-sm" style={{ color: "#8DA9C4" }}>
                  <li>• Choose captive-bred specimens over wild-caught when available</li>
                  <li>• Verify CITES documentation for internationally traded species</li>
                  <li>• Support certified conservation organizations</li>
                  <li>• Report suspected illegal trade to local wildlife authorities</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Related species */}
        {relatedSpecies.length > 0 && (
          <div>
            <h2 className="mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "#E6EDF3" }}>
              Related Species
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedSpecies.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onNavigate("species", s.id)}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:scale-[1.02]"
                  style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.15)" }}
                >
                  <img src={s.imageUrl} alt={s.commonName} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>{s.commonName}</p>
                    <p className="text-xs italic" style={{ fontFamily: "var(--font-scientific)", color: "#8DA9C4" }}>{s.scientificName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
