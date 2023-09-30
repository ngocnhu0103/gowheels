import { useState } from "react";
import Tab from "../components/profile/Tab";
import BookCard from "../components/BookCard";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import Footer from "../components/Footer";

function Order() {
    const [tab, setTab] = useState("1");
    const location = useLocation();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const user = useSelector((state) => {
        return state.auth.user;
    });
    return (
        <main className="container w-4/5 mx-auto ">
            <Header />

            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2  rounded-xl p-4">
                    <div>
                        <h1 className="text-3xl font-banner text-primary pb-5">Quản lý Đơn hàng</h1>
                        <Tab tab={tab} setTab={setTab} />
                        <ul className="mt-5 flex flex-col gap-5 relative max-h-[70vh] overflow-auto snap-y snap-mandatory">
                            <BookCard />
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default Order;
