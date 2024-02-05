import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import "../pages/Payment.css";
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = () => {
  const location = useLocation();
  const { title, amount } = location.state || {};

  const buyerProtection = 0.4; // Frais de protection acheteurs
  const shipping = 2.0; // Frais de port
  const total = amount + buyerProtection + shipping;
  return (
    <>
      <h3>Résumé de la commande</h3>
      <div className="container-description">
        <div>
          <span>Commande</span>
          <span>{amount.toFixed(2)} €</span>
        </div>
        <div>
          <span>Frais protection acheteurs</span>
          <span>{buyerProtection.toFixed(2)} €</span>
        </div>
        <div>
          <span>Frais de port</span>
          <span>{shipping.toFixed(2)}€</span>
        </div>
        <div>
          <span>Total</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </div>

      <p className="payment-description">
        Il ne vous reste plus qu'une étape pour vous offrir {title}. Vous allez
        payer {total.toFixed(2)} € (frais de protection et frais de port
        inclus).
      </p>

      <div className="payment-form">
        <Elements stripe={stripePromise}>
          <PaymentForm title={title} amount={amount} />
        </Elements>
      </div>
    </>
  );
};

export default Payment;
