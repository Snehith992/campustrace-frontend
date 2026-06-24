import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ClaimPage() {

  const { id } = useParams();

  const [claimantName, setClaimantName] =
    useState("");

  const [contact, setContact] =
    useState("");

  const [studentId, setStudentId] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [claimantProof, setClaimantProof] =
    useState("");

  async function handleClaim() {

    if (
      !claimantName ||
      !contact ||
      !studentId ||
      !department ||
      !message ||
      !claimantProof
    ) {

      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "https://campustrace-backend-xafz.onrender.com/api/claims",
        {
          itemId: id,
          name: claimantName,
          contact,
          studentId,
          department,
          reason: message,
          claimantProof,
        }
      );

      alert(
        "Claim Submitted Successfully"
      );

      setClaimantName("");
      setContact("");
      setStudentId("");
      setDepartment("");
      setMessage("");
      setClaimantProof("");

    } catch (error) {

      console.log(error);

      alert(
        "Error submitting claim"
      );
    }
  }

  return (
    <div style={styles.container}>

      <h2>Claim Item</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={claimantName}
        onChange={(e) =>
          setClaimantName(
            e.target.value
          )
        }
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Contact Number"
        value={contact}
        onChange={(e) =>
          setContact(
            e.target.value
          )
        }
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) =>
          setStudentId(
            e.target.value
          )
        }
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) =>
          setDepartment(
            e.target.value
          )
        }
        style={styles.input}
      />

      <textarea
        placeholder="Why does this item belong to you?"
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        style={styles.textarea}
      />

      <textarea
        placeholder="Describe a unique identifying feature"
        value={claimantProof}
        onChange={(e) =>
          setClaimantProof(
            e.target.value
          )
        }
        style={styles.textarea}
      />

      <button
        onClick={handleClaim}
        style={styles.button}
      >
        Submit Claim
      </button>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    flexDirection: "column",
    width: "450px",
    margin: "50px auto",
    gap: "15px",
  },

  input: {
    padding: "10px",
  },

  textarea: {
    padding: "10px",
    height: "100px",
  },

  button: {
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};