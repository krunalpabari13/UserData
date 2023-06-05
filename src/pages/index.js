import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LoadingBar from 'react-top-loading-bar'
const inter = Inter({ subsets: ['latin'] })
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

  
    
const UserList=(props)=>{
  const handleError=(e)=>{
    console.log("error")
    e.target.src="download.png"
  } 

  
  return(
    <>{
    props.user.map((users)=>(
      
    <div className='box pt-2 ps-3' key={users.id} onClick={()=>props.setUser(users)}>
     <img src={users.avatar} alt=''  className='rounded-circle me-5' onError={handleError} id='image' style={{height:'4rem'}}></img>
      {users.profile.firstName+" "}{users.profile.lastName}
      </div>
    ))
    }
    </>
  )
}

const UserDetails=(props)=>{
  const handleError=(e)=>{
    e.target.src='download.png'

  }
  return(
    <>
    {
      <div className='position-fixed'>
        {props.selectedUser ? 
        ( <div>
         <div className=' rounded mt-5 imagebackground'> 
            <div className='container Username text-white text-center' style={{fontWeight:500,fontSize:'3rem'}}>
              @{props.selectedUser.profile.username}
            </div>
            <div className='Userimg'>
          <div className='outer-circle rounded-circle ms-auto me-auto  position-relative'>

        <img src={props.selectedUser.avatar} className='rounded-circle position-absolute '  onError={handleError}  style={{height:'9rem',top:'14%',left:'15.5%'}}></img>
            <div className='position-absolute' style={{right:0,bottom:0}}>
          <img src='pencil.png' className='position-absolute mt-2 ms-2' style={{height:'2.4rem',width:'2.4rem'}}></img>
            <button className='rounded-circle btn editbtn'  ></button>
            </div>

          </div>
          </div>
        </div>

        {/* // UserDetails */}
            <div className='container mt-5 pt-5'>
              <div className='container mt-5 pt-5'>
              <div className='row'>
              <div className='col-5'>
                <div className='  '>
                  <button className='position-relative' style={{ border: "none",
              outline: "none",
              fontSize: "1.5rem",
              fontWeight: 500,
              background:'black',
              color:'white',
              width:'20rem',              
              borderBottom:'1px solid white'}}>
                <img src='user.png' className='position-absolute ' style={{height:'2.5rem'}}></img>
                <input type='text' style={{background:'black',outline:'none',color:'white',border:'none',width:'inherit'}} className='text-center' value={`${props.selectedUser.profile.firstName} ${props.selectedUser.profile.lastName}`} ></input>
              </button>
              </div>
              </div>

              <div className=' ms-2 col-6'>
                <div className='  '>
                  <button className='position-relative' style={{ border: "none",
              outline: "none",
              fontSize: "1.5rem",
              fontWeight: 500,
              background:'black',
              color:'white',
              width:'29rem',              
              borderBottom:'1px solid white'}}>
                <img src='mail.png' className='position-absolute ' style={{height:'2.5rem'}}></img>
                <input type='text' style={{background:'black',outline:'none',color:'white',border:'none',width:'inherit'}} className='text-center' value={`${props.selectedUser.profile.email}`} ></input>
              </button>
              </div>
              </div>

              </div>


              <div className='col-12 mt-5'>
                <div className='  '>
                  <button className='position-relative' style={{ border: "none",
              outline: "none",
              fontSize: "1.5rem",
              fontWeight: 400,
              background:'black',
              color:'white',
              width:'100%',              
              borderBottom:'1px solid white'}}>
                <img src='bio.png' className='position-absolute ' style={{height:'2.5rem'}}></img>
                <input type='text' style={{background:'black',outline:'none',color:'white',border:'none',width:'inherit'}} className='text-center ms-5' value={`${props.selectedUser.Bio}`} ></input>
              </button>
              </div>
              </div>

              <div className='col-12 mt-5'>
                <div className='  '>
                  <button className='position-relative' style={{ border: "none",
              outline: "none",
              fontSize: "1.5rem",
              fontWeight: 500,
              background:'black',
              color:'white',
              width:'100%',              
              borderBottom:'1px solid white'}}>
                <img src='job.png' className='position-absolute ' style={{height:'2.5rem'}}></img>
                <input type='text' style={{background:'black',outline:'none',color:'white',border:'none',width:'inherit'}} className='text-center' value={`${props.selectedUser.jobTitle}`} ></input>
              </button>
              </div>
              </div>
                </div>
            </div>
          </div>

        ) : 
        
        (<div className='container text-center' >
        <div className='  mt-5 ' style={{color:'GrayText',fontWeight:700,fontWeight:'bold',fontSize:'3rem'}}>
          Please Select The User For Details
        </div>
        </div>) }
      </div>
    }
    </>
  )
}


// export async function getServerSideProps() {
// let data=null;

// try{
// data= await axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users");
  
// }
// catch(error)
// {
//   console.log(error);

// }
// return { props: { 
//    "data": data.data
//  } };

// }


export default function Home(props) {
  const [users,setUsers]=useState(null);
  const [selectedUser,setUser]=useState(null);
  const[progress,setProgress]=useState(10);
  const router=useRouter();
  const fetchdata=async ()=>{
    let data=null;

    try{
    data= await axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users");
     setProgress(50) 
    }
    catch(error)
    {
      console.log(error);
      setProgress(100)
    
    } 
    setProgress(80);
   data && setUsers(data.data);
     setProgress(100);
  }
  useEffect(()=>{

    fetchdata();
  },[])
  return (
    <>
    <LoadingBar
    color='#f11946'
    progress={progress}
    height='5px'
    />
    {users ? (<div className='container ' id='maindiv'>
      <div className='row mt-4'>
        <div className='col-6 '>
        <div className='container'>
          <UserList user={users} setUser={setUser} setProgress={setProgress}></UserList>
         </div>
       </div>

       <div className='col-6'>
        <div className='container'> 

      <UserDetails selectedUser={selectedUser} setProgress={setProgress}></UserDetails>
        </div>
       </div>
       </div>
    </div>):(
    progress==100 && <div className='text-white text-center' style={{fontWeight:500,fontSize:'3rem'}}>
      No Data Found
    </div>)}
    </>
  )
}
