export type IUCNStatus = 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD';

export const IUCN_COLORS: Record<IUCNStatus, string> = {
  CR: '#CC0000',
  EN: '#CC6600',
  VU: '#CCCC00',
  NT: '#006666',
  LC: '#1A9E5C',
  DD: '#999999',
};

export const IUCN_LABELS: Record<IUCNStatus, string> = {
  CR: 'Critically Endangered',
  EN: 'Endangered',
  VU: 'Vulnerable',
  NT: 'Near Threatened',
  LC: 'Least Concern',
  DD: 'Data Deficient',
};

export interface Species {
  id: string;
  slug: string;
  commonName: string;
  scientificName: string;
  habitat: string;
  region: string;
  size: string;
  temp: string;
  status: IUCNStatus;
  imageUrl: string;
  description: string;
  diet: string;
  depth: string;
  taxonomy: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
  facts: string[];
  forSale: boolean;
  price?: number;
}

export interface Product {
  id: string;
  speciesId: string;
  name: string;
  seller: string;
  sellerRating: number;
  sellerReviews: number;
  price: number;
  imageUrl: string;
  captiveBred: boolean;
  inStock: boolean;
  stockCount: number;
  deliveryDays: string;
  tags: string[];
  description: string;
}

export const SPECIES_DATA: Species[] = [
  {
    id: '1',
    slug: 'mandarin-dragonet',
    commonName: 'Mandarin Dragonet',
    scientificName: 'Synchiropus splendidus',
    habitat: 'Coral Reef',
    region: 'Western Pacific',
    size: '6 cm',
    temp: '24–27°C',
    status: 'LC',
    imageUrl: 'https://images.unsplash.com/photo-1550016681-60a1d9d23bf7?w=560&h=420&fit=crop&auto=format',
    description: 'The mandarin dragonet is arguably the most vibrantly colored fish in the ocean. Its psychedelic blue-green body covered in orange and gold swirls makes it one of the most sought-after species in the reef aquarium trade. Native to the tropical Pacific, it inhabits sheltered inshore reefs and lagoons.',
    diet: 'Copepods, small invertebrates',
    depth: '1–18 m',
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Callionymiformes',
      family: 'Callionymidae',
      genus: 'Synchiropus',
      species: 'S. splendidus',
    },
    facts: [
      'One of only two vertebrate species that produces blue pigment without structural coloration',
      'Lacks scales — protected instead by a thick, foul-tasting mucus coat',
      'Feeds exclusively on tiny copepods, making it challenging to maintain in captivity',
      'Males engage in elaborate sunset courtship displays above the reef',
    ],
    forSale: true,
    price: 89,
  },
  {
    id: '2',
    slug: 'ocellaris-clownfish',
    commonName: 'Ocellaris Clownfish',
    scientificName: 'Amphiprion ocellaris',
    habitat: 'Coral Reef',
    region: 'Indo-Pacific',
    size: '11 cm',
    temp: '25–27°C',
    status: 'LC',
    imageUrl: 'https://images.unsplash.com/photo-1613779907266-f85db34edae5?w=560&h=420&fit=crop&auto=format',
    description: 'The ocellaris clownfish, made famous worldwide, lives in a symbiotic relationship with sea anemones. Immune to the anemone\'s stinging tentacles, it benefits from protection while helping keep the anemone clean and aerated. Found across Indo-Pacific coral reefs from the Andaman Sea to Australia.',
    diet: 'Algae, zooplankton, small crustaceans',
    depth: '1–15 m',
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Perciformes',
      family: 'Pomacentridae',
      genus: 'Amphiprion',
      species: 'A. ocellaris',
    },
    facts: [
      'All clownfish are born male — the dominant fish in a group can become female',
      'Develops immunity to anemone stings through a gradual acclimation process',
      'One of the most successfully captive-bred marine fish in the hobby',
      'Can live up to 10 years in well-maintained aquariums',
    ],
    forSale: true,
    price: 34,
  },
  {
    id: '3',
    slug: 'leafy-sea-dragon',
    commonName: 'Leafy Sea Dragon',
    scientificName: 'Phycodurus eques',
    habitat: 'Cold Water',
    region: 'Southern Australia',
    size: '35 cm',
    temp: '12–19°C',
    status: 'LC',
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=560&h=420&fit=crop&auto=format',
    description: 'The leafy sea dragon is a masterpiece of natural camouflage. Its leaf-like appendages are purely decorative — it propels itself with nearly transparent fins along its neck and back. Endemic to the southern Australian coastline, it drifts through kelp forests looking like floating seaweed.',
    diet: 'Mysid shrimp, small crustaceans',
    depth: '3–50 m',
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Syngnathiformes',
      family: 'Syngnathidae',
      genus: 'Phycodurus',
      species: 'P. eques',
    },
    facts: [
      'Male sea dragons carry and incubate the eggs on a brood patch under their tail',
      'Cannot be imported from Australia — export is strictly prohibited',
      'Moves at approximately 150 meters per hour — one of the slowest fish',
      'State marine emblem of South Australia',
    ],
    forSale: false,
  },
  {
    id: '4',
    slug: 'blue-tang',
    commonName: 'Blue Tang',
    scientificName: 'Paracanthurus hepatus',
    habitat: 'Coral Reef',
    region: 'Indo-Pacific',
    size: '31 cm',
    temp: '24–26°C',
    status: 'LC',
    imageUrl: 'https://images.unsplash.com/photo-1516408388733-2f8364f2e00b?w=560&h=420&fit=crop&auto=format',
    description: 'The royal blue tang is instantly recognizable by its vivid blue body, black "palette" marking, and bright yellow tail. A highly active swimmer, it grazes on algae across Indo-Pacific reefs and plays an important ecological role in keeping reef surfaces clean.',
    diet: 'Algae, plankton',
    depth: '2–40 m',
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Perciformes',
      family: 'Acanthuridae',
      genus: 'Paracanthurus',
      species: 'P. hepatus',
    },
    facts: [
      'Has a sharp, scalpel-like spine at the base of its tail used for defense',
      'Juveniles are bright yellow — adults develop the iconic blue coloration',
      'A single individual can graze over 10 square meters of reef per day',
      'Plays "dead" when threatened — lies on its side motionless',
    ],
    forSale: true,
    price: 65,
  },
  {
    id: '5',
    slug: 'humphead-wrasse',
    commonName: 'Humphead Wrasse',
    scientificName: 'Cheilinus undulatus',
    habitat: 'Coral Reef',
    region: 'Indo-Pacific',
    size: '230 cm',
    temp: '24–28°C',
    status: 'EN',
    imageUrl: 'https://images.unsplash.com/photo-1637308108405-9b24d8b265bc?w=560&h=420&fit=crop&auto=format',
    description: 'The humphead wrasse is the largest member of the wrasse family and one of the largest reef fish in the world. Its distinctive prominent hump on the forehead becomes more pronounced with age. Listed as Endangered, it is heavily targeted by live reef food fish trade.',
    diet: 'Hard corals, mollusks, sea urchins, crustaceans',
    depth: '1–100 m',
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Perciformes',
      family: 'Labridae',
      genus: 'Cheilinus',
      species: 'C. undulatus',
    },
    facts: [
      'Can live up to 30 years — one of the longest-lived reef fish',
      'One of few species that can consume toxic prey like boxfish and sea hares',
      'CITES Appendix II listed — international trade is strictly regulated',
      'Uses lip movements to communicate — has a complex vocabulary of displays',
    ],
    forSale: false,
  },
  {
    id: '6',
    slug: 'betta-fish',
    commonName: 'Siamese Fighting Fish',
    scientificName: 'Betta splendens',
    habitat: 'Freshwater',
    region: 'Southeast Asia',
    size: '7 cm',
    temp: '24–28°C',
    status: 'VU',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=560&h=420&fit=crop&auto=format',
    description: 'The betta fish is one of the most popular aquarium fish in the world, and for good reason — its flowing fins and jewel-like colors are extraordinary. Wild bettas inhabit rice paddies, drainage ditches, and slow-moving streams in Thailand and surrounding countries. Remarkably, they breathe atmospheric air using a specialized labyrinth organ.',
    diet: 'Insects, larvae, small crustaceans',
    depth: 'Surface – 1 m',
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Perciformes',
      family: 'Osphronemidae',
      genus: 'Betta',
      species: 'B. splendens',
    },
    facts: [
      'Wild bettas are far less colorful than their captive-bred counterparts',
      'Males build elaborate bubble nests at the surface for spawning',
      'Listed as Vulnerable — wild populations have declined by over 50% in 20 years',
      'Can recognize their own reflection and may display to mirrors',
    ],
    forSale: true,
    price: 18,
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'p1',
    speciesId: '1',
    name: 'Mandarin Dragonet — Captive Pair',
    seller: 'AquaCoral Co.',
    sellerRating: 4.9,
    sellerReviews: 312,
    price: 89,
    imageUrl: 'https://images.unsplash.com/photo-1550016681-60a1d9d23bf7?w=560&h=420&fit=crop&auto=format',
    captiveBred: true,
    inStock: true,
    stockCount: 3,
    deliveryDays: '2–3',
    tags: ['Reef Safe', 'Expert Level', 'Captive Bred'],
    description: 'Beautiful captive-bred pair of mandarin dragonets, acclimated to frozen mysis shrimp — the hardest part of dragonet keeping solved for you. Healthy, eating well, and ready to ship. Includes 14-day health guarantee.',
  },
  {
    id: 'p2',
    speciesId: '2',
    name: 'Ocellaris Clownfish — Bonded Pair',
    seller: 'Pacific Reef Aquatics',
    sellerRating: 4.7,
    sellerReviews: 189,
    price: 34,
    imageUrl: 'https://images.unsplash.com/photo-1613779907266-f85db34edae5?w=560&h=420&fit=crop&auto=format',
    captiveBred: true,
    inStock: true,
    stockCount: 12,
    deliveryDays: '1–2',
    tags: ['Beginner Friendly', 'Captive Bred', 'Reef Safe'],
    description: 'USCB-certified captive-bred ocellaris clownfish pair. Already bonded and displaying natural pairing behavior. Perfect for a first marine aquarium or as a centerpiece for an anemone display.',
  },
  {
    id: 'p3',
    speciesId: '4',
    name: 'Blue Tang — Juvenile (5cm)',
    seller: 'Deep Blue Imports',
    sellerRating: 4.6,
    sellerReviews: 94,
    price: 65,
    imageUrl: 'https://images.unsplash.com/photo-1516408388733-2f8364f2e00b?w=560&h=420&fit=crop&auto=format',
    captiveBred: false,
    inStock: true,
    stockCount: 7,
    deliveryDays: '2–4',
    tags: ['Intermediate', 'Wild Caught', 'Active Swimmer'],
    description: 'Healthy juvenile blue tang at approximately 5cm. Eating frozen mysis, pellets, and nori. Quarantined for 21 days before listing. Minimum tank size 250L recommended.',
  },
  {
    id: 'p4',
    speciesId: '6',
    name: 'Galaxy Koi Betta — Male',
    seller: 'Thai Betta Imports',
    sellerRating: 4.8,
    sellerReviews: 441,
    price: 48,
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=560&h=420&fit=crop&auto=format',
    captiveBred: true,
    inStock: true,
    stockCount: 2,
    deliveryDays: '1–2',
    tags: ['Rare Morph', 'Captive Bred', 'Show Quality'],
    description: 'Show-quality Galaxy Koi male betta with exceptional marble patterning. Bred by an award-winning Thai farm. Fin form is near-perfect. Ships in insulated thermal bag with oxygen.',
  },
];
