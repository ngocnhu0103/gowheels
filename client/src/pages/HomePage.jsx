import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikeAPI } from "../api/bikeAPI";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";
import Guide from "../components/home/Guide";
import Places from "../components/home/Places";
import Search from "../components/home/Search";

function Home() {
    const { bikeList } = useSelector((state) => state.bike);
    const [showCalendar, setShowCalendar] = useState(false);

    const dispatch = useDispatch();
    const getAllBike = async (dispatch, filter) => {
        await getAllBikeAPI(dispatch, filter);
    };
    useEffect(() => {
        getAllBike(dispatch, {
            page: 0,
            size: 12,
        });
    }, []);
    console.log(bikeList);
    return (
        <main
            className="container w-4/5 max-md:w-11/12 mx-auto"
            onClick={() => {
                setShowCalendar(false);
            }}
        >
            <Header />
            <Search showCalendar={showCalendar} setShowCalendar={setShowCalendar} />

            <Banner />
            <div className="py-8">
                <h1 className="text-center text-5xl font-banner text-primary pb-8">Địa điểm nổi bật</h1>
                <Places />
            </div>

            <Category />
            <div className="py-8">
                <h1 className="text-center text-5xl font-banner text-primary pb-8">Xe nổi bật</h1>
                <ul className="grid grid-cols-4 gap-5 max-md:grid-cols-1">
                    {bikeList && bikeList.length > 0
                        ? bikeList.map((bike) => {
                              return <Card key={bike.bikeCode} bike={bike} />;
                          })
                        : null}
                </ul>
            </div>
            <Guide />
            <div className="h-[1px] bg-primary my-8 "></div>
            <Footer />
        </main>
    );
}

export default Home;
