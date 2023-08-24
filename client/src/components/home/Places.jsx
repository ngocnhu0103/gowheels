import Slider from "react-slick";
import hanoi from '../../assets/hanoi.jpg'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Places() {
    var settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        infinite: false,
        autoplay: false,
        className: "px-5",
        responsive: [{

            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                infinite: true
            }

        }, {

            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                dots: true
            }

        }, {

            breakpoint: 300,
            settings: "unslick" // destroys slick

        }]
    };
    return (
        <Slider {...settings}>
            <div className="relative">
                <img className="h-56 object-cover rounded-lg brightness-90 hover:brightness-75 duration-300 cursor-pointer" src={hanoi} alt="hanoi" />
                <div className="absolute bottom-6 font-banner text-white z-0 left-28 ">
                    <h1 className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">Hà nội</h1>
                    <p className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">200 Xe</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-56 object-cover rounded-lg brightness-90 hover:brightness-75 duration-300 cursor-pointer" src={hanoi} alt="hanoi" />
                <div className="absolute bottom-6 font-banner text-white z-0 left-28 ">
                    <h1 className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">Hà nội</h1>
                    <p className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">200 Xe</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-56 object-cover rounded-lg brightness-90 hover:brightness-75 duration-300 cursor-pointer" src={hanoi} alt="hanoi" />
                <div className="absolute bottom-6 font-banner text-white z-0 left-28 ">
                    <h1 className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">Hà nội</h1>
                    <p className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">200 Xe</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-56 object-cover rounded-lg brightness-90 hover:brightness-75 duration-300 cursor-pointer" src={hanoi} alt="hanoi" />
                <div className="absolute bottom-6 font-banner text-white z-0 left-28 ">
                    <h1 className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">Hà nội</h1>
                    <p className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">200 Xe</p>
                </div>
            </div>
            <div className="relative">
                <img className="h-56 object-cover rounded-lg brightness-90 hover:brightness-75 duration-300 cursor-pointer" src={hanoi} alt="hanoi" />
                <div className="absolute bottom-6 font-banner text-white z-0 left-28 ">
                    <h1 className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">Hà nội</h1>
                    <p className="drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-black">200 Xe</p>
                </div>
            </div>
        </Slider>
    )
}

export default Places