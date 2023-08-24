import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Navigation from '../components/profile/Navigation';
function UpdateProfile() {
    return (
        <main className="container w-4/5 mx-auto" >
            <Header />

            <section className='grid grid-cols-3 '>
                <Navigation></Navigation>
                <div className='col-span-2'>chu thu 2</div>
            </section>
            <Footer />

        </main>
    )
}

export default UpdateProfile