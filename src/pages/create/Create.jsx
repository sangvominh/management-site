import { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./Create.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();
  // assignedUser
  const { documents } = useCollection("users");
  const [users, setUsers] = useState();
  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError("Please fill category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please fill assignedUsers");
      return;
    }

    const createBy = {
      id: user.uid,
      displayName: user.displayName,
    };

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        id: u.value.id,
        displayName: u.value.displayName,
      };
    });

    const project = {
      name,
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      assignedUsersList,
      createBy,
      comment: [],
    };

    // add document
    await addDocument(project);

    // redirect
    if (!response.error) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input required type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea required onChange={(e) => setDetails(e.target.value)} value={details}></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input required type="date" onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
        </label>
        <label>
          <span>Project category:</span>
          <Select onChange={(option) => setCategory(option)} options={categories} />
        </label>
        <label>
          <span>Assign to:</span>
          <Select onChange={(option) => setAssignedUsers(option)} options={users} isMulti />
        </label>
        {response.isPending && <button className="btn">Add Project ...</button>}{" "}
        {!response.isPending && <button className="btn">Add Project</button>}{" "}
        {response.error && <p className="error">{formError}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
