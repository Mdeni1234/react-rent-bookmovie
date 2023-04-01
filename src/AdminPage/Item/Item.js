import { DeleteOutlined, DownOutlined, EditOutlined, FileOutlined, PlusOutlined, PlusSquareFilled, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, message, Popconfirm, Popover, Space, Spin, Table, Tag, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { urlGateway } from "../../utils/url";



const Item = () => {
    const [allItem, setAllItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [user] = useContext(UserContext)
    const navigate = useNavigate();
    
    useEffect( () => {
        const fetchAllItem = async () => {
            setLoading(true);
            try {
                if (category === null) {
                    const response = await axios.get(`${urlGateway}/item`)
                    setAllItem(response.data);
                } else {
                    const response = await axios.get(`${urlGateway}/item-category/${category}`)
                    setAllItem(response.data);
                }
                setLoading(false);
            } catch(err) {
                console.log(err)
            }
        }
        if (allItem === null) {
            fetchAllItem();
        }
    }, [allItem, category])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${urlGateway}/item/${id}`,{headers: {"Authorization": `Bearer ${user.token}`}});
            message.success('Item succesfully deleted')
            setAllItem(null)
        } catch(err) {
            console.log(err)
        }
    }
    const selectCategory = [
        {
          label: "movie",
          key: '0',
          onClick: () =>  {setCategory("movie");setAllItem(null)}
        },
        {
          label: "book",
          key: '1',
          onClick: () =>  {setCategory("book");setAllItem(null)}
        },
        {
          label: "reset",
          key: '2',
          onClick: () =>  {setCategory(null);setAllItem(null)},
          danger: true
        }
      ];

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent:"center", backgroundColor: "white"}} className= "content-layout">  
            <div    
                style={{
                    width:"100%", 
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <h1 className="font-bold text-[1.2em] text-black">LIST ITEM</h1>
                <Dropdown
                    menu={{
                        items: selectCategory,
                    }}
                    style={{width:"100px"}}
                    trigger={['click']}
                >
                    <Button
                        icon={<DownOutlined />}
                    >
                        {category ? category : "Select category"}
                    </Button>
                </Dropdown>
                <Popover content={'Add new item'} trigger="hover" placement="topRight"  onClick={()=> navigate('form')}>
                    <Button type="primary" icon={<PlusOutlined/>} 
                    size="middle" 
                    className="btn btn-info h-1 min-h-[32px] border-none"
                    />
                </Popover>
            </div>
            {<Table 
                dataSource={allItem ? allItem : null}
                rowKey= {(record) => record.id}
                loading={loading}
                bordered
                rowClassName={()=> "custom-row"}
                expandable={{
                    expandedRowRender: (record) => (
                      <p
                        style={{
                          margin: 0,
                        }}
                      >
                        {record.description}
                      </p>
                    ),
                  }}
            >
                <Column title="Image" dataIndex="image_url" key="image_url" align="center" width="100px" 
                    render={(image, index) => <div key={index}><img src={image} height="100px"></img></div>}
                />
                <Column title="Title" dataIndex="title" key="title" align="center" width="100px" />
                <Column title="Category" dataIndex="category" key="category" align="center" width="100px" />
                <Column title="Author/ Director" dataIndex="creator" key="creator" align="center" width="100px" />
                <Column title="Price" dataIndex="price" key="price" align="center" width="100px" />
                <Column title="File" dataIndex="file_url" key="file_url" align="center"  width="100px" 
                    render={(file, index) => <div 
                        key={index}
                        style={{
                            maxWidth: "200px",
                            whiteSpace: "wrap",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxHeight: "calc(1em * 5)"
                        }}
                        >
                            {file ? 
                                <a
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}
                                onClick={() => window.open(`${file}`, '_blank')}
                                >
                                    <FileOutlined style={{fontSize:"24px"}}/>{file}
                                </a> :
                                <FileOutlined style={{fontSize:"24px"}}/>
                            }
                        </div>}
                />
                <Column
                    title="Genre"
                    dataIndex="itemGenre"
                    width="100px" 
                    key="itemGenre"
                    align="center"
                    render={(_, record, index) => {return <Space size="1" 
                        key={index}
                        >
                            <div                            
                                style={{
                                    maxWidth: "200px",
                                    whiteSpace: "wrap",
                                    wordBreak: "break-word",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    maxHeight: "calc(1em * 5)",
                                    overflowY: "auto"
                                }}
                            >
                                {record.ItemGenre.map((item,index) => { return (
                                <Tag color="blue" key={index}>
                                    {item.Genre.name}
                                </Tag>
                                )})}
                            </div>
                            <Tooltip placement="top" title={<div style={{color:"black"}}>Edit genre of this item</div>} color="white">
                                <Button
                                    className="btn btn-info h-1 min-h-[36px]"
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        navigate(`form/${record.id}/set-genre`)
                                    }}
                                />                            
                            </Tooltip>
                        </Space>
                        
                    }}                      
                />
                <Column
                    title="Action"
                    key="action"
                    align="center"  
                    width="100px" 
                    render={(_, record) => (
                        <Space size="small">
                            <Button
                                className="btn btn-info h-1 min-h-[36px]"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    navigate(`form/${record.id}`)
                                }}
                            />
                            <Popconfirm
                                placement="topRight"
                                title="Delete the item"
                                description="Are you sure to delete this item?"
                                onConfirm={() => handleDelete(record.id)}
                                onCancel={() => {<></>}}
                                okText={<p style={{color:"black"}}>Yes</p>}
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
            </Table>}
        </div>
        
    )
}

export default Item;