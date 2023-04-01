import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Divider, Form, Input, message, Popconfirm, Row, Select, Space, Spin, Table } from "antd"
import Column from "antd/es/table/Column";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";


const ItemGenre = () => {
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState({page:false, button:false});
    const [user] = useContext(UserContext)
    const [form] = Form.useForm();
    

    useEffect( () => {
        const fetchItem = async () => {
            setLoading({...loading, page:true});
            try {
                const responseItem = await axios.get(`${urlGateway}/item/${id}`);
                const responseGenre = await axios.get(`${urlGateway}/genre`);
                setItem(responseItem.data);
                setGenre(responseGenre.data);
                setLoading({...loading, page:false});
                
            } catch(err) {
                console.log(err)
            }
        }
        if (item === null) {
            fetchItem();
        }
    }, [item]) 

    const handleSubmit = async (values) => {
        try {
            setLoading({...loading, button:true});            
            const response = await axios.post(
                `${urlGateway}/item/${id}/set-genre`,
                {genre_id: values.genre},
                {headers: {"Authorization": `Bearer ${user.token}`}}
            )
            console.log(response)
            setLoading({...loading, button:false});
            if (response.data.message === "Genre already exist in this item") return message.warning(response.data.message)
            message.success("Add genre succesfull");
            setItem(null);
        } catch(err) {
            console.log(err);
        }
    }

    const handleDelete = async (genre_id)=> {
        try {
            await axios.delete(
                `${urlGateway}/item/${id}/set-genre`, {
                    headers: {"Authorization": `Bearer ${user.token}`},
                    data : {genre_id}
                }
            )
            message.success("Remove genre succesfull")
            setItem(null)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>        
            {loading.page ? 
            <Row justify="center" align="center">
                <Col span={24} style={{textAlign: 'center'}}><Spin /></Col>
            </Row> : 
            <></>}
            {item && 
            <>
            <Row style={{width:"100%", minWidth:"300px", margin:"0 auto"}} align='middle' justify="center">
                <Col span={8}>
                    <Divider orientation="left" >Item Info</Divider>
                    <Descriptions bordered column={1} style={{minWidth:"300px"}}>
                        <Descriptions.Item label="Title">{item.title}</Descriptions.Item>
                        <Descriptions.Item label="Author/Director">{item.creator}</Descriptions.Item>
                        <Descriptions.Item label="Category">{item.category}</Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left" plain> Add genre</Divider>
                    <Form 
                        form={form}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            minWidth:"300px"
                        }}
                        labelCol={{ span: 0, offset: 0 }}
                        wrapperCol={{ span: 20, offset: 0 }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="genre"
                            label=""
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select genre',
                                },
                            ]}
                        >
                            <Select placeholder="Select genre" style={{ minWidth: '250px' }}>
                                {genre.map((item) => {
                                    return (
                                        <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="btn btn-info h-1 min-h-[32px]"
                                loading={loading.button}
                                icon={<PlusOutlined />}
                                htmlType="submit" 
                                shape="circle"
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row style={{width:"100%", minWidth:"300px", margin:"0 auto"}} align='middle' justify="center"> 
                <Col span={8} >                    
                    <Divider orientation="left" plain>List genre of item</Divider>             
                    <Table dataSource={item.ItemGenre}                     
                        bordered
                        tableLayout="fixed"
                        style={{
                            width:"300px", 
                            minWidth:"300px",        
                            margin: "0 auto", /* center horizontally */
                            textAlign: "center"
                        }}
                        align="center"
                        pagination={{ 
                            pageSize: 10, 
                            hideOnSinglePage:true
                        }}
                    >
                        <Column title="Name" dataIndex="name" key="name" align="center" 
                            render={(_, record) => record.Genre.name}
                        />
                        <Column
                            title="Action"
                            key="action"
                            align="center"  
                            render={(_, record) => (
                                <Space size="small">
                                    <Popconfirm
                                        title="Delete the genre"
                                        description="Are you sure want delete this genre from item"
                                        onConfirm={() => handleDelete(record.genre_id)}
                                        onCancel={() => <></>}
                                        okText="Yes"
                                        cancelText="No"
                                    > 
                                        <Button
                                            className="btn h-1 min-h-[36px] bg-[red] hover:bg-[#FF5454] border"
                                            icon={<DeleteOutlined style={{color:"white"}}/>}
                                            danger
                                        />
                                    </Popconfirm>
                                
                                </Space>
                            )}
                        />
                    </Table>
                </Col>
            </Row>
            </>}
        </>
    )
}

export default ItemGenre