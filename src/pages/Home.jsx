import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/Home.css";

export default function Home() {
  const [offersList, setOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );

        setOffersList(response.data.offers);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement en cours...</p>
  ) : (
    <main className="home">
      <div>
        {offersList.map((offer) => {
          return (
            <Link
              to={`/offer/${offer._id}`}
              key={offer._id}
              className="offerCard"
            >
              <div>
                {offer.owner.account.avatar && (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt="avatar"
                  />
                )}
                <span>{offer.owner.account.username}</span>
              </div>

              <img src={offer.product_image.secure_url} alt="product" />

              <p>
                {offer.product_price.toFixed(2).toString().replace(".", ",")} €
              </p>

              <span>{offer.product_name}</span>
              <span>{offer.product_details.MARQUE}</span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
