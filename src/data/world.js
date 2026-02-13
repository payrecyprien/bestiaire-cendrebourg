// ─── CENDREBOURG BESTIARY WORLD DATA ───

export const HABITATS = [
  { id: "brumesombre", name: "Forêt de Brumesombre", description: "Forêt dense aux brumes éternelles, lieu de rituels occultes", dangerBase: 3 },
  { id: "ruines_nord", name: "Ruines du Nord", description: "Fortifications antiques hantées par des présences anciennes", dangerBase: 4 },
  { id: "mine", name: "Mine de Ferrecendre", description: "Galeries abandonnées où résonnent des bruits inexpliqués", dangerBase: 3 },
  { id: "marais", name: "Marais de l'Oubli", description: "Tourbières empoisonnées à l'ouest de Cendrebourg", dangerBase: 2 },
  { id: "collines", name: "Collines des Ossements", description: "Terres arides parsemées d'os anciens et de cairns", dangerBase: 3 },
  { id: "riviere", name: "Rivière Grise", description: "Cours d'eau sombre traversant le village, étrangement glacé", dangerBase: 1 },
  { id: "souterrains", name: "Catacombes de Cendrebourg", description: "Réseau souterrain sous le village, scellé depuis des décennies", dangerBase: 5 },
];

export const CREATURE_TYPES = [
  { id: "beast", label: "🐺 Bête", description: "Animal corrompu ou mutant" },
  { id: "undead", label: "💀 Mort-vivant", description: "Créature réanimée par nécromancie" },
  { id: "spirit", label: "👻 Esprit", description: "Entité immatérielle ou spectre" },
  { id: "construct", label: "🗿 Construct", description: "Créature artificielle, golem ou automate" },
  { id: "aberration", label: "🐙 Aberration", description: "Chose indicible née de la magie corrompue" },
  { id: "plant", label: "🌿 Plante", description: "Végétal animé et dangereux" },
];

export const CREATURE_ROLES = [
  { id: "predator", label: "Prédateur", description: "Chasse activement les voyageurs" },
  { id: "guardian", label: "Gardien", description: "Protège un lieu ou un objet" },
  { id: "swarm", label: "Essaim", description: "Attaque en groupe, faible individuellement" },
  { id: "boss", label: "Boss", description: "Créature unique et redoutable" },
  { id: "ambient", label: "Ambiance", description: "Peu dangereux mais contribue à l'atmosphère" },
];

export const ELEMENTS = [
  { id: "shadow", label: "🌑 Ombre", color: "#6b5a8a" },
  { id: "fire", label: "🔥 Feu", color: "#d4603a" },
  { id: "frost", label: "❄️ Givre", color: "#5a9fd4" },
  { id: "poison", label: "☠️ Poison", color: "#6ba85a" },
  { id: "arcane", label: "✨ Arcane", color: "#b080d4" },
  { id: "none", label: "⚪ Aucun", color: "#8b8b8b" },
];

export const STAT_NAMES = {
  hp: "Points de vie",
  attack: "Attaque",
  defense: "Défense",
  speed: "Vitesse",
  intelligence: "Intelligence",
  perception: "Perception",
};

export const LORE_CONNECTIONS = [
  "Le Cercle d'Obsidienne utilise ces créatures dans ses rituels",
  "La créature est liée aux disparitions dans la forêt de Brumesombre",
  "Theron a été vu à proximité de spécimens capturés",
  "Aldric a entendu parler de cette créature par d'anciens soldats",
  "Les Lames Grises ont affronté cette créature et perdu deux hommes",
  "La Guilde des Marchands offre une prime pour chaque spécimen éliminé",
  "Gareth a trouvé des traces de cette créature lors de ses patrouilles",
  "La créature semble attirée par les symboles rituels gravés en forêt",
];
