import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectSummary({ project }) {
  const { user } = useAuthContext();
  const { deleteDocument, response } = useFirestore("projects");
  const navigate = useNavigate();

  const handleClick = async () => {
    await deleteDocument(project.id);
    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <h3>author by: {project.createBy.displayName}</h3>
        <p className="due-date">Project due by {project.dueDate.toDate().toDateString()}</p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <p className="avatar">{user.displayName}</p>
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as done
        </button>
      )}
    </div>
  );
}
