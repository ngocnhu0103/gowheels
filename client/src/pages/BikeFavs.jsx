import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import { useSelector } from "react-redux";

function BikeFavs() {
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const { likes } = useSelector((state) => state.auth.user);
    console.log(likes);
    return (
        <main className="container w-4/5 mx-auto ">
            <Header />

            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2  rounded-xl p-4">
                    <div className="">
                        <h1 className=" text-3xl font-banner text-primary pb-5">Xe yêu thích</h1>
                        <ul className="w-full grid grid-cols-1 gap-5 relative max-h-[70vh] overflow-auto snap-y snap-mandatory">
                            {/* <Card isRow={true} />
                            <Card isRow={true} />
                            <Card isRow={true} />
                            <Card isRow={true} /> */}
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default BikeFavs;
