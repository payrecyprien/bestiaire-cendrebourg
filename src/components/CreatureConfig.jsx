import { HABITATS, CREATURE_TYPES, CREATURE_ROLES, ELEMENTS } from "../data/world";

export default function CreatureConfig({ config, onConfigChange, onGenerate, isLoading, collection }) {
  const update = (key, value) => onConfigChange({ ...config, [key]: value });

  return (
    <aside className="config-panel">
      {/* Creature type */}
      <div className="section-title">Type de créature</div>
      <div className="option-grid">
        {CREATURE_TYPES.map((t) => (
          <button
            key={t.id}
            className={`option-btn ${config.creatureType === t.id ? "active" : ""}`}
            onClick={() => update("creatureType", t.id)}
            title={t.description}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Habitat */}
      <div className="section-title">Habitat</div>
      <div className="option-grid single-col">
        {HABITATS.map((h) => (
          <button
            key={h.id}
            className={`option-btn ${config.habitat === h.id ? "active" : ""}`}
            onClick={() => update("habitat", h.id)}
            title={h.description}
          >
            {h.name}
          </button>
        ))}
      </div>

      {/* Role */}
      <div className="section-title">Rôle</div>
      <div className="option-grid">
        {CREATURE_ROLES.map((r) => (
          <button
            key={r.id}
            className={`option-btn ${config.role === r.id ? "active" : ""}`}
            onClick={() => update("role", r.id)}
            title={r.description}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Element */}
      <div className="section-title">Élément</div>
      <div className="option-grid">
        {ELEMENTS.map((e) => (
          <button
            key={e.id}
            className={`option-btn ${config.element === e.id ? "active" : ""}`}
            onClick={() => update("element", e.id)}
            style={config.element === e.id ? { borderColor: e.color + "60", color: e.color } : {}}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Danger level */}
      <div className="section-title">Niveau de danger</div>
      <div className="field-group">
        <label className="field-label">{"⭐".repeat(config.dangerLevel)}{"☆".repeat(5 - config.dangerLevel)}</label>
        <input
          type="range"
          min="1" max="5"
          className="field-range"
          value={config.dangerLevel}
          onChange={(e) => update("dangerLevel", parseInt(e.target.value))}
        />
        <div className="range-labels">
          <span>Inoffensif</span>
          <span>Létal</span>
        </div>
      </div>

      {/* Model */}
      <div className="section-title">Modèle IA</div>
      <div className="field-group">
        <select
          className="field-select"
          value={config.model}
          onChange={(e) => update("model", e.target.value)}
        >
          <option value="claude-sonnet-4-20250514">Sonnet 4 (meilleur SVG)</option>
          <option value="claude-haiku-4-5-20251001">Haiku 4.5 (rapide)</option>
        </select>
      </div>

      <div className="field-group">
        <label className="field-label">Température : {config.temperature}</label>
        <input
          type="range"
          min="0.3" max="1" step="0.1"
          className="field-range"
          value={config.temperature}
          onChange={(e) => update("temperature", parseFloat(e.target.value))}
        />
        <div className="range-labels">
          <span>Classique</span>
          <span>Expérimental</span>
        </div>
      </div>

      {/* Collection counter */}
      {collection.length > 0 && (
        <>
          <div className="section-title">Collection</div>
          <div className="collection-count">
            📖 {collection.length} créature{collection.length > 1 ? "s" : ""} cataloguée{collection.length > 1 ? "s" : ""}
          </div>
        </>
      )}

      {/* Generate button */}
      <button
        className="generate-btn"
        onClick={onGenerate}
        disabled={isLoading}
      >
        {isLoading ? "⏳ Invocation en cours..." : "📖 Invoquer une créature"}
      </button>
    </aside>
  );
}
