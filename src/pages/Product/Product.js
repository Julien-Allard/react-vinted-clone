import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-vinted-clone.herokuapp.com/offer/${id}`,
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div>Chargement en cours...</div>
  ) : (
    <div className="product-body">
      <div className="product-container">
        <div className="product-all-pictures">
          <div className="product-picture-container">
            <img src={data.product_image} alt="" />
          </div>
        </div>
        <div className="product-summary">
          <div className="product-summary-details">
            <p className="product-price">{data.product_price} €</p>
            <ul className="product-details-list">
              {data.product_details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <li key={index}>
                    <span>{keys[0]}</span>
                    <span>{elem[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="product-description">
            <span className="product-description-title">
              {data.product_name}
            </span>
            <span className="product-description-description">
              {data.product_description}
            </span>
            <div className="product-user-identity">
              {data.owner.account.hasOwnProperty('avatar') && (
                <div className="product-user-avatar">
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                </div>
              )}
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <Link
            to="/payment"
            className="product-buy-btn-container"
            state={{
              title: data.product_name,
              amount: data.product_price,
            }}
          >
            <button className="product-buy-btn">Acheter</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
