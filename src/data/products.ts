import sprayFreshCurl from "@/assets/spray-fresh-curl.png";
import huileGrowBoost from "@/assets/huile-grow-boost.png";
import brosseDemelante from "@/assets/brosse-demelante.jpeg";
import brosseMassage from "@/assets/brosse-massage.jpeg";
import applicateurHuile from "@/assets/applicateur-huile.jpeg";
import peigneQueue from "@/assets/peigne-queue.jpeg";
import peigneAfro from "@/assets/peigne-afro.jpeg";
import dermaRoller from "@/assets/derma-roller.jpeg";

export type Category = "soins" | "accessoires" | "packs";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number; // FCFA
  oldPrice?: number;
  image: string;
  category: Category;
  badge?: "Bestseller" | "Nouveau" | "Top Vente";
  description: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string;
  volume?: string;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "spray-fresh-curl",
    name: "VADI Fresh Curl",
    tagline: "Spray hydratant & antipelliculaire",
    price: 5500,
    image: sprayFreshCurl,
    category: "soins",
    badge: "Bestseller",
    volume: "200 ml",
    description:
      "Un spray quotidien qui hydrate, apaise le cuir chevelu et rééquilibre vos boucles. Formule 100% naturelle, fabriquée au Cameroun.",
    ingredients: ["Aloe vera", "Hibiscus", "Huile de coco", "Romarin"],
    benefits: ["Hydrate en profondeur", "Apaise les démangeaisons", "Définit les boucles"],
    usage: "Vaporisez sur cheveux humides ou secs, démêlez et coiffez.",
  },
  {
    id: "p2",
    slug: "huile-grow-boost",
    name: "VADI Grow Boost",
    tagline: "Huile de pousse fortifiante",
    price: 6500,
    image: huileGrowBoost,
    category: "soins",
    badge: "Top Vente",
    volume: "100 ml",
    description:
      "Une huile concentrée en moringa, fenugrec et chébé qui stimule la pousse et fortifie la fibre capillaire. Résultats visibles dès 4 semaines.",
    ingredients: ["Moringa", "Fenugrec", "Chébé", "Huile de ricin", "Romarin"],
    benefits: ["Stimule la pousse", "Fortifie les racines", "Réduit la chute"],
    usage: "Appliquez sur le cuir chevelu 2 à 3 fois par semaine, massez 5 minutes.",
  },
  {
    id: "a1",
    slug: "brosse-demelante",
    name: "Brosse démêlante flexible",
    tagline: "Spécial cheveux crépus & bouclés",
    price: 4500,
    image: brosseDemelante,
    category: "accessoires",
    description: "Démêle sans casse, respecte la fibre. Idéale sur cheveux mouillés avec un soin.",
  },
  {
    id: "a2",
    slug: "brosse-massage-cuir-chevelu",
    name: "Brosse de massage cuir chevelu",
    tagline: "Stimule la microcirculation",
    price: 2500,
    image: brosseMassage,
    category: "accessoires",
    description: "Picots souples en silicone pour masser et activer la pousse.",
  },
  {
    id: "a3",
    slug: "applicateur-huile",
    name: "Applicateur d'huile à peigne",
    tagline: "Application précise au cuir chevelu",
    price: 3000,
    image: applicateurHuile,
    category: "accessoires",
    description: "Bouteille graduée 180 ml avec embout peigne pour des applications nettes.",
  },
  {
    id: "a4",
    slug: "peigne-queue",
    name: "Peigne à queue métallique",
    tagline: "Sépare et raie avec précision",
    price: 1500,
    image: peigneQueue,
    category: "accessoires",
    description: "Indispensable pour les coiffures protectrices et les raies nettes.",
  },
  {
    id: "a5",
    slug: "peigne-afro",
    name: "Peigne afro métallique",
    tagline: "Volume et démêlage cheveux crépus",
    price: 2000,
    image: peigneAfro,
    category: "accessoires",
    description: "Dents larges en métal pour démêler en douceur et créer du volume.",
  },
  {
    id: "a6",
    slug: "derma-roller",
    name: "Derma Roller 0,5 mm",
    tagline: "Booste l'absorption de l'huile de pousse",
    price: 5000,
    image: dermaRoller,
    category: "accessoires",
    badge: "Nouveau",
    description: "Micro-aiguilles qui activent la microcirculation et la pousse capillaire.",
  },
];

export const packs: Product[] = [
  {
    id: "pack1",
    slug: "pack-routine-pousse",
    name: "Pack Routine Pousse",
    tagline: "Spray Fresh Curl + Huile Grow Boost + Derma Roller",
    price: 14900,
    oldPrice: 17000,
    image: huileGrowBoost,
    category: "packs",
    badge: "Bestseller",
    description:
      "Le rituel complet pour relancer la pousse : hydratation quotidienne, huile fortifiante et activation par micro-aiguilles.",
  },
  {
    id: "pack2",
    slug: "pack-essentiels",
    name: "Pack Les Essentiels",
    tagline: "Spray + Brosse démêlante + Peigne afro",
    price: 11000,
    oldPrice: 12500,
    image: sprayFreshCurl,
    category: "packs",
    description: "Tout ce qu'il faut pour des boucles hydratées et démêlées sans casse.",
  },
];

export const allProducts = [...products, ...packs];

export const formatFCFA = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n) + " FCFA";