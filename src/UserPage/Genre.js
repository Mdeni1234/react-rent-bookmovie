import { Card, List } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGateway } from "../utils/url";


const GenrePublic = () => {
    const [allGenre, setAllGenre] = useState(null);
    const [loading, setLoading] = useState(false);
    
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

    const data = [
        ['A', []], ['B', []], ['C', []], ['D', []], ['E', []], ['F', []], ['G', []],
        ['H', []], ['I', []], ['J', []], ['K', []], ['L', []], ['M', []], ['N', []],
        ['O', []], ['P', []], ['Q', []], ['R', []], ['S', []], ['T', []], ['U', []],
        ['V', []], ['W', []], ['X', []], ['Y', []], ['Z', []]
    ];
    let index = 0;
    let i=0
    if (allGenre) {
        while (i < allGenre.length) {
            if (allGenre[i].name[0] === data[index][0]) {
                data[index][1].push({id: allGenre[i].id, name: allGenre[i].name});
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
            header={<div style={{fontWeight:"bold", fontSize:"1.3em"}}>List Genre</div>}
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
                            {item[1].map((element,index) => <Link to={`${element.id}`} key={index}><p style={{margin:"0 0"}} >{element.name}</p></Link>)}
                            {/* ppp */}
                        </Card>
                    </List.Item>
                )
            }}
        />
        <style>
            {`
                :where(.css-dev-only-do-not-override-1km3mtt).ant-card-bordered {
                    border: none;
                }
            `}
        </style>
        </div>
        </>
    )
}

export default GenrePublic;