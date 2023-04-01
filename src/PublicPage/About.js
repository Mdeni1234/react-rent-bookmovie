import { Row, Col, Image } from "antd"
import BannerProduct from '../pictbanner.jpg'

const About = () => {
    return(
        <>
         <div className="banner">
            <Image preview={false} src={BannerProduct}></Image>
            <h1 style={{marginLeft: "50px"}} className="caption font-semibold underline font-mono" >ABOUT</h1>
        </div>
        <div className="content">
            <Row >
                
                <Col span={18} style={{padding: "0px 0px 50px 30px", marginTop: "20px", color: "white"}}>
                    <p style={{textAlign: "justify"}}>
                    At Netflix, we want to entertain the world. Whatever your taste, and no matter where you live, 
                    we give you access to best-in-class TV series, documentaries, feature films and mobile games. 
                    Our members control what they want to watch, when they want it, in one simple subscription. 
                    We're streaming in more than 30 languages and 190 countries, because great stories can come 
                    from anywhere and be loved everywhere. We are the world's biggest fans of entertainment, 
                    and we're always looking to help you find your next favorite story.
                    </p>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default About