import { Row, Col, Button, Spin, Avatar, Card } from "antd"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext"
import { EditOutlined } from "@ant-design/icons";
import { urlGateway } from "../utils/url";

const { Meta } = Card;


const Profile = () => {
    const [user] = useContext(UserContext)
    const [profile, setProfile] = useState({})
    const [spin, setSpin] = useState(true)
    const navigate = useNavigate()


    const EditProfile = () => {
        navigate("/edit-profile")
    }

    useEffect(() => {
        const profile = async () => {
            await axios.get(`${urlGateway}/profile`, {headers: {"Authorization" : "Bearer "+ user.token}})
                .then(res => {
                    setProfile(res.data)
                    setSpin(false)
                }).catch(err => {
                    console.log(err)
                })
        }

        profile()
    },[user.token])


    return (
        spin ? 
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
        <div className="content-layout">
            <Button type="primary" icon={<EditOutlined />} size="large" style={{marginBottom: "20px", fontSize: "14px", backgroundColor: "#E50914", border: "none"}} onClick={EditProfile}>Edit Profile</Button>
                <Card
                    className="card-profile"
                    style={{
                    width: 450,
                    display: "block",
                    textAlign: "left"
                    }}
                >
                    <Meta
                    avatar={<Avatar size={64} src={<img src={profile[0].image_url} alt="avatar" />} />}
                    title="Profile"
                    />
                    <h3 class="font-semibold text-lg">Name</h3>
                      {profile[0].name}<br/>
                    <h3>Phone</h3>
                     +62{profile[0].phone}<br/>
                    <h3>Address</h3>
                     {profile[0].address}<br/>
                </Card>      
            
            </div>
    )
}

export default Profile