import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import "../pages/Publish.css";

const Publish = ({ token }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", picture);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.response);
    }
  };

  return token ? (
    <main>
      <div className="publish">
        <h1>Vends ton article </h1>
        <form onSubmit={handleUpload}>
          <div>
            <input
              type="file"
              onChange={(event) => {
                const objectUrl = URL.createObjectURL(event.target.files[0]);
                setPreview(objectUrl);
                setPicture(event.target.files[0]);
              }}
            />
            {preview && <img src={preview} alt="before-upload" />}
          </div>
          <div>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              placeholder="Ex : une chemise Sézane verte"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="description">Décris ton article</label>
            <input
              type="text"
              id="description"
              placeholder="Ex : porté quelquefois, taille correctement"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              id="brand"
              placeholder="Ex : Zara"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              id="size"
              placeholder="Ex : L/40/12"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              id="color"
              placeholder="Ex : Fushia"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="condition">État</label>
            <input
              type="text"
              id="condition"
              placeholder="Neuf avec étiquette"
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="city">Lieu</label>
            <input
              type="text"
              placeholder="Ex : Paris"
              id="city"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="price">Prix</label>
            <input
              type="number"
              id="price"
              placeholder="0,00€"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
