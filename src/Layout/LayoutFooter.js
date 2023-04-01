import { Footer } from 'antd/es/layout/layout';
import {  Row, Col } from "antd"
import { InstagramOutlined, FacebookOutlined, TwitterOutlined } from "@ant-design/icons"
import logo from '../app-logo.png'

function LayoutFooter() {
    return (
        <Footer
        style={{
            background: 'black',
            color: 'white'
        }}>
        <Row>
            <Col span={3} />    
            <Col span={4}>
                <h3 className='text-lg font-semibold'>See what's next</h3>
                <img className="logo" alt="logo" width={60} src={logo}></img>
            </Col>
            <Col span={6}>
                <h5 className='text-lg'>Watch anywhere. Cancel anytime</h5>
            </Col>
            <Col span={6}>
                <h3 className='text-base'>Follow Us</h3>
                <Row style={{fontSize: "40px"}}>
                <Col span={6}><a href="https://www.instagram.com/" style={{color: "white"}}><InstagramOutlined/></a></Col>
                <Col span={6}><a href="https://twitter.com/" style={{color: "white"}}><TwitterOutlined/></a></Col>
                <Col span={6}><a href="https://www.facebook.com/" style={{color: "white"}}><FacebookOutlined/></a></Col>
                </Row>
            </Col>
        </Row>
    </Footer>
    )
}
export default LayoutFooter
