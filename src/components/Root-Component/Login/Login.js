import React from 'react'
import './Login.css'
import { CForm ,CFormInput,CCol, CButton} from '@coreui/react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
  
 
    async function login() {
      if (email != '' || password != '') {
        let item = { email, password,userName: email.split('@')[0]+"CubGoa"}
  

        let result = await fetch("http://13.233.29.72:4001/login", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item)
        })

        result = await result.json()
        localStorage.setItem('user-info', JSON.stringify(result))


        let user = JSON.parse(localStorage.getItem('user-info'))

        console.log(u)

        // if (user?.message==='User not registered') {
        //   navigate('/')
        // }
        
      } else {
        // setClick(false)
        // setError('Please Enter Details')
      }
    } 

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user-info'))

        if (user?.message==='User not registered') {
            navigate('/')
            return 
          }
        localStorage.clear()
      }, [])



  return (
    <section className='log-in' >
        <CForm className='login-form'onSubmit={(e)=>{
            e.target.preventDefault()
        }
            
        }>

            <CCol className='my-2'>
            <CFormInput type='email' value={email} onChange={(e)=> setEmail(e.target.value)} />
            </CCol>
            <CCol  className='my-2'>
            <CFormInput type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </CCol>
            <CCol>
                <CButton onClick={login} >Login</CButton>
            </CCol>
        </CForm>
    </section>
  )
}

export default Login
