import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ItemDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);

  useEffect(() => {

  async function fetchItem() {

    try {

      const response = await axios.get(
        `https://campustrace-backend-xafz.onrender.com/api/items/${id}`
      );

      setItem(response.data);

    } catch (error) {

      console.log(error);
      alert("Error loading item");

    }

  }

  fetchItem();

}, [id]);

  if (!item) {

    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        {item.image && (

          <img
            src={item.image}
            alt={item.title}
            style={styles.image}
          />

        )}

        <h1>{item.title}</h1>

        <p>
          <strong>Category:</strong> {item.category}
        </p>

        <p>
          <strong>Location:</strong> {item.location}
        </p>

        <p>
          <strong>Reported:</strong>{" "}
          {new Date(
            item.reportedAt
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>Description:</strong>
        </p>

        <p>{item.description}</p>

        <button
          style={styles.button}
          onClick={() =>
            navigate(`/claim/${item._id}`)
          }
        >
          Claim This Item
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
    padding: "20px",
  },

  card: {
    backgroundColor: "#1a1a1a",
    color: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "600px",
  },

  image: {
    width: "100%",
    height: "350px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  loading: {
    color: "white",
    backgroundColor: "black",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

};