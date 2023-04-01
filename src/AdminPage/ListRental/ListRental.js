import { Button, Space, Table, Tag, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";

const ListRental = () => {
    const [allRental, setAllRental] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numberPage, setNumberPage] = useState(1);
    const [user] = useContext(UserContext)

    useEffect( () => {
        const fetchAllRental = async () => {
            setLoading(true)
            try {
                const responseRental = await axios.get(`${urlGateway}/admin/rental`,{
                    headers:{
                        Authorization: "Bearer " + user.token
                    }
                })
                const dataRental = responseRental.data.data
                setAllRental(dataRental)
                setLoading(false)
            } catch(err) {
                console.log(err)
            }
        }
        if(allRental === null){
            fetchAllRental();
        }
    },[allRental])

    console.log(allRental)
    
    return (
        allRental && 
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
            <h1 className="font-bold text-[1.2em]">LIST RENTAL</h1>
        </div>
        
        <Table dataSource={allRental}
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
            <Column title="Rental Id" dataIndex="id" key="name" align="center" />
            <Column title="Rental Date" dataIndex="rental_date" key="name" align="center" />
            <Column title="Return Date" dataIndex="return_date" key="name" align="center" />
            <Column title="User Email" key="name" align="center"
            render={(_, record, index) => {return <Space size="1" 
            key={index}
            >
                <div                             
                >
                    <p color="blue" key={index}>
                        {record.User.email}
                    </p> 
                </div>
            </Space>
        }}   />
        <Column title="Item" key="name" align="center"
            render={(_, record, index) => {return <Space size="1" 
            key={index}
            >
                <div                             
                >
                    {record.ItemRental.map((item,index) => { return (
                        <Tag color="blue" key={index}>
                        {item.Item.title}
                        </Tag>
                    )})}
                </div>
            </Space>
        }}   />
            <Column title="Created At" dataIndex="created_at" key="name" align="center" />
        </Table>
        </div>
    )
}

export default ListRental;