const filterList = ["all", "mine", "development", "design", "marketing", "sales"];

export default function ProjectFilter({ currentFilter, updateFilter }) {
  return (
    <div className="project-filter">
      {filterList.map((vl) => (
        <button key={vl} className={currentFilter === vl ? "active" : ""} onClick={() => updateFilter(vl)}>
          {vl}
        </button>
      ))}
    </div>
  );
}
