import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, theme, Row, Col, Menu} from 'antd';
import React, { useContext } from 'react';
import { LayoutContext } from '../Context/LayoutContext';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';
import logo from '../app-logo.png'


const { Header } = Layout;

function LayoutHeader() {
    const { collapsed, setCollapsed, dashboard, setDashboard } = useContext(LayoutContext)
    const [user, setUser] = useContext(UserContext)

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()

    const HandleNavigate = (props) => {
        if(props.key === "/logout") {
            
            navigate("/")
        }else {
            navigate(props.key)
        }
    }

    const handleLogin = (e) => {
        navigate("/login")
    }

    const handleLogout = (e) => {
        setUser(null)
        setDashboard(false)
        localStorage.clear()
        navigate("/")
    }

    const handleDashboard = (e) => {
        setDashboard(true)
        navigate("/dashboard")
    }

    const handleLogo = () => {
        navigate('/')
    }

    let Login = [
        {
            label: (
                <p style={{ margin: 0 }} onClick={e => handleLogin(e)}>Login</p>
            ),
            key: '/login',
        },
    ]

    let Logout = [
        {
            danger: true,
            label: (
                <p style={{ margin: 0 }} onClick={e => handleLogout(e)}>Logout</p>
            ),
            key: '/logout',
        },
    ]
    let Dashboard = [
        {
            label: (
                <p style={{ margin: 0 }} onClick={e => handleDashboard(e)}>Dashboard</p>
            ),
            key: '/dashboard',
        },
    ]

    const menuItems=[
        {label: "For You", key: "/"},
        {label: "Items", key: "/items"},
        {label: "About Us", key: "/about"},
    ]


    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%'
            }}
        >
            {user && dashboard && dashboard && React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}

            {user &&
                <p style={{ position: 'absolute', right: 60, top: 0, margin: '0', fontWeight:"bold", textAlign:"right", color: "white" }}>
                    {user.email}
                </p>
            }

            {!dashboard &&
            <Row>
                <Col span={4} style={{
                textAlign:'center'
            }}><img className="logo" onClick={handleLogo} alt="logo" width={120} src={logo}></img></Col>
            <Col className="sideheader" span={20}>
                <Menu className="font-inter" style={{fontSize: "16px", color: "#ffffff", paddingRight: "2px"}} mode="horizontal" items={menuItems} key={[menuItems.key]} onClick={HandleNavigate}></Menu>
            </Col>
            </Row>
            }
            {user ?
            <>
                <p style={{ position: 'absolute', right: 60, top: 0, margin: '0', fontWeight:"bold", textAlign:"right", color:"white" }}>
                    {user.email}
                </p>
                <Dropdown
                    menu={{ items: user ? dashboard ? [ ...Logout ]: [...Dashboard, ...Logout] : Login }}
                    trigger={['click']}
                >
                    <Button 
                        shape="circle" 
                        icon={<UserOutlined style={{fontSize:"20px"}}/>} 
                        style={{ position: 'absolute', right: 0, top: 0, margin: '10px', backgroundColor: "#FFF", display:"flex", justifyContent:"center", alignItems: "center" }} 
                        size='large' 
                    />
                </Dropdown>
            </> :
                <div
                    className='absolute right-[10px] top-[16px] flex gap-[10px]'
                >
                    <Button         
                        className="w-30 bg-[#fff] flex justify-center items-center"        
                        size='medium'
                        onClick={()=> navigate('/login')}
                    >
                        Login
                    </Button>
                    <Button         
                        className="w-[80px] p-0 bg-[#fff] flex justify-center items-center"         
                        size='medium'
                        onClick={()=> navigate('/register')}
                    >
                        Register
                    </Button>
                </div>
            } 
                
        </Header>
    )
}
export default LayoutHeader
