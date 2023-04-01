import { Layout, theme } from 'antd';
import UserRoute from '../Routes';
import PublicRoute from '../Routes/PublicRoute';
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import AdminRoute from '../Routes/AdminRoute';

const { Content } = Layout;


function LayoutContent() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [user] = useContext(UserContext)

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >
            {/* {console.log(user)} */}
            {user ? user.role === 'admin' ? <AdminRoute /> : <UserRoute /> : <PublicRoute />}
            {/* <h1>Movie & Book Rental</h1> */}
        </Content>
    )
}

export default LayoutContent