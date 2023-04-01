import { Layout, theme } from 'antd';

const { Content } = Layout;


const Dashboard = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Content
            className='content'
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
        >This is dashboard
        </Content>
    )
}
export default Dashboard