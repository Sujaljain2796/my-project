import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <h3>Please log in to view your profile.</h3>;

  return (
    <div style={styles.container}>
      <h2>Your Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

const styles = { container: { maxWidth: "500px", margin: "50px auto", textAlign: "center" } };

export default Profile;
