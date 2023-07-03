import Header from "../components/Header";
import Banner from "../components/home/Banner";
import Category from "../components/home/Category";
import Card from "../components/Card";
import Search from "../components/home/Search";
import { useState } from "react";
function Home() {
    const [showCalendar, setShowCalendar] = useState(false);

    return <main className="container w-4/5 mx-auto" onClick={() => { setShowCalendar(false) }}>
        <Header />
        <Search showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
        <Banner />
        <Category />
        <div className="py-8">
            <h1 className="text-center text-5xl font-banner text-primary pb-8">Xe nổi bật</h1>
            <ul className="grid grid-cols-4 gap-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </ul>
        </div>

    </main>
}

export default Home;