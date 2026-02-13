import { ELEMENTS } from "../data/world";

function getElementColor(id) {
  return ELEMENTS.find((e) => e.id === id)?.color || "#8b8b8b";
}

export default function CollectionGallery({ collection, onSelectCreature, onClose, onExportAll }) {
  if (collection.length === 0) {
    return (
      <div className="gallery-overlay">
        <div className="gallery-panel">
          <div className="gallery-header">
            <h2 className="gallery-title">📖 Bestiaire</h2>
            <button className="gallery-close" onClick={onClose}>✕</button>
          </div>
          <div className="gallery-empty">
            <span className="gallery-empty-icon">📖</span>
            <p>Votre bestiaire est vide. Invoquez des créatures et ajoutez-les à votre collection.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-overlay">
      <div className="gallery-panel">
        <div className="gallery-header">
          <h2 className="gallery-title">📖 Bestiaire — {collection.length} créature{collection.length > 1 ? "s" : ""}</h2>
          <div className="gallery-actions">
            <button className="action-btn" onClick={onExportAll}>📋 Exporter tout</button>
            <button className="gallery-close" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="gallery-grid">
          {collection.map((creature, i) => (
            <div
              key={i}
              className="gallery-card"
              onClick={() => { onSelectCreature(creature); onClose(); }}
              style={{ borderColor: getElementColor(creature.element) + "30" }}
            >
              {creature.svg_portrait ? (
                <div
                  className="gallery-portrait"
                  dangerouslySetInnerHTML={{ __html: creature.svg_portrait }}
                />
              ) : (
                <div className="gallery-portrait-placeholder">🔮</div>
              )}
              <div className="gallery-card-info">
                <div className="gallery-card-name">{creature.name}</div>
                <div className="gallery-card-title">{creature.title}</div>
                <div className="gallery-card-meta">
                  <span style={{ color: getElementColor(creature.element) }}>{creature.element}</span>
                  <span>{"⭐".repeat(creature.danger_level)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
