import './OurProperties.css'
import React, { useEffect } from 'react'
import {AiOutlineDown,AiOutlineUp} from 'react-icons/ai'
import {RiHotelLine} from 'react-icons/ri'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {CButton,CCol,CModal,CModalHeader,
  CModalTitle,CModalBody,CModalFooter,CFormInput,CRow,
   CFormTextarea,CFormCheck,CCard,CCardHeader, CCardBody,
   CImage,
   CContainer
  } from '@coreui/react'
import { storage } from '../../firebase'
import { getDownloadURL, ref,uploadBytesResumable } from 'firebase/storage'


const PropertiesForm = React.lazy(()=>import('./PropertiesForm'))
const AddMoreRoomForm = React.lazy(()=>import('./AddMoreRoomForm'))




const OurProperties = () => {

  const [showList,setList] =  useState(false)
  const [selectedValue,setSelectedVal] = useState(['Select Hotel to Book',0])
  const [ourPropertiesData,setOurPropertiesData] = useState([])
  const [showRoomForm,setRoomForm] = useState(false)
  const [roomData,setRoomData] = useState({})
 

 const getPropertiesData = async  ()=>{
const response = await fetch(`https://allapiresort-w3ql.vercel.app/hotelbook`,{headers:{
  method:'GET'
}})
const data = await response.json()
setOurPropertiesData(data)
setSelectedVal([data[0].title,data[0]._id])
}

 useEffect(()=>{
    getPropertiesData()
 },[])


  function deleteResost(id){
    fetch(`https://allapiresort-w3ql.vercel.app/hotelbook/${id}`, {
      method: "DELETE",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
    }).then((resp) => {
      resp.json().then(() => {
          alert("successfully submitted")
          getPropertiesData()
      }).catch((error)=>{
        console.log(error)
      })
    })
}
 
  return (
    <main className='our-properties-main'>

       <div className='quba-goa-search'>
        <div className='banner'>
            <h2>The Cuba Goa Properties</h2>
        <h6 style={{margin:'20px 0'}}>BEACH HUTS, BUNGALOWS & RESORTS</h6>

        </div>

      <div className='properties-to-book'>

        <div className='select-menu'>

           <div className='select-btn' onClick={()=>setList((val)=>!val)}>
                 <span>{selectedValue[0]}</span>
                {showList?<AiOutlineDown/>:<AiOutlineUp/>}
           </div>

          {showList&& <ul className='options'>
             {ourPropertiesData.map((el)=>
               <li className='option' onClick={()=>setSelectedVal(()=>{
                setList((val)=>!val)
                return [el.title,el._id]
               })}>
               <li><RiHotelLine/></li>
               <span className='option-text'>{el.title}</span>
              </li>
             )}
           </ul>}
        </div>

        {selectedValue[0]!=='Select Hotel to Book'&&<Link className='book-button' to={
          selectedValue[0].toLocaleLowerCase().split(' ').join('-')+"/"+selectedValue[1]} >
          Book Now</Link>}


      </div>
      <PropertiesForm  getPropertiesData={getPropertiesData}/>
      <AddMoreRoomForm getPropertiesData={getPropertiesData}
                       showRoomForm={showRoomForm} 
                       roomData={roomData}
                       setRoomForm={setRoomForm} 
                       />
         
         
    <div className='about-hotel'>
        {ourPropertiesData.filter((el)=>el.title===selectedValue[0]).map((el)=>
        <>
        <div className='goa-properties'>
            <div className='img-container-1'>
               <CImage rounded thumbnail  width={2000} height={2000} src={el.imgurl} alt="" />
            </div>
            <div className='our-properties-content'>
                <h2>{el.title}</h2>
                 <p>{el.content}</p>                              
            </div>
          
        </div>
          <div className='goa-properties-add-room'>
          <CButton color='primary' className='me-2' onClick={()=>{
            setRoomForm(true)
            setRoomData(el)
          }}>ADD MORE ROOMS</CButton>
          <CButton color='danger' onClick={()=>deleteResost(el._id)}>Delete resort</CButton>

      </div>
      </>
        )}   


      {ourPropertiesData[0]&& <div className='overview-of-rooms'> 
         <div className='room-title'><h2> {ourPropertiesData.find((el)=>el.title===selectedValue[0])?.title+" ROOMS"}</h2></div>
      {ourPropertiesData.find((el)=>el.title===selectedValue[0]).availableroom?.map((el)=>
      
       <CCard className='room-overview'>
          <div  className='first-content' style={{maxHeight:'auto'}}>
            <h4>{el.title2}</h4>
           <div className='img-parent-10'>
              <img src={el.imgurl} />
              <div className='show-more-room-image'>+2 Photos</div>
            </div>  

          </div>

          <div className='room-overview-info'> 

          </div>
       </CCard>
       )}
       </div>} 

   </div>

  </div>

  
  

        
    </main>
  )
}

export default OurProperties
