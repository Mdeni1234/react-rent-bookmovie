import { Button, Input, Form, message, Spin, Row, Col, InputNumber, Space } from "antd"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { LoadingOutlined } from "@ant-design/icons"
import { UserContext } from "../Context/UserContext"
import { useContext, useEffect, useState } from "react"
import { urlGateway } from "../utils/url"
import FormItem from "antd/es/form/FormItem"

const FormProfile = () => {
    const [user] = useContext(UserContext)
    const [currentProfile, setProfil] = useState({name: "", image_url: "", phone: null, address: ""})
    const [ready, setReady] = useState(false)
    const [spinButton, setSpinButton] = useState(false)
    const navigate = useNavigate()
  
    useEffect(() => {
            const currentProfile = async () => {
                await axios.get(`${urlGateway}/profile`, {headers: {"Authorization" : "Bearer "+ user.token}})
                        .then(res => {
                            setProfil(res.data)
                            setReady(true)
                        }).catch((err) => {
                            console.log(err)
                        })
            } 
            currentProfile()
    }, [user.token])
    

    const onFinish = async (values) => {
            setSpinButton(true)
                console.log(values)

                await axios.patch(`${urlGateway}/profile`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
                    .then((res) => {
                        message.success('Profile edited successfully!')
                        navigate("/profile")
                    }).catch((err)=>{
                        console.log(err)
                    })
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    const antIcon = (
        <LoadingOutlined
          style={{
            fontSize: 14,
            color: "white",
            marginLeft: "10px"
          }}
          spin
        />
    );

    return (
        !ready ?
        <Row justify='space-around' align='middle' style={{marginTop: "200px"}}>
            <Col>
                <Spin size='large'></Spin> 
            </Col>
        </Row>
        :
        <div className="content-layout" style={{backgroundColor: "white"}}>
        <Form
        name="basic"
        labelAlign="left"
        labelCol={{
            span: 5
        }}
        wrapperCol={{
            span: 12,
        }}
        initialValues={{
            name: currentProfile[0].name,
            image_url: currentProfile[0].image_url,
            phone: currentProfile[0].phone,
            address: currentProfile[0].address
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item 
            label="Name"
            name="name"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Name" />
        </Form.Item>
        <Form.Item 
            label="Phone"
            name="phone"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <InputNumber prefix="+62" placeholder="Phone" style={{ width: '100%'}} />
        </Form.Item>
        <Form.Item 
            label="Address"
            name="address"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Address" />
        </Form.Item>
        <Form.Item 
            label="Image URL"
            name="image_url"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input placeholder="Image URL" />
        </Form.Item>
        <Form.Item 
            wrapperCol = { {
                offset: 5,
                span: 12
              }
            }
        >
            <Button style={{backgroundColor: "#E50914", border: "none"}} type="primary" htmlType="submit">
                Submit
                {spinButton ? <Spin indicator={antIcon}/> : ""}
            </Button>
        </Form.Item> 
        </Form>
        </div>
    )
}

export default FormProfile