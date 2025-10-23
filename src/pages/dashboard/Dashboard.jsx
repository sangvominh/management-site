// styles
import "./Dashboard.css";

import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Dashboard() {
  const { documents, error, isPending } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();

  const updateFilter = (vl) => {
    setCurrentFilter(vl);
  };

  const projects = documents ? documents.filter((document) => {
    switch (currentFilter) {
      case "all":
        return true;
      case "mine": {
        let assignedToMe = false;
        document.assignedUsersList.map((u) => {
          if (u.id === user.uid) assignedToMe = true;
        });
        return assignedToMe;
      }
      case "development":
      case "design":
      case "sales":
      case "marketing":
        return currentFilter === document.category;
      default:
        return true;
    }
  }) : null;

  if (isPending) return <div className="loading">Loading projects ...</div>;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      <ProjectFilter currentFilter={currentFilter} updateFilter={updateFilter} />
      {projects && <ProjectList projects={projects} />}
    </div>
  );
}
