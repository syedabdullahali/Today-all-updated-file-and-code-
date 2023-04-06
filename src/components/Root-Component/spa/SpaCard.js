import React from 'react'

const SpaCard = ({ card }) => {


  return (
    <div className='cardWrapper' style={{ height: '16rem', width: '15rem', margin: '1rem', paddingBottom: '1.5rem', border: '1px solid lightgrey' }}>
      <div><img src={card.imgUrl} alt='' style={{ width: '100%', height: '100%', marginTop: '0rem', paddingTop: '0rem' }} /></div>
      <h5 style={{ height: '3rem', padding: '1rem' }}>{card.name}</h5>

    </div>
  )
}

export default SpaCard