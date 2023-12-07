/* eslint-disable react/prop-types */

const RenderByPoint = (point) => {
    return (
        <div className="flex items-center gap-1 font-semibold text-sm">
            <span className="text-gray-500">Uy tín: </span>
            <span className={`${point >= 80 ? "text-green-600" : point >= 50 ? "text-yellow-600" : "text-red-500"}`}>
                {point}/100
            </span>
        </div>
    );
};

export default RenderByPoint;
