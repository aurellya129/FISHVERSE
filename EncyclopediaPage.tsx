import { useState, useMemo } from "react";
import { Filter, Grid3X3, List, X, SlidersHorizontal } from "lucide-react";
import { SpeciesCard } from "./SpeciesCard";
import { SPECIES_DATA, IUCN_COLORS, IUCN_LABELS, type IUCNStatus } from "./data";

interface EncyclopediaPageProps {
  onNavigate: (page: string, id?: string) => void;
}

const HABITATS = ["Coral Reef", "Deep Sea", "Freshwater", "Open Ocean", "Cold Water", "Mangrove"];
const STATUSES: IUCNStatus[] = ["CR", "EN", "VU", "NT", "LC", "DD"];

export function EncyclopediaPage({ onNavigate }: EncyclopediaPageProps) {
  const [selectedHabitats, setSelectedHabitats] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<IUCNStatus[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleHabitat = (h: string) => setSelectedHabitats((p) => p.includes(h) ? p.filter((x) => x !== h) : [...p, h]);
  const toggleStatus = (s: IUCNStatus) => setSelectedStatuses((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  const filtered = useMemo(() => {
    let results = [...SPECIES_DATA];
    if (selectedHabitats.length) results = results.filter((s) => selectedHabitats.includes(s.habitat));
    if (selectedStatuses.length) results = results.filter((s) => selectedStatuses.includes(s.status));
    if (sortBy === "az") results.sort((a, b) => a.commonName.localeCompare(b.commonName));
    if (sortBy === "conservation") results.sort((a, b) => {
      const order = ["CR", "EN", "VU", "NT", "LC", "DD"];
      return order.indexOf(a.status) - order.indexOf(b.status);
    });
    return results;
  }, [selectedHabitats, selectedStatuses, sortBy]);

  const activeFilters = [...selectedHabitats, ...selectedStatuses];
  const clearAll = () => { setSelectedHabitats([]); setSelectedStatuses([]); };

  return (
    <div style={{ background: "#0B2545", minHeight: "100vh" }}>
      {/* Page header */}
      <div className="pt-24 pb-10 px-6 lg:px-10" style={{ background: "linear-gradient(to bottom, #071A36, #0B2545)" }}>
        <div className="max-w-[1280px] mx-auto">
          <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: "#8DA9C4" }}>
            <button onClick={() => onNavigate("home")} className="hover:text-amber-400 transition-colors">Home</button>
            <span>/</span>
            <span style={{ color: "#E6EDF3" }}>Encyclopedia</span>
          </nav>
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#EEB902" }}>Encyclopedia</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#E6EDF3" }}>
            Browse All Species
          </h1>
          <p className="mt-2" style={{ color: "#8DA9C4", fontFamily: "var(--font-body)" }}>
            {SPECIES_DATA.length} species documented · {filtered.length} shown
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pb-20">
        <div className="flex gap-8">
          {/* Filter sidebar — desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel
              habitats={HABITATS}
              statuses={STATUSES}
              selectedHabitats={selectedHabitats}
              selectedStatuses={selectedStatuses}
              onToggleHabitat={toggleHabitat}
              onToggleStatus={toggleStatus}
              onClear={clearAll}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: "#134074", color: "#E6EDF3", border: "1px solid rgba(141, 169, 196, 0.20)" }}
                >
                  <SlidersHorizontal size={15} />
                  Filter {activeFilters.length > 0 && `(${activeFilters.length})`}
                </button>

                {/* Active pills */}
                {activeFilters.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "rgba(238, 185, 2, 0.15)", border: "1px solid rgba(238, 185, 2, 0.30)", color: "#EEB902" }}
                  >
                    {f}
                    <button onClick={() => {
                      if (HABITATS.includes(f)) toggleHabitat(f);
                      else toggleStatus(f as IUCNStatus);
                    }}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {activeFilters.length > 0 && (
                  <button onClick={clearAll} className="text-xs transition-colors hover:text-amber-400" style={{ color: "#8DA9C4" }}>
                    Clear all
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: "#134074", color: "#E6EDF3", border: "1px solid rgba(141, 169, 196, 0.20)" }}
                >
                  <option value="popular">Most Popular</option>
                  <option value="az">A – Z</option>
                  <option value="conservation">Conservation Priority</option>
                </select>
                <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.15)" }}>
                  <button
                    onClick={() => setViewMode("grid")}
                    className="p-1.5 rounded transition-colors"
                    style={{ background: viewMode === "grid" ? "#1A4F85" : "transparent", color: viewMode === "grid" ? "#E6EDF3" : "#8DA9C4" }}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className="p-1.5 rounded transition-colors"
                    style={{ background: viewMode === "list" ? "#1A4F85" : "transparent", color: viewMode === "list" ? "#E6EDF3" : "#8DA9C4" }}
                    aria-label="List view"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-4xl mb-4">🐟</p>
                <p style={{ color: "#E6EDF3", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.1rem" }}>
                  No species matched your filters.
                </p>
                <p className="mt-2 text-sm" style={{ color: "#8DA9C4" }}>
                  Try removing the conservation status or habitat filter.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-5 px-5 py-2.5 rounded-lg text-sm font-medium"
                  style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)" }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {filtered.map((species) => (
                  viewMode === "grid" ? (
                    <SpeciesCard
                      key={species.id}
                      species={species}
                      onClick={() => onNavigate("species", species.id)}
                    />
                  ) : (
                    <ListRow key={species.id} species={species} onClick={() => onNavigate("species", species.id)} />
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            style={{ background: "#0F2E54", border: "1px solid rgba(141, 169, 196, 0.15)" }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#E6EDF3" }}>Filters</h3>
              <button onClick={() => setFilterOpen(false)} style={{ color: "#8DA9C4" }}><X size={20} /></button>
            </div>
            <FilterPanel
              habitats={HABITATS}
              statuses={STATUSES}
              selectedHabitats={selectedHabitats}
              selectedStatuses={selectedStatuses}
              onToggleHabitat={toggleHabitat}
              onToggleStatus={toggleStatus}
              onClear={clearAll}
            />
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full mt-6 py-3 rounded-xl font-semibold"
              style={{ background: "#EEB902", color: "#0B2545", fontFamily: "var(--font-display)" }}
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterPanel({
  habitats, statuses, selectedHabitats, selectedStatuses,
  onToggleHabitat, onToggleStatus, onClear,
}: {
  habitats: string[];
  statuses: IUCNStatus[];
  selectedHabitats: string[];
  selectedStatuses: IUCNStatus[];
  onToggleHabitat: (h: string) => void;
  onToggleStatus: (s: IUCNStatus) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#8DA9C4" }}>Filters</p>
        {(selectedHabitats.length + selectedStatuses.length) > 0 && (
          <button onClick={onClear} className="text-xs transition-colors hover:text-amber-400" style={{ color: "#8DA9C4" }}>Clear all</button>
        )}
      </div>

      {/* Habitat */}
      <div>
        <p className="text-xs font-semibold mb-3" style={{ color: "#E6EDF3" }}>HABITAT</p>
        <div className="space-y-2">
          {habitats.map((h) => (
            <label key={h} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => onToggleHabitat(h)}
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  background: selectedHabitats.includes(h) ? "#EEB902" : "transparent",
                  border: `1.5px solid ${selectedHabitats.includes(h) ? "#EEB902" : "rgba(141, 169, 196, 0.30)"}`,
                }}
              >
                {selectedHabitats.includes(h) && <span style={{ fontSize: "0.6rem", color: "#0B2545", fontWeight: 700 }}>✓</span>}
              </div>
              <span
                onClick={() => onToggleHabitat(h)}
                className="text-sm transition-colors group-hover:text-white"
                style={{ color: selectedHabitats.includes(h) ? "#E6EDF3" : "#8DA9C4" }}
              >
                {h}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Conservation Status */}
      <div>
        <p className="text-xs font-semibold mb-3" style={{ color: "#E6EDF3" }}>CONSERVATION STATUS</p>
        <div className="space-y-2">
          {statuses.map((s) => (
            <label key={s} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => onToggleStatus(s)}
                className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: selectedStatuses.includes(s) ? IUCN_COLORS[s] : "transparent",
                  border: `1.5px solid ${selectedStatuses.includes(s) ? IUCN_COLORS[s] : "rgba(141, 169, 196, 0.30)"}`,
                }}
              >
                {selectedStatuses.includes(s) && <span style={{ fontSize: "0.6rem", color: "#fff", fontWeight: 700 }}>✓</span>}
              </div>
              <span className="flex items-center gap-2" onClick={() => onToggleStatus(s)}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: IUCN_COLORS[s] }} />
                <span
                  className="text-sm transition-colors group-hover:text-white"
                  style={{ color: selectedStatuses.includes(s) ? "#E6EDF3" : "#8DA9C4" }}
                >
                  {IUCN_LABELS[s]}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function ListRow({ species, onClick }: { species: ReturnType<typeof SPECIES_DATA[0]['habitat']['toString']>; onClick: () => void } & { species: (typeof SPECIES_DATA)[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.01]"
      style={{ background: "#134074", border: "1px solid rgba(141, 169, 196, 0.15)" }}
    >
      <img
        src={species.imageUrl}
        alt={species.commonName}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        style={{ background: "#0B2545" }}
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)" }}>{species.commonName}</p>
        <p className="italic text-xs mt-0.5" style={{ fontFamily: "var(--font-scientific)", color: "#8DA9C4" }}>{species.scientificName}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-xs" style={{ color: "#8DA9C4" }}>{species.habitat}</span>
          <span className="text-xs" style={{ color: "#8DA9C4" }}>· {species.region}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold"
          style={{ background: "rgba(7, 26, 54, 0.85)", color: "#E6EDF3", border: `1px solid ${IUCN_COLORS[species.status]}40` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: IUCN_COLORS[species.status] }} />
          {species.status}
        </span>
      </div>
    </div>
  );
}
