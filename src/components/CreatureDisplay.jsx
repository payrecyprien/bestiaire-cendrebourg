import { ELEMENTS, STAT_NAMES } from "../data/world";

function getElementInfo(id) {
  return ELEMENTS.find((e) => e.id === id) || ELEMENTS[5];
}

function getDangerLabel(level) {
  const labels = ["", "Inoffensif", "Mineur", "Modéré", "Dangereux", "Létal"];
  return labels[level] || "Inconnu";
}

function StatBar({ name, value, maxValue = 20, color }) {
  const pct = (value / maxValue) * 100;
  return (
    <div className="stat-bar-row">
      <span className="stat-bar-label">{STAT_NAMES[name] || name}</span>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="stat-bar-value">{value}</span>
    </div>
  );
}

function SVGPortrait({ svgString }) {
  if (!svgString) {
    return (
      <div className="portrait-placeholder">
        <span>🔮</span>
        <span className="portrait-placeholder-text">Portrait non disponible</span>
      </div>
    );
  }

  return (
    <div
      className="portrait-container"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

export default function CreatureDisplay({ creature, meta, onExportJSON, onAddToCollection, onRegenerate }) {
  if (!creature) return null;

  const elementInfo = getElementInfo(creature.element);

  return (
    <div className="creature-card">
      {/* Header with portrait */}
      <div className="creature-header">
        <div className="creature-header-content">
          <div className="creature-badges">
            <span className="creature-badge type-badge">{creature.type}</span>
            <span className="creature-badge element-badge" style={{ color: elementInfo.color, borderColor: elementInfo.color + "40" }}>
              {elementInfo.label}
            </span>
            <span className="creature-badge role-badge">{creature.role}</span>
            <span className="creature-badge danger-badge">
              {"⭐".repeat(creature.danger_level)} {getDangerLabel(creature.danger_level)}
            </span>
          </div>
          <h2 className="creature-name">{creature.name}</h2>
          <div className="creature-title-text">{creature.title}</div>
          <p className="creature-description">{creature.description}</p>
        </div>
        <SVGPortrait svgString={creature.svg_portrait} />
      </div>

      {/* Body */}
      <div className="creature-body">
        {/* Appearance & Behavior */}
        <div className="creature-section">
          <div className="creature-section-title">Apparence</div>
          <p className="creature-text">{creature.appearance}</p>
        </div>

        <div className="creature-section">
          <div className="creature-section-title">Comportement</div>
          <p className="creature-text">{creature.behavior}</p>
        </div>

        {/* Stats */}
        {creature.stats && (
          <div className="creature-section">
            <div className="creature-section-title">Statistiques</div>
            <div className="stats-container">
              {creature.stats.hp && (
                <div className="hp-bar">
                  <span className="hp-label">❤️ PV</span>
                  <span className="hp-value">{creature.stats.hp}</span>
                </div>
              )}
              {Object.entries(creature.stats)
                .filter(([key]) => key !== "hp")
                .map(([key, value]) => (
                  <StatBar key={key} name={key} value={value} color={elementInfo.color} />
                ))}
            </div>
          </div>
        )}

        {/* Abilities */}
        {creature.abilities?.length > 0 && (
          <div className="creature-section">
            <div className="creature-section-title">Capacités</div>
            <div className="abilities-list">
              {creature.abilities.map((ability, i) => (
                <div key={i} className="ability-item">
                  <div className="ability-header">
                    <span className="ability-name">{ability.name}</span>
                    <span className="ability-cooldown">{ability.cooldown}</span>
                  </div>
                  <div className="ability-desc">{ability.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weaknesses */}
        {creature.weaknesses?.length > 0 && (
          <div className="creature-section">
            <div className="creature-section-title">⚠️ Faiblesses</div>
            <div className="weaknesses-list">
              {creature.weaknesses.map((w, i) => (
                <div key={i} className="weakness-item">
                  <span className="weakness-name">{w.name}</span>
                  <span className="weakness-desc">{w.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loot */}
        {creature.loot?.length > 0 && (
          <div className="creature-section">
            <div className="creature-section-title">🎁 Butin</div>
            <div className="loot-list">
              {creature.loot.map((item, i) => (
                <div key={i} className="loot-item">
                  <div className="loot-header">
                    <span className="loot-name">{item.name}</span>
                    <span className={`loot-rarity ${item.drop_rate?.replace(/\s/g, "-")}`}>{item.drop_rate}</span>
                  </div>
                  <div className="loot-desc">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lore & tips */}
        <div className="creature-section">
          <div className="creature-section-title">📜 Lien avec Cendrebourg</div>
          <p className="creature-text lore">{creature.lore_connection}</p>
        </div>

        {creature.encounter_tip && (
          <div className="creature-tip">
            💡 <em>{creature.encounter_tip}</em>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="creature-footer">
        <div className="creature-actions">
          <button className="action-btn" onClick={onExportJSON}>📋 JSON</button>
          <button className="action-btn" onClick={onRegenerate}>🔄 Autre créature</button>
          <button className="action-btn collect-btn" onClick={onAddToCollection}>📖 Ajouter au bestiaire</button>
        </div>
      </div>

      {/* Metrics */}
      {meta && (
        <div className="metrics-bar">
          <span className="metric">Latence : <span className="metric-value">{meta.latency}ms</span></span>
          <span className="metric">Tokens : <span className="metric-value">{meta.totalTokens}</span></span>
          <span className="metric">Coût : <span className="metric-value">${meta.cost.toFixed(4)}</span></span>
          <span className="metric">Modèle : <span className="metric-value">{meta.model.replace("claude-", "").split("-").slice(0, 2).join("-")}</span></span>
        </div>
      )}
    </div>
  );
}
