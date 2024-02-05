import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ title, amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (!error) {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: token.id,
          title: title,
          amount: amount,
        }
      );
      if (response.data.status === "succeeded") {
        setCompleted(true);
      } else {
        setErrorMessage("échec");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
