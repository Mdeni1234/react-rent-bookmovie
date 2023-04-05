import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../../Context/LayoutContext";
import { UserContext } from "../../Context/UserContext";

import { urlGateway } from "../../utils/url";
import ContentLayout from "../ContentLayout";
import RentalDetail from "./RentalDetail";
export const RentalContext = createContext();

const RentalLayout = () => {
  const { id } = useParams();
  const [user, , configJWT] = useContext(UserContext);
  const { rentalData, setRentalData } = useContext(LayoutContext);

  const [itemRental, setItemRental] = useState([]);
  const [tokenPayment, setTokenPayment] = useState(null);
  const [itemPayment, setItemPayment] = useState(null);
  const [openContent, setOpenContent] = useState(false);
  const [labelPaymentButton, setLabelPaymentButton] = useState("");
  const [rentalStatus, setRentalStatus] = useState(null);
  const [rentalItemActive, setRentalItemActive] = useState([]);
  const [dataItem, setDataItem] = useState(true);
  const fetchItem = async () => {
    const res = await axios.get(`${urlGateway}/item/${id}`);
    return res.data;
  };
  const fetchDataUser = async () => {
    if (user && configJWT && (rentalData || dataItem)) {
      const resActive = await axios.get(
        `${urlGateway}/rental/active/${user.id}`,
        configJWT
      );
      setRentalData(false);
      return resActive.data;
    } else {
      return false;
    }
  };
  const initData = async () => {
    const item = await fetchItem();
    const userData = await fetchDataUser();
    console.log(userData);
    user && checkingRentalStatus(userData, item);
    setRentalItemActive(userData);
    setItemRental(item);
    setDataItem(false);
  };
  useEffect(() => {
    dataItem && initData();
    rentalStatus !== null && checkingButtonAction();
  }, [configJWT, rentalStatus, openContent, rentalData, dataItem]);

  const checkingRentalStatus = async (rs, ri) => {
    let item = await rs.filter((i) => i.item_id === ri.id);
    return item.length > 0 ? setRentalStatus(true) : setRentalStatus(false);
  };
  const checkingButtonAction = () => {
    let buttonLabel = "";
    rentalStatus &&
      (itemRental.category === "book"
        ? (buttonLabel = "Read")
        : (buttonLabel = "Watch"));

    setLabelPaymentButton(buttonLabel);
  };

  const rentalContextValue = {
    itemRental,
    configJWT,
    labelPaymentButton,
    tokenPayment,
    rentalStatus,
    rentalItemActive,
    rentalData,
    itemPayment,
    openContent,
    user,
    setItemRental,
    setTokenPayment,
    setRentalStatus,
    setRentalItemActive,
    setItemPayment,
    setRentalData,
    checkingButtonAction,
    setOpenContent,
    setLabelPaymentButton,
  };
  return (
    <RentalContext.Provider value={rentalContextValue}>
      {openContent ? <ContentLayout /> : <RentalDetail />}
    </RentalContext.Provider>
  );
};
export default RentalLayout;
