import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Image, Pagination, Row, Space } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { urlGateway } from "../utils/url";
import BannerProduct from '../pictbanner.jpg'


const ItemPublic = () => {
    const [allItem, setAllItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let slicedItems
    const itemsPerPage = 12;
    if (allItem) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        slicedItems = allItem.slice(startIndex, endIndex);
    }

    const style = {
        padding: '8px 0',
        textAlign: 'center',
        width: '330px',
        height: '300px',
        margin: '0 auto',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        border: "1px solid #eee",
        boxShadow: '5px 5px 8px  #888888',
        borderRadius: "10px"
    };
    
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
        <>        
        <div className="banner">
            <Image preview={false} src={BannerProduct}></Image>
            <h1 style={{marginLeft: "50px"}} className="caption font-semibold underline font-mono" >ITEMS</h1>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent:"center", }} className="content-layout">
            <div    
                style={{
                    width:"100%", 
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
                className="header"
                
            >
                <h1 className="blank" style={{flexBasis:"150px"}}
                ></h1> 
                <h1 style={{fontSize:"1.5em"}}>{category? category[0].toUpperCase()+category.slice(1,) : "Books or Movies"}</h1>
                <Dropdown
                        menu={{
                            items: selectCategory,
                        }}
                        style={{ flexBasis:"200px"}}
                        trigger={['click']}
                    >
                        <Button
                            style={{width:"150px", color: "lightgrey"}}
                            icon={<DownOutlined />}
                        >
                            {category ? category : "Select category"}
                        </Button>
                </Dropdown>
            </div>
            <Row gutter={[10,10]} 
                align="center"
                justify="center"
                style={{
                    maxWidth: "1200px",
                    marginTop: '0', marginRight: 'auto', marginBottom: '0', marginLeft: 'auto'
                }}
            >  
                {loading ? <LoadingOutlined style={{fontSize:"24px"}}/>: <></>}
                {allItem && slicedItems.map(item => {
                    return (
                        <Col className="gutter-row" >
                            <div style={{...style}}>
                                <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1em", width:"90px", marginTop:"10px"}}>
                                    <Image
                                        width={90}
                                        height={140}
                                        style={{objectFit:"contain"}}
                                        src={`${item.image_url}`}
                                        alt="Item's image"
                                        fallback="https://scalebranding.com/wp-content/uploads/2021/09/movie-book-logo.jpg"
                                    />
                                    <Space direction="vertical" size={1} style={{border:"1px solid #999", borderRadius:"5px", padding: "2px 5px", width:"90px"}}>
                                        <p style={{margin:0, fontSize:"0.9em"}}>
                                            Price:
                                        </p>
                                        <p style={{margin:0, fontSize:"0.8em"}}>
                                            {`${new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(item.price)}`}
                                        </p>
                                    </Space>
                                </div>
                                <div 
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        width:"200px",
                                        height: "100%"
                                    }}
                                >
                                    <Link to={`/item/${item.id}`} className="title" >
                                        {item.title}
                                    </Link>
                                    <h2 style={{margin:"5px 0 0 0", fontSize:"1.1em", color:"#999"}}>
                                        {item.creator}
                                    </h2>
                                    <h3 style={{margin:0, fontSize:"1em", color:"#999"}}>
                                        {item.category}
                                    </h3>
                                    <p className="description">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </Col>       
                    )
                })}  
            </Row>    
            {allItem &&
            <Pagination
                total={allItem.length}
                pageSize={itemsPerPage}
                current={currentPage}
                onChange={handlePageChange}
                showTotal={(total, range) => console.log(total, range)}
                hideOnSinglePage={true}
            />
            }
            <style>
                {`
                    .description  {
                        text-indent: 2em;
                        margin: 10px 10px;
                        text-align: justify;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 8;
                        -webkit-box-orient: vertical;
                    }
                    .title {
                        margin:0; 
                        font-size:1.5em;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    @media screen and (max-width: 850px) {
                        .header {
                            flex-direction: column;
                            justify-content: center;
                        }
                        .blank {
                            display:none;
                        }
                    }
                `}
            </style>
            </div>
            </>

    )
}

export default ItemPublic;