import './Resorts.css'
import { useEffect, useState, } from 'react'
import beachResort2 from '../../../assets/resort.mp4'
import { CImage } from '@coreui/react'

import cubapatnam from '../../../assets/CUBA_PATNEM_BEACH_BUNGALOWS.jpg'
import cubpatnam from '../../../assets/PALOLEM_BEACH_RESORT.jpg'




const Resorts = () => {

    const [hover,setHover] = useState(false)
    const [resortData,setResortData] = useState([])

 function hoverOverImg (e){
    setHover(true)
 }
 function hoverOverNotImg (){
    setHover(false)
 }

const getHotelData  = async  ()=>{
 const response = await  fetch(`https://allapiresort-w3ql.vercel.app/hotelbook`)
 setResortData(await response.json())
}

useEffect(()=>{
getHotelData()
},[])

console.log(resortData)


  return (
    <section>
 <div  style={{height:'100vh'}}>
        < video style={{width:'100%',height:'100%' ,objectFit:'cover'}} src={beachResort2} autoPlay loop muted />
   </div>


<div className='resorts'>
<h2 className='resort-title'>LEARN MORE ABOUT OUR RESORTS</h2>
<div className='resorts-container'>
  
{resortData.map((el)=><div className='resort-card'>
<div className='img-parent-41' >
     <CImage rounded thumbnail src={el.imgurl} width={200} height={200} />
</div>

<div className={'text-of-resort'}  >
<p>LEARN MORE ABOUT OUR RESORTS</p>
</div>
</div>
)}





</div>
</div>

    </section>
  )
}

export default Resorts
