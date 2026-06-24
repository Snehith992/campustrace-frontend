import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Items() {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {

    try {

      const response = await axios.get(
        "https://campustrace-backend-xafz.onrender.com/api/items"
      );

      setItems(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  const filteredItems = items.filter(
    (item) =>
      !item.isClaimed &&
      item.title
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (category === "All" ||
        item.category === category)
  );

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        Lost & Found Items
      </h1>

      <div style={styles.filterContainer}>

        <input
          type="text"
          placeholder="Search Item..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={styles.search}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={styles.select}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="ID Cards">ID Cards</option>
          <option value="Accessories">Accessories</option>
          <option value="Bags">Bags</option>
          <option value="Documents">Documents</option>
          <option value="Others">Others</option>
        </select>

      </div>

      {filteredItems.length === 0 ? (

        <div style={styles.emptyState}>

          <h2>No Lost Items Found</h2>

          <p>
            There are currently no available items.
          </p>

        </div>

      ) : (

        <div style={styles.grid}>

          {filteredItems.map((item) => (

            <div
              key={item._id}
              style={styles.card}
            >

              {item.image ? (

                <img
                  src={item.image}
                  alt={item.title}
                  style={styles.image}
                />

              ) : (

                <div style={styles.noImage}>
                  No Image
                </div>

              )}

              <h3>{item.title}</h3>

              <p>
                <strong>Category:</strong>{" "}
                {item.category}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {item.location}
              </p>

              <p>
                <strong>Reported:</strong>{" "}
                {new Date(
                  item.reportedAt
                ).toLocaleDateString()}
              </p>

              <div style={styles.buttonGroup}>

                <button
                  style={styles.detailsButton}
                  onClick={() =>
                    navigate(`/item/${item._id}`)
                  }
                >
                  View Details
                </button>

                <button
                  style={styles.claimButton}
                  onClick={() =>
                    navigate(`/claim/${item._id}`)
                  }
                >
                  Claim Item
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    backgroundColor: "black",
    color: "white",
    padding: "30px",
  },

  heading: {
    marginBottom: "20px",
  },

  filterContainer: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
  },

  search: {
    padding: "10px",
    width: "300px",
    borderRadius: "5px",
    border: "1px solid gray",
  },

  select: {
    padding: "10px",
    borderRadius: "5px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill,minmax(300px,1fr))",
    gap: "25px",
  },

  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    overflow: "hidden",
    padding: "15px",
    boxShadow:
      "0 0 10px rgba(0,0,0,0.4)",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  noImage: {
    width: "100%",
    height: "220px",
    backgroundColor: "#333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  detailsButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  claimButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  emptyState: {
    textAlign: "center",
    marginTop: "100px",
    color: "#aaa",
  },

};