import React from 'react'
import { Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";
import { CheckCircleOutlined, FieldTimeOutlined } from '@ant-design/icons';

function ListPayment() {

    const [allPayment, setAllPayment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numberPage, setNumberPage] = useState(1);
    const [user] = useContext(UserContext)

    useEffect( () => {
        const fetchAllPayment = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${urlGateway}/admin/payment`,{
                    headers:{
                        Authorization: "Bearer " + user.token
                    }
                })
                const hasil = response.data.data
                console.log(hasil)
                setAllPayment(hasil)
                setLoading(false)
            } catch(err) {
                console.log(err)
            }
        }
        if(allPayment === null){
            fetchAllPayment();
        }
    },[allPayment])

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: "white"}} className="content-layout">
        <div    
            style={{
                width:"1000px", 
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <h1 className="font-bold text-[1.2em]">LIST PAYMENT</h1>
        </div>
        
        <Table dataSource={allPayment}
            loading={loading}
            style = {{
                width: "1000px",
                minWidth: "380px",
                margin: "0 auto",
            }}
            pagination={{ pageSize: 10 }}
            tableLayout="fixed"
            onChange={(pagination) => setNumberPage(pagination.current)}
        >
            <Column title="No." key="number" align="center" width="100px"
                render={(_,record, index) => (10 * (numberPage - 1) + index + 1)}
            />
            <Column title="Email" dataIndex="email" key="name" align="center" 
            render={(_, record, index) => {return <Space size="1" 
            key={index}
            >
                <div                             
                >
                    <p color="blue" key={index}>
                        {record.Rental.User.email}
                    </p> 
                </div>
            </Space>
        }} />
            <Column title="Order Id" dataIndex="order_id" key="name" align="center" />
            <Column title="Item" key="name" align="center"
            render={(_, record, index) => {return <Space size="1" 
            key={index}
            >
                <div                             
                >
                    {record.Rental.ItemRental.map((item,index) => { return (
                        <Tag color="blue" key={index}>
                        {item.Item.title}
                        </Tag>
                    )})}
                </div>
            </Space>
        }}   />
        <Column title="Status Payment" dataIndex="email" key="name" align="center" 
            render={(_, record, index) => {return <Space size="1" 
            key={index}
            >
                <div                             
                >
                    <p color="blue" key={index} style={{color:'green', fontSize:'25px'}}>
                        {record.status === true ? <CheckCircleOutlined /> : <FieldTimeOutlined />}
                    </p> 
                </div>
            </Space>
        }} />
            <Column title="Created At" dataIndex="created_at" key="name" align="center" />
            
        </Table>
        </div>
  )
}

export default ListPayment