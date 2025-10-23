import { Link } from "react-router-dom";
import "./ProjectList.css";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No Project yet!</p>}
      {projects.map((project) => (
        <Link to={`/project/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by: {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p>
              <strong>Assigned to:</strong>
            </p>
            <ul>
              {project.assignedUsersList.map((user) => (
                // <li key={user.photoURL}>
                //   <Avatar src={user.photoURL} />1
                // </li>
                <li key={user.id}>{user.displayName}</li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
