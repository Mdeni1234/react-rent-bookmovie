import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Select,
    Spin,
    Upload,
} from 'antd';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { urlGateway } from '../../utils/url';


const ItemForm = () => {  
    const [form] = Form.useForm();
    const {id} = useParams();
    const [input, setInput] = useState(null);
    const [loading, setLoading] = useState({page:false, button: false});
    const [user] = useContext(UserContext)
    const navigate = useNavigate();

    
    useEffect( () => {
      const fetchGenre = async ()=> {
          try {
              if (id) {
                  setLoading({...loading, page:true});
                  const response = await axios.get(`${urlGateway}/item/${id}`)
                  setInput(response.data)
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
      console.log(values)
      try {
        setLoading({...loading, button: true});
        if (id) {
          const response = await axios.patch(
            `${urlGateway}/item/${id}`, 
            values,
            {headers: {"Authorization": `Bearer ${user.token}`}}
          )
          message.success("Update item succesfull")
        } else {
          const response = await axios.post(
            `${urlGateway}/item`, 
            values,
            {headers: {"Authorization": `Bearer ${user.token}`}}
          )
          message.success("Add item succesfull")
        }
        setLoading({...loading, button: false});
      } catch(err) {
        console.log(err)
      }
      setInput(null)
      navigate('/admin/item')
    }


    return (
        <div style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white"
        }} className="content-layout">
        {loading.page ? <Spin style={{marginTop:"40px"}} size="large" /> : <></>}
        {input && 
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:"center"
          }}>
            <h1 className="mb-4 font-bold text-[1.5em] text-black">{id ? "Edit item" : "Add item"}</h1>
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
              initialValues={
                input
              }
              scrollToFirstError
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: 'Please input title',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: 'Please select category of item!',
                  },
                ]}
              >
                <Select options={category} />
              </Form.Item>
        
              <Form.Item
                name="creator"
                label="Author / Director"
                rules={[
                  {
                    required: true,
                    message: 'Please input the author / director!',
                  }
                ]}
              >
                <Input />
              </Form.Item>
        
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please input Description',
                  },
                ]}
              >
                <Input.TextArea showCount />
              </Form.Item>
        
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input price!',
                  },
                ]}
              >
                <InputNumber style={{ width: '100%' }} min={1} prefix="Rp."/>
              </Form.Item>
        
              <Form.Item
                name="image_url"
                label="Image URL"
                rules={[
                  {
                    required: false,
                    message: 'Please input image',
                    type: "url"
                  },
                ]}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="file_url"
                label="File URL"
                rules={[
                  {
                    required: false,
                    message: 'Please input file',
                    type: "url"
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
            </Form>
          </div>}

        </div>
    )
}

const category = [
  {
      value: 'book',
      label: 'Book',
  }, 
  {
      value: 'movie',
      label: 'Movie',
    }
]

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
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


export default ItemForm;