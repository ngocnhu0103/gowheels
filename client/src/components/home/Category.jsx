import car from "../../assets/car.png";
import motobike from "../../assets/may.png";
import bike from "../../assets/bike.png";
import { Link } from "react-router-dom";

function Category() {
    return (
        <div className="flex justify-around h-[350px] max-md:h-40">
            <Link to={`/bikes/?categoryName=Xe oto`}>
                <img src={car} alt="xe oto" className="w-full h-full animate-fade-right" />
            </Link>
            <Link to={`/bikes/?categoryName=Xe máy`}>
                <img src={motobike} alt="xe may" className="w-full h-full animate-fade-down" />
            </Link>
            <Link to={`/bikes/?categoryName=Xe đạp`}>
                <img src={bike} alt="Xe dap" className="w-full h-full animate-fade-left" />
            </Link>
        </div>
    );
}

export default Category;
