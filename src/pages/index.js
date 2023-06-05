import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })
import axios from 'axios'
import { useState } from 'react'

const UserList=(props)=>{
  return(
    <>{
    props.user.map((users)=>(
      
    <div className='box pt-2 ps-3' >
     {users.avatar!==undefined ? (<img src={users.avatar} alt='' className='rounded-circle me-5' style={{height:'4rem'}}></img>):
       (<img src='download.png' alt='' className='rounded-circle me-5 ' style={{height:'4rem'}}></img>)

    }
      {users.profile.firstName+" "}{users.profile.lastName}
      </div>
    ))
    }
    </>
  )
}

export async function getServerSideProps() {
let data=null;
try{
data= await axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users");

}
catch(error)
{
  console.log(error);

}  
return { props: { 
   "data": data.data
 } };
}


export default function Home(props) {
    const [users,setUsers]=useState(props.data);
    const [selectedUser,setUser]=useState(null);
  return (
    <>
    <div className='container ' id='maindiv'>
      <div className='row mt-4'>
        <div className='col-6 '>
        <div className='container'>
          <UserList user={users}></UserList>
         </div>
       </div>

       <div className='col-6'>
        <div className='container'>

        </div>
       </div>
       </div>
    </div>
    </>
  )
}
