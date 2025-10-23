import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
// import { formatDistanceToNow } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComment({ project }) {
  const [newComment, setNewComment] = useState();
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      content: newComment,
      createAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    updateDocument(project.id, {
      comment: [...project.comment, commentToAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className="project-comments">
      <h4>Project comment</h4>

      <ul>
        {project.comment.length > 0 &&
          project.comment.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>{formatDistanceToNow(comment.createAt.toDate(), { addSuffix: true })}</p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Add new comment: </span>
          <textarea
            required
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
}
