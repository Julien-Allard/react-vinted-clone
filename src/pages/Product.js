import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      // Meilleure méthode
      // const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offers/${id}`)
      // Il suffit après d'appeler directement les clé nécessaires dans le HTML sans avoir à boucler sur la totalité de data
      // Si on fait ainsi, mieux vaut mettre id dans le tableau de useEffect afin d'éviter un warning de React dans la console

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div>Chargement en cours</div>
  ) : (
    <>
      <Header />
      <div className="product-container">
        {data.offers.map((offer, index) => {
          return offer._id === id ? (
            <>
              <div>
                {offer.product_pictures.map((picture) => {
                  return (
                    <div>
                      <img src={picture.secure_url} alt="" />
                    </div>
                  );
                })}
              </div>
              <div className="product-summary">
                <div className="product-details">
                  <span className="product-price">{offer.product_price}</span>
                  <ul className="product-details-list">
                    {offer.product_details.map((detail) => {
                      // // Meilleure solution, permet de ne pas avoir à mettre de condition pour l'affichage des détails
                      // // et de ne pas avoir à noter les clés en dur
                      // const keys = Object.keys(detail); //renvoie ["MARQUE"], puis ["PRIX"]... Object.keys renvoie les clés d'un objet
                      // return (
                      //   <>
                      //   <li>
                      //     <span>{keys[0]}</span> // ["MARQUE"], ["PRIX"]...
                      //     <span>{detail[keys[0]]}</span> // Valeur de chaque clé
                      //   </li>
                      //   </>
                      // )

                      return (
                        <>
                          {detail.MARQUE ? (
                            <li>
                              <span>MARQUE</span>
                              <span>{detail.MARQUE}</span>
                            </li>
                          ) : null}
                          {detail.TAILLE ? (
                            <li>
                              <span>TAILLE</span>
                              <span>{detail.TAILLE}</span>
                            </li>
                          ) : null}
                          {detail.ÉTAT ? (
                            <li>
                              <span>ÉTAT</span>
                              <span>{detail.ÉTAT}</span>
                            </li>
                          ) : null}
                          {detail.COULEUR ? (
                            <li>
                              <span>COULEUR</span>
                              <span>{detail.COULEUR}</span>
                            </li>
                          ) : null}
                          {detail.EMPLACEMENT ? (
                            <li>
                              <span>EMPLACEMENT</span>
                              <span>{detail.EMPLACEMENT}</span>
                            </li>
                          ) : null}
                        </>
                      );
                    })}
                  </ul>
                </div>
                <div className="product-description">
                  <span>{offer.product_name}</span>
                  <span>{offer.product_description}</span>
                  <div className="product-user-identity">
                    <div className="product-user-avatar">
                      <img src={offer.owner.account.avatar.secure_url} alt="" />
                    </div>
                    <span>{offer.owner.account.username}</span>
                  </div>
                </div>
                <button>Acheter</button>
              </div>
            </>
          ) : null;
        })}
      </div>
    </>
  );
};

export default Product;
