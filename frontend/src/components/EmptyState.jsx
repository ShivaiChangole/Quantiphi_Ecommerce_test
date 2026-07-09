function EmptyState({ onReset }) {
  return (
    <div className="empty-state">
      <p>No items match your criteria.</p>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
}

export default EmptyState;