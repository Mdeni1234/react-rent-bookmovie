import { Button, message, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, FileSearchOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";
import { useNavigate } from "react-router-dom";

const User = () => {
    const [allUser, setAllUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numberPage, setNumberPage] = useState(1);
    const [user] = useContext(UserContext)

    const navigate = useNavigate()

    useEffect( () => {
        const fetchAllUser = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${urlGateway}/admin/user`,{
                    headers:{
                        Authorization: "Bearer " + user.token
                    }
                })
                const hasil = response.data.data
                const hasilFilter = hasil.filter((item)=>{
                    return item.role === 'user'
                })
                setAllUser(hasilFilter)
                setLoading(false)
            } catch(err) {
                console.log(err)
            }
        }
        if(allUser === null){
            fetchAllUser();
        }
    },[allUser])
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${urlGateway}/admin/user/${id}`,{headers: {"Authorization": `Bearer ${user.token}`}});
            message.success('Item succesfully deleted')
            setAllUser(null)
        } catch(err) {
            console.log(err)
        }
    }
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
            <h1 className="font-bold text-[1.2em]">LIST USER</h1>
        </div>
        
        <Table dataSource={allUser}
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
            <Column title="Name" dataIndex="name" key="name" align="center" />
            <Column title="Email" dataIndex="email" key="name" align="center" />
            <Column title="Role" dataIndex="role" key="name" align="center" />
            <Column
                title="Action"
                key="action"
                align="center"  
                render={(_, record) => (
                    <Space size="small">
                         <Button
                            className="btn btn-info h-1 min-h-[32px]"
                            icon={<FileSearchOutlined />}
                            onClick={() => {
                                navigate(`/admin/user-profile/${record.id}`)
                                console.log(record.id)
                            }}
                        />
                        <Popconfirm
                            title="Delete the genre"
                            description="Are you sure to delete this genre?"
                            onConfirm={() => handleDelete(record.id)}
                            onCancel={() => {<></>}}
                            okText={<p style={{color:"black"}}>Yes</p>}
                            cancelText="No"
                        > 
                            <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                danger
                            />
                        </Popconfirm>
                       
                    </Space>
                )}
            />
        </Table>
        </div>
    )
}

export default User;