export function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export function Brand() {
  return (
    <a className="brand" href="#home">
      <span className="brand-mark" aria-hidden="true">
        S<span>☼</span>
      </span>
      <span className="brand-name">
        shriram{" "}
        <span>solar solutions</span>
      </span>
    </a>
  );
}
