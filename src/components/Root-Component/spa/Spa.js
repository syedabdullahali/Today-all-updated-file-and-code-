import React, { useState, useEffect } from 'react'
import './Spa.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SpaCard from './SpaCard'

const Spa = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const getSpaList = async () => {
        try {
            const response = await axios.get('http://localhost:4001/allSpaList')
            if (response.data.success) {
                console.log(response.data.data)
                setData(response.data.data)
            }
            else {
                console.log(response.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSpaList();
    }, [])

    return (
        <main className="main-spa">
            <img src="https://www.greatblueresorts.com/wp-content/uploads/2019/05/SpecialOffers-1-1800x450.jpg"
                alt="Special Offers from Great Blue Resorts" className="banner" />

            <main class="spa-parent">
                <section className="entry-point-spa" >


                    <div className='firts-content-spa'>
                        <h1 >SPA</h1>

                        <h2 >Ayurvedic Spa Treatments in Goa</h2>

                        <h6 >“Kalpaka Spa”</h6>

                        <p>Welcome to a World of Rejuvenation. At Kalpaka Spa– Find Yourself In The Hands Of Our Expert Masseurs – All The Way From Kerala.</p>
                        <p>CALM THOSE NERVES, AWAY FROM SUBURBS . . .</p>
                    </div>

                    <div className='spa-quots'>
                        <div className='spa-quots-content' >

                            <p>Calm Those Nerves, Away From Suburbs . . . Fatigued, tired, and stressed out? We have something just for you that would provide a perfect escape from the hustle and bustle of the city life. A full body massage with natural oils that permeate the body and relieve those tense muscles, allowing you to get rid of lassitude and filling you with vigour. The vitamin E in the oils will bring back the shine to your skin and help your body to loosen up. Choose from below:</p>
                        </div>

                        <div className='spa-quots-img'>
                            <img alt="Agonda Beach Resort" src="//s3-ap-southeast-1.amazonaws.com/assets-powerstores-com/data/org/17347/media/img/source/edit/1799139_edit.jpg" />
                        </div>
                    </div>

                </section>
                <div><button style={{ marginLeft: '5rem', width: '6rem', height: '3rem', outline: 'none', backgroundColor: 'darkgreen', color: 'white', border: '0.5px solid green' }} onClick={() => { navigate('/addSpa') }}>ADD ON</button></div>

                <div className='spaListWrapper' style={{ display: 'flex', marginTop: '5rem', flexWrap: 'nowrap' }}>
                    {data.map((card, index) => {
                        return (
                            <SpaCard card={card} />
                        )
                    })}
                </div>

                <section >
                    <div className="spa-footer">
                        {/* <p> */}
                        {/* <a className="bottom-spa"
                                href="https://form.jotform.me/82394848884477"
                                rel="nofollow" target="_blank">BOOK A SESSION</a></p> */}

                        <p className="normal-text-spa">For more details,
                            <a className="cta" href="/pages/beach-huts-bungalows-resorts">
                                Get in Touch With Cuba Goa Today!</a></p>

                    </div>
                </section>

            </main>

        </main>
    )
}

export default Spa