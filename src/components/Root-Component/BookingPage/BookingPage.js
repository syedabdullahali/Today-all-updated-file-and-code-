import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './BookingPage.css'
import {IoManSharp} from 'react-icons/io5'
import {FaChild} from 'react-icons/fa'
import { CCard, CRow,CCol } from '@coreui/react'
const BookingPage = () => {

    const {id} = useParams()

    const [bookingData,setBookingData] = useState('')
    const [value1,setVal1] = useState(false)
    const [value2,setVal2] = useState(false)
    const [summaryData,setSummaryData] = useState([])


    
    const getHotelData = async ()=>{

      const response =   await fetch(`https://allapiresort-w3ql.vercel.app/hotelbook/${id}`,{method: "GET"})      
      setBookingData(await response.json())
      } 
       
      useEffect(()=>{
      getHotelData()
      },[])

   
    

  return (
      <main className='BokingPage'>
        {bookingData && <div  className='middale-parent'>
        <div className='booking-banner'>
            <h2>Enjoy Your Dream Vacation</h2>
            
        </div> 
        <div>
         <h2 className='booking-b'>{bookingData?.title}</h2>
        </div>

        <div className='booking-card-withS'>
        <div className='booking-card'>

          {bookingData?.availableroom?.map((el)=>
           <div className='booking-room-card'>

           <div className='img-parent'>
              <img src={el?.imgurl}>
              </img>
              <div className='type-of-room'>
                 <h6>({el.title2})</h6>
              </div>
        
           </div>
           
           <div className='card-content'>
              <div>
              <h5>{el.title2} </h5>
              </div>
              <div>

                <div> 
                <span><p>Room Capacity</p> </span>
                  <p className='adultp' > <span className='adult'> <IoManSharp/> </span>{el.roomcapacity.max}</p>
                  <p className='childp'><span className='child'> <FaChild/> </span>{el.roomcapacity.min}</p> 
                </div>

                <div className='perRoom-book'>
                    <div  >
                     <p>Room Rates Exclusive of Tax</p>
                     <div className='checkbox-container'>

                     <button className='add-room' onClick={()=>setSummaryData(val=>{
                      const obj = {...el}
                      delete obj.perRoomPerWithBreakFast
                      val.push(obj)
                      val.push()
                      return [...val]
                     })}  >Add Room</button> 

                      </div>    
                     </div>   
                    <div className='roomonly'>
                     <h6>ROOM ONLY Rs {el.perRoom}</h6>
                     <p>Per Room Per Night</p>
                    </div>         
                </div>
                <div className='perRoom-book'>
                    <div  >
                     <p>Room Rates Exclusive of Tax</p>
                     <div className='checkbox-container'>
                     <button className='add-room' onClick={()=>setSummaryData(val=>{
                      const obj = {...el}
                      delete obj.perRoom
                      val.push(obj)
                      return [...val]
                     })}  >Add Room</button>         
                     </div>   
                     </div>   
                    <div className='roomonly'>
                     <h6>ROOM & BREAKFAST Rs {el.perRoomPerWithBreakFast}</h6>
                     <p>Per Room Per Night</p>
                    </div>         
                </div>
              </div>          
           </div>           
      </div>          
)}

       

        </div>
        <div className='card-suummary'>
            <div className='booking'>
                Booking Summary 
            </div>

            <div className='summary px-4 py-2 '>
              {/* <div className='date'> Dates 2023-03-30 - 2023-04-0</div> */}
              {/* <div className='night'>Nights 2</div> */}

              {summaryData.map((el)=>
               <CCard className='my-2'>
                <CRow>
                  <CCol className='p-2'>
                      <h6>{el.title2}</h6>
                      <h6>{el?.perRoomPerWithBreakFast?'(Room With Break Fast)':'(Only Room)'}</h6>
                    </CCol> 
                </CRow>         
                <CRow>
                <CCol><h5>Rs {el?.perRoomPerWithBreakFast||el?.perRoom}</h5></CCol>                   
                </CRow>           
               </CCard>        
              )}
               {summaryData[0]&&<CCard className='my-2 p-4 bg-dark text-white'>
                  <h6>Total Rs {summaryData.reduce((crr,el,i)=>{
                       if(el.perRoomPerWithBreakFast){
                        crr+=+el.perRoomPerWithBreakFast  
                       }
                       if(el.perRoom){
                        crr+=+el.perRoom  
                       }
                       return crr
                    },0)}</h6>  
               </CCard>}
              
            </div>

        </div>
        </div>
        </div>}
    </main>
  )
}

export default BookingPage
