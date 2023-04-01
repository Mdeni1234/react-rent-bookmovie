import {
  UserOutlined,
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ShoppingOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../Context/LayoutContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Sidebar() {
  const {
    collapsed,
    setDashboard,
    dataCart,
    setDataCart,
    showModal,
    setShowModal,
  } = useContext(LayoutContext);
  const [user] = useContext(UserContext);
  let [items, setItems] = useState([]);
  const navigate = useNavigate();
  const openCart = () => {
    setDataCart(true);
    setShowModal(!showModal);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const item = getItem(
    "List Item",
    "item",
    <UnorderedListOutlined style={{ color: "white" }} />
  );

  const handleHome = (e) => {
    setDashboard(false)
    navigate("/");
  };

  useEffect(
    function () {
      const userItems = [
        {
          key: "genre",
          icon: <AppstoreOutlined />,
          label: "Genre",
        },
        item,
        {
          label: "User",
          icon: <UserOutlined />,
          key: "usermenu",
          children: [
              {
                  label: "Profile",
                  icon: <UserOutlined />,
                  key: "profile"
              },
              {
                label: "Change Password",
                icon: <EditOutlined />,
                key: "change-password"
            },
          ]
      },
        {
          key: "cart",
          icon: <ShoppingCartOutlined />,
          label: "cart",
        },
      ];

      const adminItems = [
        {
          key: "dashboard",
          icon: <UserOutlined />,
          label: "User",
        },
      ];
      if (user) setItems(user.role === "admin" ? adminItems : userItems);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    user ? [user.role] : []
  );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: "black",
      }}
    >
      <div
        className="logo"
        onClick={(e) => handleHome(e)}
        style={{ display: "center", backgroundColor: "black" }}
      >
        <Button
          style={{backgroundColor: "#FFF", width:"100%", display:"flex", justifyContent:"center" }}
          icon={
            <HomeOutlined
              style={{ fontSize: 20, color: "#111319"}}
            />
            
          }
          block
        ></Button>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          background: "black",
        }}
        items={items}
        onClick={({ key }) => {
          key === "cart" ? openCart() : navigate(key);
        }}
      />
    </Sider>
  );
}
export default Sidebar;
