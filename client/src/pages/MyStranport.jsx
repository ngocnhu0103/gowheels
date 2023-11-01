import { Link, useLocation } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";
import Footer from "../components/Footer";
import Navigation from "../components/profile/Navigation";
import Header from "../components/Header";
import { useSelector } from "react-redux";

function MyStranport() {
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
                        <div className="flex pb-5 justify-between items-center">
                            <h1 className="text-3xl font-banner text-primary ">Xe của tôi</h1>
                            {user.jobber && (
                                <Link to={"/bikeregister"}>
                                    <Button variant="outlined">Đăng xe</Button>
                                </Link>
                            )}
                        </div>
                        {!user.jobber ? (
                            <div className="flex items-center justify-center flex-col h-[50vh]">
                                <p className="text-center text-3xl text-gray-400">Đăng ký làm chủ xe để đăng xe!</p>
                                <Link to={"/profile/update"}>
                                    <span className="text-primary hover:text-primary/50">Đăng ký</span>
                                </Link>
                            </div>
                        ) : (
                            <ul className="w-full grid grid-cols-1 gap-5 relative max-h-[70vh] overflow-auto snap-y snap-mandatory">
                                {/* <Card isRow={true} isManage={true} />
                            <Card isRow={true} />
                            <Card isRow={true} />
                            <Card isRow={true} /> */}
                            </ul>
                        )}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MyStranport;
