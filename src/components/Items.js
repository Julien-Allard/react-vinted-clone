import axios from "axios";
import { useState, useEffect } from "react";
import "./items.css";
import { Link } from "react-router-dom";

const Items = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
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
    <div>Chargement en cours...</div>
  ) : (
    <div className="items-container">
      {data.offers.map((offer) => {
        return (
          <Link
            key={offer._id}
            to={`product/${offer._id}`}
            className="item-card"
          >
            <div className="user-identity">
              <div className="user-avatar">
                <img src={offer.owner.account.avatar.secure_url} alt="" />
              </div>
              <span>{offer.owner.account.username}</span>
            </div>
            <div className="item-picture">
              <img src={offer.product_pictures[0].secure_url} alt="" />
            </div>
            <div className="product-details">
              <span className="item-price">{offer.product_price} €</span>
              {offer.product_details.map((detail) => {
                // console.log(detail);
                return (
                  <>
                    {detail.MARQUE ? (
                      <span className="item-brand">{detail.MARQUE}</span>
                    ) : null}
                    {detail.TAILLE ? (
                      <span className="item-size">{detail.TAILLE}</span>
                    ) : null}
                  </>
                );
              })}
              <span></span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Items;
