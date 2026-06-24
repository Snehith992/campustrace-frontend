import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }

  }, []);

  function logout() {

    localStorage.removeItem("user");
    localStorage.removeItem("role");

    alert("Logged Out");

    window.location.href = "/";
  }

  return (

    <div style={styles.navbar}>

      <h2
        style={styles.logo}
        onClick={() => navigate("/")}
      >
        CampusTrace
      </h2>

      <div style={styles.links}>

        <span
          onClick={() => navigate("/")}
        >
          Home
        </span>

        <span
          onClick={() => navigate("/report")}
        >
          Report
        </span>

        <span
          onClick={() => navigate("/items")}
        >
          Items
        </span>

        {user ? (

          <div style={styles.userSection}>

            <img
              src={user.photo}
              alt="profile"
              style={styles.photo}
            />

            <span>
              {user.name}
            </span>

            <button
              style={styles.logout}
              onClick={logout}
            >
              Logout
            </button>

          </div>

        ) : (

          <span
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>

        )}

      </div>

    </div>

  );
}

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#111",
    color: "white",
  },

  logo: {
    cursor: "pointer",
  },

  links: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    cursor: "pointer",
  },

  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  photo: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
  },

  logout: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },

};