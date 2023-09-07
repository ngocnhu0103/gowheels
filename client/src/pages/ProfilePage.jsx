import { useSelector } from "react-redux";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import Footer from "../components/Footer";

function ProfilePage() {
    const user = useSelector((state) => state.user.value);
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];

    return (
        <main className="container w-4/5 mx-auto ">
            <Header />

            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2  rounded-xl p-4">
                    <Outlet />
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default ProfilePage;
