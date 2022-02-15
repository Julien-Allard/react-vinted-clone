import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import "./checkoutForm.css";
import axios from "axios";

const CheckoutForm = ({ product, amount, userId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const cardElements = elements.getElement(CardElement);

      //je fais une demande de token vers Stripe. Si ok, stripeResponse contient objet avec clé token (entre autres)
      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });
      // console.log(stripeResponse);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: product,
          amount: amount,
        }
      );

      console.log(response.data);

      if (response.data.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="payment-form-container">
          <CardElement className="card-element" />
          <button type="submit">Payer</button>
        </form>
      ) : (
        <div className="payment-successful">
          <span>Paiement effectué !</span>
          <Link to="/" className="payment-successful-home">
            Retour à l'accueil ?
          </Link>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
