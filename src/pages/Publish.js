import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../components/publish.css";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState();
  // const [trade, setTrade] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("brand", brand);
    data.append("size", size);
    data.append("color", color);
    data.append("city", city);
    data.append("price", price);
    data.append("condition", condition);
    data.append("picture", picture);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response);

      //Si submit réussi, récupère l'ID de l'offer et redirige directement vers sa page en se servant de son ID
      if (response.data._id) {
        navigate(`/product/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  return token ? (
    <div className="publish-body">
      <div className="publish-container">
        <h1>Vends ton article</h1>
        <form onSubmit={handleSubmit} className="publish-form">
          <div className="picture-bloc">
            <input
              type="file"
              id="file-upload"
              onChange={(event) => {
                setPicture(event.target.files[0]);
                // console.log(event.target.files[0]);
              }}
            />
            <div className="label-container">
              <label htmlFor="file-upload">
                <FontAwesomeIcon icon="plus" className="square-icon" />
                Ajoute une photo
              </label>
            </div>
            {picture !== "" && (
              <p className="img-selection">
                Image sélectionnée: {picture.name}{" "}
              </p>
            )}
          </div>
          <div className="text-bloc">
            <div className="publish-title">
              <span>Titre</span>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="publish-description">
              <span>Décris ton article</span>{" "}
              <textarea
                placeholder="ex: porté quelquefois, taille ceintrée"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="details-bloc">
            <div className="publish-brand">
              <span>Marque</span>
              <input
                type="text"
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="publish-size">
              <span>Taille</span>
              <input
                type="text"
                placeholder="ex: L / 40 / 12ans"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="publish-color">
              <span>Couleur</span>
              <input
                type="text"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="publish-condition">
              <span>Etat</span>
              <input
                type="text"
                placeholder="ex: Comme neuf"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="publish-city">
              <span>Lieu</span>
              <input
                type="text"
                placeholder="ex: Toulouse"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="price-bloc">
            <div className="publish-price">
              <span>Prix</span>
              <input
                type="text"
                placeholder="0.00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="checkbox-bloc">
              <div className="blank"></div>
              <div className="checkbox-container">
                <input type="checkbox" />
                <span>Je suis intéressé par les échanges</span>
              </div>
            </div>
          </div>
          <input type="submit" value="Ajouter" className="publish-btn" />
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
