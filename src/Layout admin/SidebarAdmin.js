import {
    UserOutlined,
    UnorderedListOutlined,
    AppstoreOutlined,
    ShoppingOutlined,
    MoneyCollectOutlined,
    HomeFilled,
    HomeTwoTone
} from '@ant-design/icons';
import { Menu, Button } from "antd"
import Sider from "antd/es/layout/Sider"
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutContext } from '../Context/LayoutContext';


function Sidebar() {
    const { collapsed } = useContext(LayoutContext)
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/')
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" onClick={e => handleHome(e)} style={{ display: 'center', backgroundColor: 'black'}}>
                <Button 
                    style={{backgroundColor: "#FFF", width:"100%", display:"flex", justifyContent:"center" }}
                    block
                >Admin</Button>  
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['user']}
                items={[
                    {
                        key: 'user',
                        icon: <UserOutlined />,
                        label: 'User',
                    },
                    {
                        key: 'item',
                        icon: <UnorderedListOutlined />,
                        label: 'Item',
                    },
                    {
                        key: 'genre',
                        icon: <AppstoreOutlined />,
                        label: 'Genre',
                    },
                    {
                        key: 'rental',
                        icon: <ShoppingOutlined />,
                        label: 'Rental',
                    },
                    {
                        key: 'payment',
                        icon: <MoneyCollectOutlined />,
                        label: 'Payment',
                    }
                ]}

                onClick={({key}) => {
                    return navigate(`admin/${key}`)
                }}
            />
        </Sider>
    )
}
export default Sidebar
