import axios from "axios";
import { useState, useEffect } from "react";
import "./items.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Items = ({ search, sort }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [maxPage, setMaxPage] = useState();
  const [limit, setLimit] = useState();
  const [page, setPage] = useState(1);

  //Fonctions pour les flèches de navigation
  const pageDown = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const fastPageDown = () => {
    if (page > 5) {
      setPage(page - 5);
    }
  };

  const pageUp = () => {
    if (page < maxPage) {
      setPage(Number(page + 1));
    }
  };

  const fastPageUp = () => {
    if (page <= maxPage - 5) {
      setPage(page + 5);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-vinted-clone.herokuapp.com/offers?limit=${limit}&page=${page}&title=${search}&sort=${sort}`
        );
        setData(response.data);
        setLimit(10);
        setMaxPage(Math.ceil(response.data.count / limit));
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page, limit, sort]);

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <>
      <div className="page-btn-container">
        <button
          onClick={fastPageDown}
          className={page <= 5 ? "page-btn-off" : "page-btn"}
        >
          <FontAwesomeIcon icon="angles-left" />
        </button>
        <button
          onClick={pageDown}
          className={page <= 1 ? "page-btn-off" : "page-btn"}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </button>
        <span>
          <input
            type="number"
            value={page}
            className="page-selection"
            onChange={(event) => {
              setPage(Number(event.target.value));
            }}
          />
          / {maxPage}
        </span>
        <button
          onClick={pageUp}
          className={page === maxPage ? "page-btn-off" : "page-btn"}
        >
          <FontAwesomeIcon icon="arrow-right" />
        </button>
        <button
          onClick={fastPageUp}
          className={page > maxPage - 5 ? "page-btn-off" : "page-btn"}
        >
          <FontAwesomeIcon icon="angles-right" />{" "}
        </button>
      </div>
      <div className="items-container">
        {data.offers.map((offer) => {
          return (
            <Link
              key={offer._id}
              to={`product/${offer._id}`}
              className="item-card"
            >
              <div className="user-identity">
                {offer.owner.account.hasOwnProperty("avatar") && (
                  <div className="user-avatar">
                    <img src={offer.owner.account.avatar.url} alt="" />
                  </div>
                )}
                <span>{offer.owner.account.username}</span>
              </div>
              <div className="item-picture">
                <img src={offer.product_image} alt="" />
              </div>
              <div className="product-details">
                <span className="item-price">{offer.product_price} €</span>
                {offer.product_details.map((detail, index) => {
                  // console.log(detail);
                  return (
                    <div key={index}>
                      {detail.MARQUE ? (
                        <span className="item-brand">{detail.MARQUE}</span>
                      ) : null}
                      {detail.TAILLE ? (
                        <span className="item-size">{detail.TAILLE}</span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Items;
