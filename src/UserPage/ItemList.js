import { Card, List } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGateway } from "../utils/url";


const ItemList = () => {
    const [allItem, setAllItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category] = useState(null);

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

    const data = [
        ['A', []], ['B', []], ['C', []], ['D', []], ['E', []], ['F', []], ['G', []],
        ['H', []], ['I', []], ['J', []], ['K', []], ['L', []], ['M', []], ['N', []],
        ['O', []], ['P', []], ['Q', []], ['R', []], ['S', []], ['T', []], ['U', []],
        ['V', []], ['W', []], ['X', []], ['Y', []], ['Z', []]
    ];
    let index = 0;
    let i=0
    
    if (allItem) {
        while (i < allItem.length) {
            if (allItem[i].title[0] === data[index][0]) {
                data[index][1].push({id: allItem[i].id, title: allItem[i].title, category: allItem[i].category});
                i++;
            }
            else {
                index++;
            }
        }
    }
    

    return (
        <>
        <div className="content-layout">
            <List
                size="small"
                loading={loading}
                grid={{
                    gutter: 0,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 4,
                    xxl: 4
                }}
                header={<div style={{fontWeight:"bold", fontSize:"1.3em", color: "white"}}>List Item</div>}
                // footer={<div>Footer</div>}
                dataSource={data}
                rowKey={(item) => item.id}
                renderItem={(item) => {
                    return( 
                        <List.Item style={{padding:"10px", marginTop:"10px", }}>
                            <Card title={item[0]} 
                                size="small"
                                headStyle={{backgroundColor:"#F7F7F7", width:"40px", textAlign:"center"}}
                                bodyStyle={{borderTop:"1px solid #eee"}}
                            >
                                {item[1].map(element => <Link to={`/item/${element.id}`} style={{margin:"0 0", display:"block"}}>
                                    {element.title} <span style={{fontSize:"0.8em", color:"#aaa"}}>({element.category})</span>
                                </Link>)}
                                {/* ppp */}
                            </Card>
                        </List.Item>
                    )
                }}
            />
            </div>
            <style>
                {`
                    :where(.css-dev-only-do-not-override-1km3mtt).ant-card-bordered {
                        border: none;
                    }
                `}
            </style>
        </> 
    )
}

export default ItemList;