import { useState } from "react";
import api from "../utils/api";

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/posts", { content, image });
      setContent("");
      setImage("");
      onPostCreated(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={styles.textarea}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Post</button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  textarea: { padding: "10px", resize: "none" },
  input: { padding: "10px" },
  button: { background: "#007bff", color: "white", border: "none", padding: "10px", cursor: "pointer" },
};

export default CreatePostForm;
