import Item from 'antd/es/list/Item';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { urlGateway } from '../../utils/url';

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null)
  const {id} = useParams();
  const [user] = useContext(UserContext);

  useEffect( () => {
    const fetchGenre = async ()=> {
        try {
            if (id) {
              if(userProfile === null){
                const response = await axios.get(`${urlGateway}/admin/user-profile/${id}`,{
                  headers:{
                    Authorization: "Bearer " + user.token
                  }
                })
                console.log(response.data.data)
                setUserProfile(response.data.data)
              }
            } else{
              setUserProfile(null)
            }          
        } catch(err) {
            console.log(err.response.data);
        }
    };
    fetchGenre();
},[userProfile])
  return (
    userProfile &&
    <>
    <h1 className="font-bold text-[1.2em]">User's Profile</h1><br />
    {userProfile.map((el) => {
      return(
        <>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{el.name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{el.address}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{el.phone}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{el.created_at}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Updated At</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{el.updated_at}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Image</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"><img style={{width:'400px'}} src={el.image_url} alt="default.jpg" /></dd>
              
            </div>
          </dl>
        </div>
          </div>
        </>
      )
    })}
    </>
  )
}

export default UserProfile