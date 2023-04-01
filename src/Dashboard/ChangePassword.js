import { Button, Input, Form, message, Spin, Col, Alert, Row, Card} from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { UserContext } from "../Context/UserContext"
import React from "react"
import { urlGateway } from "../utils/url";

const ChangePassword = () => { 
    let formRef = React.createRef()
    const navigate = useNavigate()
    const [user] = useContext(UserContext)
    const [spinButton, setSpinButton] = useState(false)
    const [error, setError] = useState(false)


    const onFinish = async (values) => {
        setError(false)
        setSpinButton(true)
        await axios.patch(`${urlGateway}/change-password`, values, {headers: {"Authorization" : "Bearer "+ user.token}})
        .then((res) => {
            message.success("Password changed")
            navigate("/dashboard")
            window.location.reload()
            setSpinButton(false)    
        }).catch((err)=>{
            setError(true)
            setSpinButton(false)
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
    )

    return (
        <div className="content-layout">
            <Row style={{marginBottom: "30px"}}>
                        <Col span={20}>
                            {
                                error && <Alert message="Your password is wrong or doesn't match!" type="error" closable showIcon/>
                            }
                        </Col>
                    </Row>
        <Card
                    className="card-profile"
                    style={{
                    width: "70%",
                    display: "block",
                    textAlign: "left"
                    }}
                >
        <Form
        ref={formRef}
        name="basic"
        labelCol={{
            span: 7
        }}
        labelAlign = "left"
        wrapperCol={{
            span: 10,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item 
            label="Current Password"
            name="currentPassword"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input.Password placeholder="Current Password" />
        </Form.Item>
        <Form.Item 
            label="New Password"
            name="newPassword"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item 
            label="Confirm New Password"
            name="confirmNewPassword"
            rules={[
                {
                    required: true,
                }
            ]}
        >
            <Input.Password placeholder="Confirm New Password" />
        </Form.Item>
        <Form.Item 
            wrapperCol = { {
                offset: 7,
                span: 10
              }
            }
        >
            <Button style={{backgroundColor: "#E50914", border: "none"}} type="primary" htmlType="submit">
                Submit
                {spinButton ? <Spin indicator={antIcon}/> : ""}
            </Button>
        </Form.Item>
        </Form>
        </Card>
        </div>
    )
}

export default ChangePassword