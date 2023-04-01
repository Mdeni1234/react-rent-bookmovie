import { useState, createContext } from "react";

export const LayoutContext = createContext();

export const LayoutContextWrapper = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [dataPayment, setDataPayment] = useState(true);
  const [dashboard, setDashboard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataCart, setDataCart] = useState(true);
  const [rentalData, setRentalData] = useState(true);

  const contextValues = {
    dataPayment,
    setDataPayment,
    collapsed,
    setCollapsed,
    dashboard,
    setDashboard,
    showModal,
    setShowModal,
    dataCart,
    setDataCart,
    rentalData,
    setRentalData,
  };

  return (
    <LayoutContext.Provider value={contextValues}>
      {props.children}
    </LayoutContext.Provider>
  );
};
