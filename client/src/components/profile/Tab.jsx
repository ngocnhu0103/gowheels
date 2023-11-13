/* eslint-disable react/prop-types */

function Tab({ tab, setTab }) {
    return (
        <div className="grid grid-cols-5 text-center bg-gray-200 ">
            <p
                onClick={() => {
                    setTab("1");
                }}
                className={`relative cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "1" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
            >
                Chờ duyệt
            </p>
            <p
                onClick={() => {
                    setTab("2");
                }}
                className={`relative cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "2" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
            >
                Chờ bàn giao
            </p>
            <p
                onClick={() => {
                    setTab("3");
                }}
                className={`relative cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "3" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
            >
                Đã bàn giao
            </p>
            <p
                onClick={() => {
                    setTab("4");
                }}
                className={`relative cursor-pointer font-semibold hover:text-primary py-2 
                ${tab === "4" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
            >
                Hoàn thành
            </p>
            <p
                onClick={() => {
                    setTab("5");
                }}
                className={`py-2 cursor-pointer font-semibold hover:text-primary text-gray-500
                ${tab === "5" ? "bg-gray-400/50 text-gray-800" : " text-gray-500"}
                `}
            >
                Đã hủy
            </p>
        </div>
    );
}

export default Tab;
