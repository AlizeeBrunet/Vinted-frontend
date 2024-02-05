import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Offer.css";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate("/payment", {
      state: {
        title: offer.product_name,
        amount: offer.product_price,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setOffer(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  if (!offer) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="offer">
      <div className="offer-image">
        <img src={offer.product_image.secure_url} alt="product" />
      </div>
      <div className="offer-details">
        <span className="offer-price">{offer.product_price} €</span>
        <ul>
          {offer.product_details.map((detail) => {
            const keysTab = Object.keys(detail);
            return (
              <li>
                <span className="offer-detail-name">
                  {keysTab[0]}:{detail[keysTab[0]]}
                </span>
              </li>
            );
          })}
        </ul>
        <h3>{offer.product_name}</h3>

        <button onClick={handleBuy}>Acheter</button>
      </div>
    </div>
  );
};

export default Offer;
