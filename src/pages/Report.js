import { useState } from "react";
import axios from "axios";

export default function Report() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Others");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [secretMark, setSecretMark] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file) {

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      "campustrace_upload"
    );

    try {

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcnkaj1k/image/upload",
        formData
      );

      setUploading(false);

      return response.data.secure_url;

    } catch (error) {

      setUploading(false);

      console.log(error);

      alert("Image Upload Failed");

      return "";
    }
  }

  async function handleSubmit() {

    if (
      !title ||
      !description ||
      !location ||
      !secretMark
    ) {

      alert("Please fill all required fields");

      return;
    }

    try {

      let imageUrl = "";

      if (image) {

        imageUrl = await uploadImage(image);

      }

      await axios.post(
        "https://campustrace-backend-xafz.onrender.com/api/items",
        {
          title,
          category,
          description,
          location,
          image: imageUrl,
          secretMark,
        }
      );

      alert("Item Added Successfully");

      setTitle("");
      setCategory("Others");
      setDescription("");
      setLocation("");
      setImage(null);
      setSecretMark("");

    } catch (error) {

      console.log(error);

      alert("Error Adding Item");
    }
  }

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.heading}>
          Report Lost Item
        </h2>

        <input
          type="text"
          placeholder="Item Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={styles.input}
        >
          <option>Electronics</option>
          <option>Stationery</option>
          <option>ID Cards</option>
          <option>Accessories</option>
          <option>Bags</option>
          <option>Documents</option>
          <option>Others</option>
        </select>

        <input
          type="text"
          placeholder="Location Found"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          style={styles.input}
        />

        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          style={styles.textarea}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Secret Identification Mark (Hidden From Users)"
          value={secretMark}
          onChange={(e) =>
            setSecretMark(e.target.value)
          }
          style={styles.input}
        />

        {uploading && (
          <p style={{ color: "white" }}>
            Uploading Image...
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          Submit Item
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
    width: "450px",
    backgroundColor: "#1a1a1a",
    padding: "30px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  heading: {
    color: "white",
    textAlign: "center",
    marginBottom: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "white",
  },

  textarea: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "white",
    minHeight: "120px",
  },

  button: {
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

};