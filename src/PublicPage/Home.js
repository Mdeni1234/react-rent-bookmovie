import { Button, Carousel, Col, Image, Row, Card, Skeleton } from "antd"
import Overlord from '../Overlord.jpg'
import HarryPotter from '../Harry Potter.jpg'
import Avenger from '../Avenger.png'
import { urlGateway } from '../utils/url';
import axios from "axios"
import { useState, useEffect } from "react"
import pictsub from '../pic-subscribe.jpg'
import { Link, useNavigate } from "react-router-dom"


const Home = () => {

    const [item, setItem] = useState([])
    const [spin, setSpin] = useState(true)
    const navigate = useNavigate()



    useEffect(() => {  

        const getItem = async () => {
            await axios.get(`${urlGateway}/item`)
              .then((res) => {
                setItem(res.data)
                setSpin(false)
              }).catch((err)=>{
                console.log(err)
              })
        } 
        getItem()   
      }, [])

      const HandleAllItems = () => {
        navigate("/items")
      }

    return (
                <div className="home">
                    <Carousel autoplay="true" style={{width:"100%"}}>
                    <div className="banner">
                        <Image preview={false} width="100%" height="565px" src={Overlord} style={{objectFit:"contain"}}></Image>
                    </div>
                    <div className="banner">
                        <Image preview={false} width="100%" height="565px" src={Avenger} style={{objectFit:"contain"}}></Image>
                    </div>
                    <div className="banner">
                        <Image preview={false} width="100%" height="565px" src={HarryPotter} style={{objectFit:"contain"}}></Image>
                    </div>
                    </Carousel>
                    <div className="content" style={{height: "400px"}}>
                <h1 style={{textAlign: "left", paddingLeft: "40px", fontSize: "25px", paddingBottom: "20px"}} class="font-semibold">Our Recommendation</h1>
                {
                spin ? <>
                <Row>
                        <Col span={22}>
                        <Card 
                           bordered={true}
                        >
                            <Skeleton active/>
                        </Card>                                        
                            <Skeleton/>
                        </Col>
                        
                    </Row>
                    </> :
                <Row style={{marginBottom: "20px"}}>
                <Row gutter={24} style={{width: "100%", marginTop: "10px", paddingLeft: "40px"}}>
                                    {item.map((el) => {
                                                return (
                                                        <Col span={3}>
                                                            <Card 
                                                                style={{height: "20px", width:"150px", textAlign:"center"}}
                                                                key={el.id}
                                                                bordered={true}
                                                                bodyStyle={{padding:"10px 0"}}
                                                                cover={
                                                                    <Link to={`/item/${el.id}`}>
                                                                        <img src={el.image_url} alt={el.title} style={{objectFit:"cover", height:"250px", width:"150px" }} ></img>
                                                                    </Link>
                                                                }>                                                                 
                                                                <Link to={`/item/${el.id}`}>
                                                                    <h4 style={{textOverflow: "ellipsis", color: "white"}}>
                                                                        {el.title}
                                                                    </h4>
                                                                </Link>
                                                            </Card>
                                                        </Col>
                                                )
                                    })}
                                </Row>
                    </Row>
                }
                </div>
                </div>
    )
}


export default Home