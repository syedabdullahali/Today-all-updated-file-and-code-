import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { Suspense } from 'react';
import Footer from './components/Root-Component/Footer/Footer';
import PostSpaData from './components/Root-Component/postSpaData/PostSpaData';

const Header = React.lazy(() => import('./components/Header/Header'))
const Home = React.lazy(() => import('./components/Root-Component/Home/Home'))
const About = React.lazy(() => import('./components/Root-Component/About/About'))
const Spa = React.lazy(() => import('./components/Root-Component/spa/Spa'))
const ForSale = React.lazy(() => import('./components/Root-Component/ForSale/ForSale'))
const Resorts = React.lazy(() => import('./components/Root-Component/Resorts/Resorts'))
const OurProperties = React.lazy(() => import('./components/Root-Component/OurProperties/OurProperties'))
const ContactUs = React.lazy(() => import('./components/Root-Component/Contact/ContactUs'))
const Gallery = React.lazy(() => import('./components/Root-Component/Gallery/Gallery'))
const BookingPage = React.lazy(() => import('./components/Root-Component/BookingPage/BookingPage'))
const LogIn2 = React.lazy(() => import('./components/Root-Component/LogIn2/Login2'))

function App() {
  let user = JSON.parse(localStorage.getItem('user-info'))


  return (
    <div style={{ position: 'relative' }}>
      <BrowserRouter>
        <Routes>

          <Route path='/log-in' element={<Suspense fallback={<p>Loading....</p>}>
            <LogIn2 />
          </Suspense>}>
          </Route>


          <Route path="" element={<Header />}>




            <Route path='/' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Home />
                  <Footer />
                </>
              </Suspense>
            } />

            <Route path="/about" element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <About />
                  <Footer />
                </>
              </Suspense>
            } />

            <Route path="/spa" element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Spa />
                  <Footer />
                </>
              </Suspense>
            } />


            <Route path='/our-properties/:name/:id' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <BookingPage />
                  <Footer />
                </>
              </Suspense>
            } />

            <Route path='/resorts' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Resorts />
                  <Footer />
                </>
              </Suspense>

            } />

            <Route path='/our-properties' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <OurProperties />
                  <Footer />
                </>
              </Suspense>

            } />

            <Route path='/contact-us' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <ContactUs />
                  <Footer />
                </>
              </Suspense>

            } />

            <Route path='/gallery' element={
              <Suspense fallback={<p>Loading....</p>}>
                <>
                  <Gallery />
                  <Footer />
                </>
              </Suspense>} />





          </Route>


          <Route path='/addSpa' element={<PostSpaData />} />

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
