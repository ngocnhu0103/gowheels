import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
function BikePage() {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <main className="container w-4/5 mx-auto" >
            <Header />


            <Footer />

        </main>
    );
}

export default BikePage;