import { Layout } from "antd";
import React, { useContext } from "react";
import LayoutContent from "./LayoutContent";
import LayoutFooter from "./LayoutFooter";
import LayoutHeader from "./LayoutHeader";
import Sidebar from "./Sidebar";
import SidebarAdmin from "../Layout admin/SidebarAdmin";
import { BrowserRouter } from "react-router-dom";
import { LayoutContext } from "../Context/LayoutContext";
import { UserContext } from "../Context/UserContext";
import CartLayout from "./CartLayout";
import ScrollToTop from "./AutoScroll";

function Main() {
  const { dashboard } = useContext(LayoutContext);
  const [user] = useContext(UserContext);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <CartLayout />
        {dashboard && user ? (
          user.role === "admin" ? (
            <SidebarAdmin />
          ) : (
            <Sidebar />
          )
        ) : (
          <></>
        )}
        <Layout className="site-layout">
          <LayoutHeader />
          <LayoutContent />
          <LayoutFooter />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default Main;
