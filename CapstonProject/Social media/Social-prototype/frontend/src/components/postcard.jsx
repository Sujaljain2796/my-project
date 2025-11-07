const PostCard = ({ post }) => {
  return (
    <div style={styles.card}>
      <h4>@{post.User?.username || "Anonymous"}</h4>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" style={styles.image} />}
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
};

const styles = {
  card: { border: "1px solid #ccc", borderRadius: "10px", padding: "15px", marginBottom: "15px", background: "#fff" },
  image: { width: "100%", borderRadius: "10px", marginTop: "10px" },
};

export default PostCard;
