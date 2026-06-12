import { useState } from "react";
import { Heart, MapPin, Ruler } from "lucide-react";
import type { Species } from "./data";
import { IUCN_COLORS, IUCN_LABELS } from "./data";

interface SpeciesCardProps {
  species: Species;
  onClick: () => void;
}

export function SpeciesCard({ species, onClick }: SpeciesCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: "#134074",
        border: "1px solid rgba(141, 169, 196, 0.15)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.10)",
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 4px rgba(0,0,0,0.10)";
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={species.imageUrl}
          alt={`${species.commonName} — ${species.scientificName}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ background: "#0B2545" }}
          loading="lazy"
        />
        {/* IUCN badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
          style={{
            background: "rgba(7, 26, 54, 0.85)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${IUCN_COLORS[species.status]}40`,
            color: "#E6EDF3",
          }}
          aria-label={`IUCN Conservation Status: ${IUCN_LABELS[species.status]}`}
        >
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: IUCN_COLORS[species.status] }} />
          {species.status}
        </div>
        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            background: "rgba(7, 26, 54, 0.75)",
            backdropFilter: "blur(8px)",
            color: saved ? "#EEB902" : "#8DA9C4",
          }}
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          aria-label={saved ? "Remove from collection" : "Save to collection"}
        >
          <Heart size={14} fill={saved ? "#EEB902" : "none"} />
        </button>

        {/* Hover reveal */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2.5 transition-all duration-300"
          style={{
            background: "linear-gradient(to top, rgba(11,37,69,0.95) 0%, transparent 100%)",
            transform: "translateY(100%)",
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.opacity = "1";
          }}
        >
          <span className="text-xs font-medium" style={{ color: "#EEB902" }}>{species.habitat}</span>
          <span className="text-xs font-medium" style={{ color: "#E6EDF3" }}>View Species →</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="font-semibold leading-tight" style={{ color: "#E6EDF3", fontFamily: "var(--font-display)", fontSize: "0.9rem" }}>
          {species.commonName}
        </p>
        <p className="mt-0.5 italic text-sm" style={{ fontFamily: "var(--font-scientific)", color: "#8DA9C4" }}>
          {species.scientificName}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="flex items-center gap-1 text-xs" style={{ color: "#8DA9C4" }}>
            <MapPin size={12} />
            {species.region}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: "#8DA9C4" }}>
            <Ruler size={12} />
            {species.size}
          </span>
        </div>
      </div>
    </div>
  );
}
