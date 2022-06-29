import { loadStripe } from '@stripe/stripe-js'; //Pour récupérer mon API key Stripe
import { Elements } from '@stripe/react-stripe-js'; //Pour indiquer tout ce qui est envoyé à Stripe
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import './payment.css';

const stripePromise = loadStripe(
  'pk_test_51KTQKMIYeDxJJTmyWjk0JpyOkoqYp7EJsJIsa2PLAZ6W66FWDMvSExZHKoBqSnFuewe5zvXuZ7ZKwu0eM0pPTgLX00WYTY1HVE',
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title, amount } = location.state;

  return token ? (
    <div className="payment-body">
      <div className="payment-container">
        <h2>Résumé de la commande</h2>
        <ul>
          <li>
            <span>Commande</span>
            <span>{amount.toFixed(2)} €</span>
          </li>
          <li>
            <span>Frais protection acheteurs</span>
            <span>0.40 €</span>
          </li>
          <li>
            <span>Frais de port</span>
            <span>0.80 €</span>
          </li>
        </ul>
        <div className="total-container">
          <span>Total</span>
          <span>{(amount + 1.2).toFixed(2)} €</span>
        </div>
        <p className="payment-text-summary">
          Il ne vous reste plus qu'une étape pour vous offrir{' '}
          <span>{title}</span>. Vous allez payer{' '}
          <span>{(amount + 1.2).toFixed(2)} €</span> (frais de protection et
          frais de port inclus).
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm product={title} amount={amount} />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
