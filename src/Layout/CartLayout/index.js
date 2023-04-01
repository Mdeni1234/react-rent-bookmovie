import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../Context/LayoutContext";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";
import CreatePayment from "../RentalLayout/CreatePayment";

const CartLayout = () => {
  const navigate = useNavigate();
  const { dataCart, setDataCart, setDataRental, showModal, setShowModal } =
    useContext(LayoutContext);
  const [user, , configJWT] = useContext(UserContext);
  const [cartItem, setCartItem] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [listItem, setListItem] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(null);

  const fetchData = async () => {
    const cart = await axios.get(`${urlGateway}/cart/${user.id}`, configJWT);
    console.log(cart.data);
    setListItem(cart.data);
    setDataCart(!dataCart);
  };
  const submitRent = async () => {
    const item = await listItem.map((i) => i.to_json.Item[0]);
    const id = await listItem.map((i) => i.to_json.id);
    totalPrice(item);
    setCartItem(item);
    setCartId(id);
  };

  const totalPrice = async (i) => {
    const sum = await i.reduce((s, v) => s + parseInt(v.price), 0);
    setTotalCartPrice(sum);
  };
  const removeCart = (id) => {
    const config = { ...configJWT, data: { id: [id] } };
    axios.delete(`${urlGateway}/cart`, config).then((u) => {
      setDataCart(!dataCart);
    });
  };
  const getItemPage = (id) => {
    navigate(`/item/${id}`);
    setShowModal(!showModal);
    setDataCart(true);
  };
  useEffect(() => {
    configJWT && dataCart && fetchData();
    listItem !== null && submitRent();
  }, [dataCart, showModal, configJWT]);

  return (
    <div data-theme="dark">
      {showModal && (
        <div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full md:w-auto my-6 ml-auto h-full max-w-3xl mr-0 mt-0">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-neutral outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-primary font-semibold">
                    Rent Cart
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-primary-content opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-primary-content opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex-1 h-[65vh] overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-white">
                          {listItem !== null ? (
                            listItem?.map((product) => {
                              return (
                                <li
                                  key={product.to_json.id}
                                  className="flex py-6"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-auto rounded-md border border-white">
                                    <img
                                      src={product.to_json.Item[0].image_url}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div
                                        onClick={() =>
                                          getItemPage(
                                            product.to_json.Item[0].id
                                          )
                                        }
                                        className="flex justify-between text-base font-medium text-accent"
                                      >
                                        <h3 className="hover:text-accent">
                                          <a>{product.to_json.Item[0].title}</a>
                                        </h3>
                                        <p className="ml-4">
                                          IDR {product.to_json.Item[0].price}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-neutral-content">
                                        {product.to_json.Item[0].category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div
                                        onClick={() =>
                                          removeCart(product.to_json.id)
                                        }
                                        className="flex"
                                      >
                                        <button
                                          type="button"
                                          className="font-medium text-primary-content hover:text-primary-focus"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })
                          ) : (
                            <li>Data Kosong</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-neutral-content">
                      <p>Subtotal</p>
                      <p>IDR {totalCartPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-content">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <CreatePayment cartId={cartId} item={cartItem} />
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        <button
                          type="button"
                          className="font-medium text-primary hover:text-secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
    </div>
  );
};
export default CartLayout;
