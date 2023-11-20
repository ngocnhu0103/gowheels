/* eslint-disable react/prop-types */

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";

function Tab({ tab, setTab }) {
    return (
        // <div className="flex text-center bg-gray-200 w-full max-w-full">
        //     <p
        //         onClick={() => {
        //             setTab("");
        //         }}
        //         className={`min-w-[123px]  py-2 cursor-pointer font-semibold hover:text-primary text-gray-500
        //         ${tab === "" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Tất cả
        //     </p>
        //     <p
        //         onClick={() => {
        //             setTab("Chờ duyệt");
        //         }}
        //         className={`min-w-[123px]  cursor-pointer font-semibold hover:text-primary py-2
        //         ${tab === "Chờ duyệt" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Chờ duyệt
        //     </p>
        //     <p
        //         onClick={() => {
        //             setTab("Chờ bàn giao");
        //         }}
        //         className={`min-w-[123px]  cursor-pointer font-semibold hover:text-primary py-2
        //         ${tab === "Chờ bàn giao" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Đã duyệt
        //     </p>
        //     <p
        //         onClick={() => {
        //             setTab("Đã bàn giao");
        //         }}
        //         className={`min-w-[123px]  cursor-pointer font-semibold hover:text-primary py-2
        //         ${tab === "Đã bàn giao" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Đã bàn giao
        //     </p>
        //     <p
        //         onClick={() => {
        //             setTab("Đã xác nhận");
        //         }}
        //         className={`min-w-[123px]  cursor-pointer font-semibold hover:text-primary py-2
        //         ${tab === "Đã xác nhận" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Đã xác nhận
        //     </p>
        //     <p
        //         onClick={() => {
        //             setTab("Đang kiểm kê");
        //         }}
        //         className={`min-w-[123px]  py-2 cursor-pointer font-semibold hover:text-primary text-gray-500
        //         ${tab === "Đang kiểm kê" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Đang kiểm kê
        //     </p>
        //     <p
        //         onClick={() => {
        //             setTab("4");
        //         }}
        //         className={`min-w-[123px]  cursor-pointer font-semibold hover:text-primary py-2
        //         ${tab === "4" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Hoàn thành
        //     </p>

        //     <p
        //         onClick={() => {
        //             setTab("Đã hủy");
        //         }}
        //         className={`min-w-[123px]  py-2 cursor-pointer font-semibold hover:text-primary text-gray-500
        //         ${tab === "Đã hủy" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
        //         `}
        //     >
        //         Đã hủy
        //     </p>
        // </div>

        <Swiper
            spaceBetween={10}
            slidesPerView={5}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
        >
            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("");
                    }}
                    className={` w-full text-center py-2 cursor-pointer font-semibold hover:text-primary text-gray-500
                ${tab === "" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Tất cả
                </p>
            </SwiperSlide>

            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("Chờ duyệt");
                    }}
                    className={` w-full text-center cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "Chờ duyệt" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Chờ duyệt
                </p>
            </SwiperSlide>
            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("Chờ bàn giao");
                    }}
                    className={` w-full text-center cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "Chờ bàn giao" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Đã duyệt
                </p>
            </SwiperSlide>

            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("Đã bàn giao");
                    }}
                    className={` w-full text-center cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "Đã bàn giao" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Đã bàn giao
                </p>
            </SwiperSlide>
            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("Đã xác nhận");
                    }}
                    className={` w-full text-center cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "Đã xác nhận" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Đã xác nhận
                </p>
            </SwiperSlide>

            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("Đang kiểm kê");
                    }}
                    className={` w-full text-center py-2 cursor-pointer font-semibold hover:text-primary text-gray-500
                ${tab === "Đang kiểm kê" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Đang kiểm kê
                </p>
            </SwiperSlide>

            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("Đã thanh toán");
                    }}
                    className={` w-full text-center cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "Đã thanh toán" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Hoàn thành
                </p>
            </SwiperSlide>

            <SwiperSlide>
                <p
                    onClick={() => {
                        setTab("Đã hủy");
                    }}
                    className={` w-full text-center py-2 cursor-pointer font-semibold hover:text-primary text-gray-500
                ${tab === "Đã hủy" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
                >
                    Đã hủy
                </p>
            </SwiperSlide>
        </Swiper>
    );
}

export default Tab;
