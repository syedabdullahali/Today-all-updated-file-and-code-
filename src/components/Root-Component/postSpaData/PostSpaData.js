import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function PostForm() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: '',
        details:'',
        imgUrl: ''
    })
    const [image, setImage] = useState('')


    //handle inputs
    const handleInputs = (e) => {
        const { name, value } = e.target
        setForm(prevState => ({ ...prevState, [name]: value }))
    }


    //post data form
    const postData = async () => {
        await axios.post('http://localhost:4001/addspa', form)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => { console.log(err) })

        navigate('/spa')
    }

    useEffect(() => {
        if (form.imgUrl) {
            postData();
        }
    }, [form.imgUrl])

    const uploadImage = async () => {

        const imgData = new FormData()
        imgData.append('file', image)
        imgData.append("upload_preset", "insta_clone")
        await axios.post('https://api.cloudinary.com/v1_1/harshada0611/image/upload', imgData)
            .then((resp) => {
                console.log(resp.data.url)
                setForm({ ...form, imgUrl: resp.data.url })
            })
            .catch((err) => { console.log('something went wrong', err) })
    }

    return (
        <div id='UserFormWrapper'>
            <div id='formWrapper' style={{ width: '50%', border: '1px solid lightgrey', margin: 'auto', marginTop: '15%', padding: '2rem' }}>
                <h4>ADD YOUR SPA</h4>
                <div style={{ marginTop: '1.5rem' }}>
                    <input type='file' onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                    <input type='text' placeholder='SPA Name' name='name' value={form.name} onChange={handleInputs} />
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                    <textarea type='text' placeholder='SPA Details' name='details' value={form.details} onChange={handleInputs} />
                </div>
                {/* do not set value attribute for file but why??*/}
                <div id='button' style={{ marginTop: '1.5rem' }}>
                    <button className='btn btn-warning' onClick={uploadImage}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}

export default PostForm