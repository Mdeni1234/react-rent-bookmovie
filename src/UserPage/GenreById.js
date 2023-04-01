import { useParams, Link } from "react-router-dom";
import { Col, Image, Pagination, Row, Space, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { urlGateway } from "../utils/url";


const GenreById = () => {
    const {id} = useParams();
    const [genreItem, setGenreItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect( () => {
        const fetchGenreItem = async () => {
            setLoading(true);
            try {                
                const response = await axios.get(`${urlGateway}/genre/${id}`)
                setGenreItem(response.data);
                setLoading(false);
            } catch(err) {
                console.log(err)
            }
        }
        if (genreItem === null) {
            fetchGenreItem();
        }
    }, [genreItem, category])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let slicedItems;
    const itemsPerPage = 12;
    if (genreItem) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        slicedItems = genreItem.ItemGenre.slice(startIndex, endIndex);
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
    console.log(genreItem)

    return (
        genreItem ?
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', justifyContent:"center", }} >
            <div    
                style={{
                    width:"100%", 
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "330px"
                }}
                className="header"
            >
                <h1 style={{fontSize:"1.5em"}}>
                    {genreItem.name}
                </h1>
            </div>
            
            <Row gutter={[10,10]} 
                align="center"
                justify="center"
                style={{
                    maxWidth: "1200px",
                    marginTop: '0', marginRight: 'auto', marginBottom: '0', marginLeft: 'auto'
                }}
            >  
                {genreItem.ItemGenre.length > 0 ?
                slicedItems.map(item => {
                    return (
                        <Col className="gutter-row" >
                            <div style={{...style}}>
                                <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"1em", width:"90px", marginTop:"10px"}}>
                                    <Image
                                        width={90}
                                        height={140}
                                        style={{objectFit:"contain"}}
                                        src={`${item.Item.image_url}`}
                                        alt="Item's image"
                                        fallback="https://scalebranding.com/wp-content/uploads/2021/09/movie-book-logo.jpg"
                                    />
                                    <Space direction="vertical" size={1} style={{border:"1px solid #999", borderRadius:"5px", padding: "2px 5px", width:"90px"}}>
                                        <p style={{margin:0, fontSize:"0.9em"}}>
                                            Price:
                                        </p>
                                        <p style={{margin:0, fontSize:"0.8em"}}>
                                            {`${new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(item.Item.price)}`}
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
                                    <Link to={`/item/${item.Item.id}`} className="title" >
                                        {item.Item.title}
                                    </Link>
                                    <h2 style={{margin:"5px 0 0 0", fontSize:"1.1em", color:"#999"}}>
                                        {item.Item.creator}
                                    </h2>
                                    <h3 style={{margin:0, fontSize:"1em", color:"#999"}}>
                                        {item.Item.category}
                                    </h3>
                                    <p className="description">
                                        {item.Item.description}
                                    </p>
                                </div>
                            </div>
                        </Col>       
                    )
                }) :
                <p>This genre has no item</p>}
            </Row>
            {genreItem &&
            <Pagination
                total={genreItem.length}
                pageSize={itemsPerPage}
                current={currentPage}
                onChange={handlePageChange}
                showTotal={(total, range) => console.log(total, range)}
                hideOnSinglePage={true}
            />}
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
        </div> :
        <div style={{display: 'flex', height:"100px", justifyContent:"center", alignItems:"center" }} >
            <Spin />
        </div>
    )

}

export default GenreById;