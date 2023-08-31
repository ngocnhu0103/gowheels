import { useState } from "react";
import Tab from "../components/profile/Tab";
import BookCard from "../components/BookCard";

function MyOrder() {
    const [tab, setTab] = useState("1");

    return (
        <div>
            <h1 className='text-center text-3xl font-banner text-primary pb-5'>Đơn hàng của tôi</h1>
            <Tab tab={tab} setTab={setTab} />
            <ul className="mt-5 flex flex-col gap-5 relative max-h-[70vh] overflow-auto snap-y snap-mandatory">
                <BookCard />
            </ul>
        </div>
    )
}

export default MyOrder