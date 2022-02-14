import axios from "axios";
import { useState, useEffect } from "react";
import "./items.css";
import { Link } from "react-router-dom";

const Items = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [maxPage, setMaxPage] = useState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const pageDown = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const pageUp = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?page=${page}&limit=${limit}&title=${search}`
        );
        setMaxPage(response.data.count % limit);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page, limit]);

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <>
      <div className="page-btn-container">
        <button
          onClick={pageDown}
          className={page === 1 ? "page-btn-off" : "page-btn"}
        >
          Page précédente
        </button>
        <span>
          {page} / {maxPage}
        </span>
        <button
          onClick={pageUp}
          className={page === maxPage ? "page-btn-off" : "page-btn"}
        >
          Page suivante
        </button>
      </div>
      <div className="items-container">
        {data.offers.map((offer) => {
          return (
            <>
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
                  <img src={offer.product_image.url} alt="" />
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
            </>
          );
        })}
      </div>
    </>
  );
};

export default Items;
