import car from "../../assets/car.png";
import motobike from "../../assets/may.png";
import bike from "../../assets/bike.png";
import { Link } from "react-router-dom";

function Category() {
    return (
        <div className="flex justify-around h-[350px] ">
            <Link to={`/bikes/?categoryName=Xe oto`}>
                <img src={car} alt="xe oto" className="w-full h-full" />
            </Link>
            <Link to={`/bikes/?categoryName=Xe máy`}>
                <img src={motobike} alt="xe may" className="w-full h-full" />
            </Link>
            <Link to={`/bikes/?categoryName=Xe đạp`}>
                <img src={bike} alt="Xe dap" className="w-full h-full" />
            </Link>
        </div>
    );
}

export default Category;
