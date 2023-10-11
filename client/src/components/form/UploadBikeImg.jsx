import React, { useEffect, useState } from "react";
import { storage } from "../../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CircularProgress, Modal } from "@mui/material";
function UploadBikeImg({ imgs, setImgs }) {
    const [progresspercent, setProgresspercent] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imgExtend = file.name.split(".")[file.name.split(".").length - 1];
        if (["png", "jpeg", "jpg"].includes((pattern) => pattern !== imgExtend)) {
            setError("Không hỗ trợ loại tệp này");
        } else {
            setLoading(true);
            setError(null);
            const random = Math.round(Math.random() * 9999);
            const storageRef = ref(storage, `files/${file.name}_${random}`);
            const uploadStack = uploadBytesResumable(storageRef, file);

            uploadStack.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadStack.snapshot.ref)
                        .then((downloadURL) => {
                            setImgs([...imgs, downloadURL]);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
            );
        }
    };

    return (
        <div>
            <h1 className="mb-2 font-semibold ">Ảnh xe</h1>
            <p className="text-gray-400 mb-2">
                Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của bạn.
            </p>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Chọn ảnh</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, JPG (MAX.678X365)</p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        name="images"
                        onChange={uploadImage}
                    />
                    {error && <p className="text-rose-400 text-xs font-semibold mt-2">{error}</p>}
                </label>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">
                {imgs && imgs.length > 0
                    ? imgs.map((img) => {
                          return (
                              <img
                                  key={img}
                                  src={img}
                                  alt="uploaded file"
                                  className="max-h-80 min-w-full rounded-lg  "
                              />
                          );
                      })
                    : null}
            </div>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center w-full h-screen z-10 bg-black/50">
                    <svg className="bike" viewBox="0 0 48 30" width="48px" height="30px">
                        <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                        >
                            <g transform="translate(9.5,19)">
                                <circle className="bike__tire" r="9" strokeDasharray="56.549 56.549" />
                                <g
                                    className="bike__spokes-spin"
                                    strokeDasharray="31.416 31.416"
                                    strokeDashoffset="-23.562"
                                >
                                    <circle className="bike__spokes" r="5" />
                                    <circle className="bike__spokes" r="5" transform="rotate(180,0,0)" />
                                </g>
                            </g>
                            <g transform="translate(24,19)">
                                <g
                                    className="bike__pedals-spin"
                                    strokeDasharray="25.133 25.133"
                                    strokeDashoffset="-21.991"
                                    transform="rotate(67.5,0,0)"
                                >
                                    <circle className="bike__pedals" r="4" />
                                    <circle className="bike__pedals" r="4" transform="rotate(180,0,0)" />
                                </g>
                            </g>
                            <g transform="translate(38.5,19)">
                                <circle className="bike__tire" r="9" strokeDasharray="56.549 56.549" />
                                <g
                                    className="bike__spokes-spin"
                                    strokeDasharray="31.416 31.416"
                                    strokeDashoffset="-23.562"
                                >
                                    <circle className="bike__spokes" r="5" />
                                    <circle className="bike__spokes" r="5" transform="rotate(180,0,0)" />
                                </g>
                            </g>
                            <polyline className="bike__seat" points="14 3,18 3" strokeDasharray="5 5" />
                            <polyline
                                className="bike__body"
                                points="16 3,24 19,9.5 19,18 8,34 7,24 19"
                                strokeDasharray="79 79"
                            />
                            <path className="bike__handlebars" d="m30,2h6s1,0,1,1-1,1-1,1" strokeDasharray="10 10" />
                            <polyline className="bike__front" points="32.5 2,38.5 19" strokeDasharray="19 19" />
                        </g>
                    </svg>
                </div>
            )}
        </div>
    );
}

export default UploadBikeImg;
