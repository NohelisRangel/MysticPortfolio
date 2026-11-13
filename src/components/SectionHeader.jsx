// Shared "01 — EYEBROW / Title / side note" header used by each section.
export default function SectionHeader({ index, eyebrow, title, note }) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">
          <span className="eyebrow__num">{index}</span> <span className="rule" /> {eyebrow}
        </p>
        <h2 className="section-title">{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  );
}
