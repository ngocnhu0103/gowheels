import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import Footer from "../components/Footer";

function ProfilePage() {
    const user = useSelector(state => state.user.value)
    return (
        <main className="container w-4/5 mx-auto " >
            <Header />

            <section className='grid grid-cols-3 mt-12 gap-6'>
                <Navigation></Navigation>
                <div className='col-span-2 bg-gray-100/90 rounded-xl p-4'><Outlet /></div>
            </section>
            <Footer />

        </main>
    );
}

export default ProfilePage;

