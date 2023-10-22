import { useDispatch } from "react-redux";
import { reSendOtpAPI, verifyOtpAPI } from "../../api/authAPI";
import { useEffect, useState } from "react";

function FormComfirm({ onClose, user }) {
    const dispatch = useDispatch();
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);
    const sendOtp = async (e) => {
        e.preventDefault();
        const otpString =
            e.target[0].value +
            e.target[1].value +
            e.target[2].value +
            e.target[3].value +
            e.target[4].value +
            e.target[5].value;
        const status = await verifyOtpAPI(dispatch, { code: Number(otpString) });

        status === 200 && onClose();
    };
    const reSendOtp = async () => {
        setMinutes(2);
        seconds(59);
        await reSendOtpAPI(dispatch);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {user?.email}</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={sendOtp}>
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name="number1"
                                            id=""
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name="number2"
                                            id=""
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name="number3"
                                            id=""
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name="number4"
                                            id=""
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name="number5"
                                            id=""
                                        />
                                    </div>
                                    <div className="w-16 h-16 ">
                                        <input
                                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                            type="text"
                                            name="number6"
                                            id=""
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't recieve code?</p>{" "}
                                        <span
                                            className="flex flex-row items-center text-blue-600 cursor-pointer"
                                            rel="noopener noreferrer"
                                            onClick={reSendOtp}
                                        >
                                            Resend
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center mt-2">
                                Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormComfirm;
