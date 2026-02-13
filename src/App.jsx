import { useState, useCallback } from "react";
import { buildCreaturePrompt } from "./data/prompts";
import { CREATURE_TYPES, CREATURE_ROLES, ELEMENTS } from "./data/world";
import { generateCreature } from "./utils/api";
import CreatureConfig from "./components/CreatureConfig";
import CreatureDisplay from "./components/CreatureDisplay";
import CollectionGallery from "./components/CollectionGallery";

const DEFAULT_CONFIG = {
  creatureType: "beast",
  habitat: "brumesombre",
  role: "predator",
  element: "shadow",
  dangerLevel: 3,
  model: "claude-sonnet-4-20250514",
  temperature: 0.9,
};

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [creature, setCreature] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [collection, setCollection] = useState([]);
  const [showGallery, setShowGallery] = useState(false);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const typeLabel = CREATURE_TYPES.find((t) => t.id === config.creatureType)?.label || config.creatureType;
      const roleLabel = CREATURE_ROLES.find((r) => r.id === config.role)?.label || config.role;
      const elementLabel = ELEMENTS.find((e) => e.id === config.element)?.label || config.element;

      const systemPrompt = buildCreaturePrompt({
        creatureType: typeLabel,
        habitat: config.habitat,
        role: roleLabel,
        element: elementLabel,
        dangerLevel: config.dangerLevel,
      });

      const result = await generateCreature({
        model: config.model,
        temperature: config.temperature,
        systemPrompt,
        userMessage: `Génère une créature de type ${typeLabel}, rôle ${roleLabel}, élément ${elementLabel}, danger ${config.dangerLevel}/5. Sois créatif et original.`,
      });

      if (result.parseError) {
        setError(`La réponse n'est pas un JSON valide. ${result.parseError}`);
        setCreature(null);
      } else {
        setCreature(result.creature);
        setMeta(result.meta);
      }
    } catch (err) {
      setError(err.message);
      setCreature(null);
    }

    setIsLoading(false);
  }, [config]);

  const handleAddToCollection = () => {
    if (!creature) return;
    if (collection.some((c) => c.name === creature.name)) return; // no dupes
    setCollection((prev) => [...prev, creature]);
  };

  const handleSelectFromCollection = (c) => {
    setCreature(c);
    setMeta(null);
  };

  const handleExportJSON = () => {
    if (!creature) return;
    const blob = new Blob([JSON.stringify(creature, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `creature-${creature.name?.toLowerCase().replace(/\s+/g, "-").slice(0, 30) || "export"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportAll = () => {
    if (collection.length === 0) return;
    const blob = new Blob([JSON.stringify(collection, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bestiaire-cendrebourg.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="grain-overlay" />

      <header className="header">
        <div className="header-left">
          <h1 className="header-title">📖 Bestiaire de Cendrebourg</h1>
          <span className="header-subtitle">Générateur de créatures par IA</span>
        </div>
        <div className="header-right">
          <button className="header-btn" onClick={() => setShowGallery(true)}>
            📖 Collection ({collection.length})
          </button>
        </div>
      </header>

      <div className="main-layout">
        <CreatureConfig
          config={config}
          onConfigChange={setConfig}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          collection={collection}
        />

        <div className="creature-area">
          {error && <div className="error-banner">⚠️ {error}</div>}

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-icon">🔮</div>
              <div className="loading-text">Une créature prend forme dans les brumes...</div>
            </div>
          ) : creature ? (
            <CreatureDisplay
              creature={creature}
              meta={meta}
              onExportJSON={handleExportJSON}
              onAddToCollection={handleAddToCollection}
              onRegenerate={handleGenerate}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <div className="empty-title">Le bestiaire attend</div>
              <div className="empty-sub">
                Choisissez un type de créature, un habitat et un élément, puis invoquez une créature des ténèbres de Cendrebourg.
              </div>
            </div>
          )}
        </div>
      </div>

      {showGallery && (
        <CollectionGallery
          collection={collection}
          onSelectCreature={handleSelectFromCollection}
          onClose={() => setShowGallery(false)}
          onExportAll={handleExportAll}
        />
      )}
    </div>
  );
}
