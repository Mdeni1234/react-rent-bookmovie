import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";

const CreateCart = (porps) => {
  let { itemId } = porps;
  const [user, , configJWT] = useContext(UserContext);
  const [cartItem, setCartItem] = useState(null);
  const [cartData, setCartData] = useState(true);
  const [cartId, setCartId] = useState(null);

  const fetchData = async () => {
    const cart = await axios.get(`${urlGateway}/cart/${user.id}`, configJWT);
    setCartItem(cart.data);
    setCartData(!cartData);
  };
  const getCartId = async (cart) => {
    const getItem = await cart.filter((i) => {
      return i.to_json.item_id === itemId;
    });
    setCartId(getItem.length > 0 ? [getItem[0].to_json.id] : null);
  };
  const addCart = () => {
    const raw = {
      item_id: itemId,
    };
    axios.post(`${urlGateway}/cart`, raw, configJWT).then((u) => {
      setCartData(!cartData);
    });
  };
  const delCart = () => {
    const config = { ...configJWT, data: { id: cartId } };
    axios.delete(`${urlGateway}/cart`, config).then((u) => {
      setCartData(!cartData);
    });
  };
  const submitCart = () => {
    cartId > 0 ? delCart() : addCart();
  };
  useEffect(() => {
    configJWT && cartData && fetchData();
    cartItem !== null && getCartId(cartItem);
  }, [cartData]);
  return (
    <div>
      <button
        onClick={() => submitCart()}
        className="hover:scale-100 items-center justify-center ml-2 py-2 px-6 rounded"
      >
        {cartId > 0 ? (
          <svg className="mx-auto fill-primary" width="30" height="30">
            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
          </svg>
        ) : (
          <svg className="mx-auto fill-neutral-content" width="30" height="30">
            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
          </svg>
        )}
      </button>
    </div>
  );
};
export default CreateCart;
