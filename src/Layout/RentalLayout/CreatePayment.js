import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { RentalContext } from ".";
import { LayoutContext } from "../../Context/LayoutContext";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";

const CreatePayment = (props) => {
  const { setDataCart, setRentalData } = useContext(LayoutContext);
  const [user, , configJWT] = useContext(UserContext);
  const { item, cartId } = props;
  const [tokenPayment, setTokenPayment] = useState(null);
  const [itemPayment, setItemPayment] = useState(null);

  useEffect(() => {
    console.log(tokenPayment);
    if (tokenPayment !== null) {
      const script = document.createElement("script");
      const snapSrcUrl = `${tokenPayment?.token.redirect_url}`;
      const myMidtransClientKey = tokenPayment?.clientKey;

      script.src = snapSrcUrl;
      script.setAttribute("data-client-key", myMidtransClientKey);
      script.async = true;

      document.body.appendChild(script);

      window.snap.pay(tokenPayment.token.token, {
        onSuccess: function (result) {
          const raw = {
            listItem: itemPayment.item,
            status: true,
            price: result.gross_amount,
            order_id: result.order_id,
          };
          const config = { ...configJWT, data: { id: cartId } };
          cartId !== null && axios.delete(`${urlGateway}/cart`, config);
          axios.post(`${urlGateway}/rental`, raw, configJWT).then((u) => {
            setItemPayment(null);
            setTokenPayment(null);
            tokenPayment && cartId === null
              ? setRentalData(true)
              : setDataCart(true);
          });
        },
        onClose: function () {
          setItemPayment(null);
          setTokenPayment(null);
        },
      });
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [tokenPayment, item, configJWT]);

  const submitButtonAction = () => {
    const raw = {
      item: [...item],
      profile: {
        first_name: user.name,
        last_name: user.name,
        email: user.email,
        phone: "09987",
        address: "Blabla",
      },
    };
    axios.post(`${urlGateway}/createpayment`, raw, configJWT).then((i) => {
      setTokenPayment(i.data);
      setItemPayment(raw);
    });
  };
  return (
    <div className="flex-1 justify-end">
      {configJWT && (
        <button
          className="flex font-semibold uppercase justify-center items-center ml-auto w-40 bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-secondary-focus rounded"
          onClick={() => {
            submitButtonAction();
          }}
        >
          Rent
        </button>
      )}
    </div>
  );
};
export default CreatePayment;
