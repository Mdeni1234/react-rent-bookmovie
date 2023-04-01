import { Row, Col, Button, Form, Input, Alert, Spin } from "antd"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserOutlined, KeyOutlined, LoadingOutlined } from '@ant-design/icons'
import axios from 'axios'
import { UserContext } from '../Context/UserContext'
import { urlGateway } from "../utils/url"

const Register = () => {
    const [, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [spinButton, setSpinButton] = useState(false)

    const onFinish = (values) => {
        setSpinButton(true)
        setError(false)
        axios.post(`${urlGateway}/register`, { ...values })
            .then((res) => {
                let dataUser = res.data.user
                let token = res.data.token
                setUser({ ...dataUser, token })
                localStorage.setItem("user", JSON.stringify({ ...dataUser, token }))
                navigate("/")
            }).catch((err) => {
                setSpinButton(false)
                setError(true)
                console.log(err)
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleLogin = () => {
        navigate("/login")
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
        <div className="content">
            <Row justify="space-around">
                <Col span={12}>
                    <h1 style={{ marginTop: "0px" }}>Register</h1>
                    <Row style={{ marginBottom: "30px" }}>
                        <Col span={20}>
                            {
                                error && <Alert message="Email has already taken!" type="error" closable showIcon />
                            }
                        </Col>
                    </Row>
                    <Form
                        name="register"
                        labelAlign="left"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label=""
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please input your email!'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Input email" />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    type: 'name',
                                    message: 'Please input your username!'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Input username" />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input password!'
                                },

                            ]}
                        >
                            <Input.Password prefix={<KeyOutlined />} placeholder="Input password" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 20,
                            }}
                        >
                            <Button type="primary" htmlType="submit" style={{ marginRight: "20px", backgroundColor: "#E50914", border: "none" }}>
                                Submit {spinButton ? <Spin indicator={antIcon} /> : ""}
                            </Button>
                            <span className="text-white">
                            or
                            </span>
                            <Button type="link" style={{ marginRight: "20px" }} onClick={handleLogin}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Register