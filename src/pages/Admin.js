import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {

  const navigate = useNavigate();

  const [claims, setClaims] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [claimedItems, setClaimedItems] = useState(0);

  const pendingClaims = claims.filter(
    (claim) => claim.status === "pending"
  ).length;

  const approvedClaims = claims.filter(
    (claim) => claim.status === "approved"
  ).length;

  const rejectedClaims = claims.filter(
    (claim) => claim.status === "rejected"
  ).length;

  const recoveryRate =
    totalItems > 0
      ? ((claimedItems / totalItems) * 100).toFixed(1)
      : 0;

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {

      navigate("/login");
      return;

    }

    fetchClaims();
    fetchStats();

  }, [navigate]);

  async function fetchClaims() {

    try {

      const response = await axios.get(
        "https://campustrace-backend-xafz.onrender.com/api/claims"
      );

      setClaims(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  async function fetchStats() {

    try {

      const response = await axios.get(
        "https://campustrace-backend-xafz.onrender.com/api/items/count"
      );

      setTotalItems(response.data.totalItems);
      setClaimedItems(response.data.claimedItems);

    } catch (error) {

      console.log(error);

    }

  }

  async function updateClaim(id, status) {

    try {

      await axios.put(
        `https://campustrace-backend-xafz.onrender.com/api/claims/${id}`,
        { status }
      );

      alert(`Claim ${status}`);

      fetchClaims();
      fetchStats();

    } catch (error) {

      console.log(error);

      alert("Error updating claim");

    }

  }

  return (

    <div style={styles.container}>

      <h1>CampusTrace Admin Dashboard</h1>

      <button
        onClick={() => {

          localStorage.removeItem("role");

          navigate("/login");

        }}
        style={styles.logout}
      >
        Logout
      </button>

      <div style={styles.cards}>

        <div style={styles.card}>
          <h3>Total Items</h3>
          <h2>{totalItems}</h2>
        </div>

        <div style={styles.card}>
          <h3>Pending Claims</h3>
          <h2>{pendingClaims}</h2>
        </div>

        <div style={styles.card}>
          <h3>Approved Claims</h3>
          <h2>{approvedClaims}</h2>
        </div>

        <div style={styles.card}>
          <h3>Rejected Claims</h3>
          <h2>{rejectedClaims}</h2>
        </div>

        <div style={styles.card}>
          <h3>Recovery Rate</h3>
          <h2>{recoveryRate}%</h2>
        </div>

      </div>

      <div style={{ overflowX: "auto" }}>

        <table style={styles.table}>

          <thead>

            <tr>

              <th style={styles.th}>Item</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Secret Mark</th>

              <th style={styles.th}>Claimant</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Student ID</th>
              <th style={styles.th}>Department</th>

              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Claimant Proof</th>

              <th style={styles.th}>AI Score</th>
              <th style={styles.th}>Recommendation</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>

            </tr>

          </thead>

          <tbody>

            {claims.map((claim) => (

              <tr key={claim._id}>

                <td style={styles.td}>
                  {claim.itemTitle}
                </td>

                <td style={styles.td}>
                  {claim.itemLocation}
                </td>

                <td style={styles.td}>
                  {claim.itemDescription}
                </td>

                <td style={styles.td}>

                  <button
                    style={styles.viewButton}
                    onClick={() =>
                      alert(
                        "Secret Mark:\n\n" +
                        claim.itemSecretMark
                      )
                    }
                  >
                    View
                  </button>

                </td>

                <td style={styles.td}>
                  {claim.name}
                </td>

                <td style={styles.td}>
                  {claim.contact}
                </td>

                <td style={styles.td}>
                  {claim.studentId}
                </td>

                <td style={styles.td}>
                  {claim.department}
                </td>

                <td style={styles.td}>
                  {claim.reason}
                </td>

                <td style={styles.td}>
                  {claim.claimantProof}
                </td>

                <td style={styles.td}>

                  <span
                    style={{
                      color:
                        claim.aiScore >= 70
                          ? "lime"
                          : claim.aiScore >= 40
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {claim.aiScore}%
                  </span>

                </td>

                <td style={styles.td}>

                  <span
                    style={{
                      color:
                        claim.aiRecommendation ===
                        "Likely Owner"
                          ? "lime"
                          : claim.aiRecommendation ===
                            "Possible Match"
                          ? "orange"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {claim.aiRecommendation}
                  </span>

                </td>

                <td style={styles.td}>

                  <span
                    style={{
                      color:
                        claim.status === "approved"
                          ? "lime"
                          : claim.status === "rejected"
                          ? "red"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {claim.status}
                  </span>

                </td>

                <td style={styles.td}>

                  <button
                    style={styles.approve}
                    onClick={() =>
                      updateClaim(
                        claim._id,
                        "approved"
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    style={styles.reject}
                    onClick={() =>
                      updateClaim(
                        claim._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

const styles = {

  container: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
  },

  cards: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginBottom: "30px",
  },

  card: {
    backgroundColor: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "180px",
    textAlign: "center",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1a1a1a",
  },

  th: {
    border: "1px solid gray",
    padding: "12px",
    backgroundColor: "#222",
  },

  td: {
    border: "1px solid gray",
    padding: "12px",
    textAlign: "center",
    maxWidth: "220px",
    wordWrap: "break-word",
  },

  approve: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer",
  },

  reject: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  logout: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },

  viewButton: {
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "5px",
    cursor: "pointer",
  },

};