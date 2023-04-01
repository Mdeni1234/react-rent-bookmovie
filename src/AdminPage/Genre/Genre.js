import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Popconfirm, Popover, Space, Spin, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";


const Genre = () => {
    const [allGenre, setAllGenre] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numberPage, setNumberPage] = useState(1);
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    
    
    useEffect( () => {
        const fetchAllGenre = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${urlGateway}/genre`)
                setAllGenre(response.data);
                setLoading(false);
            } catch(err) {
                console.log(err)
            }
        }
        if (allGenre === null) {
            fetchAllGenre();
        }
    }, [allGenre]);

    const handleDelete = async(id)=> {
        try {
            await axios.delete(`${urlGateway}/genre/${id}`,{headers: {"Authorization": `Bearer ${user.token}`}});
            message.success('Genre succesfully deleted')
            setAllGenre(null)
        } catch(err) {
            console.log(err)
        }
    }

    const cancel = (event) => {
        <></>
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: "white"}} className="content-layout">
        <div    
            style={{
                width:"500px", 
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <h1 className="font-bold text-[1.2em] text-black">LIST GENRE</h1>
            <Popover content={'Add new genre'} trigger="hover" placement="topRight" onClick={()=> navigate(`form`)}>
                <Button type="primary" icon={<PlusOutlined /> } size="middle" className="btn btn-info h-1 min-h-[32px] border-none"/>
            </Popover>
        </div>
        
        <Table dataSource={allGenre}
            loading={loading}
            style = {{
                width: "500px",
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
            <Column
                title="Action"
                key="action"
                align="center"  
                render={(_, record) => (
                    <Space size="small">
                        <Button
                            className="btn btn-info h-1 min-h-[32px]"
                            icon={<EditOutlined />}
                            onClick={() => {
                                navigate(`form/${record.id}`)
                            }}
                        />
                        <Popconfirm
                            title="Delete the genre"
                            description="Are you sure to delete this genre?"
                            onConfirm={() => handleDelete(record.id)}
                            onCancel={cancel}
                            okText={<p style={{color:"black"}}>Yes</p>}
                            cancelText="No"
                        > 
                            <Button
                                className="btn h-1 min-h-[32px] bg-[red] hover:bg-[#FF5454] border"
                                icon={<DeleteOutlined style={{color:"white"}}/>}
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

export default Genre;