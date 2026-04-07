const CLOVER = '\u{1F340}';

export default function FloatingClovers() {
  return (
    <div className="floating-clovers" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={index}>{CLOVER}</span>
      ))}
    </div>
  );
}
