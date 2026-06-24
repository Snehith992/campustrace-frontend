import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalItems: 0,
    claimedItems: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {

    try {

      const response = await axios.get(
        "https://campustrace-backend-xafz.onrender.com/api/items/count"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  const recoveryRate =
    stats.totalItems > 0
      ? (
          (stats.claimedItems /
            stats.totalItems) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div style={styles.container}>

      <h1 style={styles.title}>
        CampusTrace
      </h1>

      <p style={styles.subtitle}>
        AI-Powered Lost & Found Management System
      </p>

      <div style={styles.statsContainer}>

        <div style={styles.card}>
          <h3>Total Items</h3>
          <h2>{stats.totalItems}</h2>
        </div>

        <div style={styles.card}>
          <h3>Recovered Items</h3>
          <h2>{stats.claimedItems}</h2>
        </div>

        <div style={styles.card}>
          <h3>Recovery Rate</h3>
          <h2>{recoveryRate}%</h2>
        </div>

      </div>

      <div style={styles.buttonContainer}>

        <button
          style={styles.button}
          onClick={() =>
            navigate("/report")
          }
        >
          Report Lost Item
        </button>

        <button
          style={styles.button}
          onClick={() =>
            navigate("/items")
          }
        >
          View Items
        </button>

      <button
        style={styles.loginBtn}
        onClick={() => {

      const role =
        localStorage.getItem("role");

        if (role === "admin") {

          navigate("/admin");

          } else {

          navigate("/login");

          }

          }}
        >
          Admin Login
        </button>

      </div>

    </div>
  );
}

const styles = {

  container: {
    textAlign: "center",
    padding: "50px",
    minHeight: "100vh",
    backgroundColor: "#111",
    color: "white",
  },

  title: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "40px",
  },

  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },

  card: {
    backgroundColor: "#1a1a1a",
    padding: "25px",
    borderRadius: "10px",
    minWidth: "180px",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  button: {
    padding: "12px 20px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  loginBtn: {
    padding: "12px 20px",
    backgroundColor: "#444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};