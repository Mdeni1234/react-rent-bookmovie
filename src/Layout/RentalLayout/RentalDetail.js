import { useContext, useEffect, useState } from "react";
import { RentalContext } from ".";
import CreateCart from "./CreateCart";
import CreatePayment from "./CreatePayment";
import LoadingPage from "./LoadingPage";

const RentalDetail = () => {
  const {
    itemRental,
    rentalStatus,
    openContent,
    setOpenContent,
    labelPaymentButton,
  } = useContext(RentalContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(itemRental.image_url);
    itemRental.image_url && setIsLoading(false);
    console.log(isLoading);
  }, [itemRental]);

  const openContentRent = () => {
    setOpenContent(!openContent);
  };

  return (
    <div data-theme="dark">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <section className="body-font overflow-hidden bg">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="shadow-inner lg:w-1/2 w-full ">
                <img
                  className="shadow-inner w-full object-cover object-center rounded border"
                  src={itemRental.image_url}
                  alt="cover"
                />
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-neutral-content tracking-widest uppercase">
                  {itemRental.category}
                </h2>
                <h1 className="text-primary text-3xl font-sans font-extrabold mb-1">
                  {itemRental.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <span className="text-secondary-focus">
                      {itemRental.creator}
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed text-neutral-content">
                  {itemRental.description}
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-secondary mb-5">
                  <div className="flex">
                    <span className="mr-3 font-accent-focus">Genre</span>
                    {itemRental.ItemGenre &&
                      itemRental.ItemGenre.map((genre) => {
                        return (
                          <div key={genre.Genre.id}>
                            <button className="btn btn-xs btn-outline mx-1 btn-secondary-focus">
                              {genre.Genre.name}
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-neutral-content">
                    IDR {itemRental.price}
                  </span>
                  {rentalStatus ? (
                    <button
                      className="flex ml-auto bg-accent border-0 py-2 px-6 focus:outline-none hover:bg-accent-focus rounded"
                      onClick={() => {
                        openContentRent();
                      }}
                    >
                      {labelPaymentButton}
                    </button>
                  ) : (
                    <CreatePayment item={[itemRental]} cartId={null} />
                  )}
                  <CreateCart itemId={itemRental.id} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default RentalDetail;
