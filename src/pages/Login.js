import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

async function googleLogin() {

  try {

    const result =
      await signInWithPopup(
        auth,
        provider
      );

    const user = result.user;

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );

    if (
      user.email ===
      "nairsnehith992@gmail.com"
    ) {

      localStorage.setItem(
        "role",
        "admin"
      );

    } else {

      localStorage.setItem(
        "role",
        "user"
      );

    }

    alert(
      "Welcome " + user.displayName
    );

    navigate("/");

  } catch (error) {

    console.log(error);

    alert("Login Failed");
  }
}

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2>CampusTrace Login</h2>

        <button
          onClick={googleLogin}
          style={styles.button}
        >
          Sign In With Google
        </button>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: "#1a1a1a",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    color: "white",
  },

  button: {
    padding: "12px 25px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};