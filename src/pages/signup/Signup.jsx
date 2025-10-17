// styles
import "./Signup.css";
// react
import { useState } from "react";
// hooks
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { isPending, error, signup } = useSignup();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, displayName, thumbnail);
  };

  const handleFileChange = (event) => {
    setThumbnail(null)
    let selected = event.target.files[0];
    if(!selected){
      setThumbnailError("Please select a file")
      return
    }

    if(!selected.type.includes("image")){
      setThumbnailError("Selected file must be an image")
      return
    }
    if(selected.size > 100000){
      setThumbnailError("Image file size must be less than 100kb")
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
  }

  return (
      <form onSubmit={handleSubmit} className="auth-form">
      <h2>Signup</h2>
        <label>
          Username:
          <input type="text" name="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Profile Thumbnail:
          <input type="file" name="thumbnail" onChange={handleFileChange} />
        </label>

        <button className="btn" type="submit">Sign Up</button>
        {isPending && <button disabled>Loading...</button>}
        {error && <div className="error">{error}</div>}
      </form>
  );
}
