import React, { useEffect, useState } from "react";
import { storage } from "../../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { CircularProgress } from "@mui/material";
function UploadBikeImg({ imgs, setImgs }) {
    const [progresspercent, setProgresspercent] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const [error, setError] = useState(null);

    const uploadImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imgExtend = file.name.split(".")[file.name.split(".").length - 1];
        if (["png", "jpeg", "jpg"].includes((pattern) => pattern !== imgExtend)) {
            setError("Không hỗ trợ loại tệp này");
        } else {
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
                    getDownloadURL(uploadStack.snapshot.ref).then((downloadURL) => {
                        setImgs([...imgs, downloadURL]);
                        setImgUrl(downloadURL);
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
                    {!imgUrl && (
                        <div className="absolute w-full h-full flex justify-center items-center inset-0 z-10">
                            <CircularProgress
                                variant="determinate"
                                value={progresspercent}
                                title={`${progresspercent}%`}
                            />
                        </div>
                    )}
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
        </div>
    );
}

export default UploadBikeImg;
