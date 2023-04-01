import {
    Button,
    Form,
    Input,
    message,
    Spin
} from 'antd';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { urlGateway } from '../../utils/url';


const GenreForm = () => {  
    const [form] = Form.useForm();
    const {id} = useParams();
    const [input, setInput] = useState(null);
    const [loading, setLoading] = useState({page: false, button: false});
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
   
   
    useEffect( () => {
        const fetchGenre = async ()=> {
            try {
                if (id) {
                    setLoading({...loading, page:true});
                    const response = await axios.get(`${urlGateway}/genre/${id}`)
                    setInput({name: response.data.name})
                    setLoading({...loading, page:false});
                } else {
                    setInput({name: ""})
                }               
            } catch(err) {
                console.log(err);
            }
        };
        fetchGenre();
    },[])

    const handleSubmit = async (values) => {
          try {
            setLoading({...loading, button:true})
            if (id) {
                const response = await axios.patch(
                  `${urlGateway}/genre/${id}`, 
                  values,
                  {headers: {"Authorization": `Bearer ${user.token}`}}
                )
                message.success("Update genre succesfull")
            } else {
                const response = await axios.post(
                  `${urlGateway}/genre`, 
                  values,
                  {headers: {"Authorization": `Bearer ${user.token}`}}
                )
                message.success("Add genre succesfull")
            }
            setLoading({...loading, button:false})
          } catch(err) {
            console.log(err)
          }
        setInput(null)
        navigate('/admin/genre')
    }


    return (
        <div style={{
            paddingTop: "20px",
            display:"flex", 
            height:"auto", 
            width:"100%", 
            alignItems:"center", 
            justifyContent:"center",
            backgroundColor: "white"
        }}
        className="content-layout">
            {input && 
            <Form
                {...formItemLayout}
                form={form}
                name="itemForm"
                onFinish={handleSubmit}
                style={{
                    maxWidth: 600,
                    minWidth: 230,
                    margin: "auto"
                }}
                initialValues={input ? { name: input.name } : {}}
                scrollToFirstError
            >
                <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                    required: true,
                    message: 'Please input name',
                    },
                ]}
                >
                <Input />
                </Form.Item>
        
                <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={loading.button}
                className="btn btn-info h-1 min-h-[32px] border-none">
                    Submit
                </Button>
                </Form.Item>
            </Form>}
            
            {loading.page ? <Spin /> : <></>}
        </div>

      );
}

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


export default GenreForm;