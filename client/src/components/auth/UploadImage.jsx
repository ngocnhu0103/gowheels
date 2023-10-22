import { useState } from "react";
import { storage } from "../../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button } from "@mui/material";

const UploadImage = ({ avt, setAvt, handleUpload, onClose }) => {
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(false);
    const uploadFile = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const imgExtend = file.name.split(".")[file.name.split(".").length - 1];
        if (["png", "jpeg", "jpg"].includes((pattern) => pattern !== imgExtend)) {
            setError("Không hỗ trợ loại tệp này");
        } else {
            setLoading(true);
            setError(null);
            const random = Math.round(Math.random() * 9999);
            const storageRef = ref(storage, `user/${file.name}_${random}`);
            const uploadStack = uploadBytesResumable(storageRef, file);

            uploadStack.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadStack.snapshot.ref)
                        .then((downloadURL) => {
                            setAvt(downloadURL);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
            );
        }
    };
    const onUpdate = async () => {
        await handleUpload();
        onClose();
    };
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-[400px] flex flex-col items-center justify-center gap-10 p-4 rounded-lg bg-white shadow-lg">
                <h1 className="text-xl font-bold">Upload avatar</h1>

                {avt && <img src={avt} alt="" className="w-32 h-32 rounded-full" />}

                <label htmlFor="upload" className="cursor-pointer">
                    <div className="flex gap-4">
                        <UploadFileIcon />
                        <span className="text-gray-400 font-bold">Select file</span>
                    </div>
                </label>
                {error && <p className="text-rose-400 text-xs font-semibold mt-2">{error}</p>}
                <div className="flex items-center gap-5">
                    <Button variant="contained" onClick={onUpdate} disabled={loading}>
                        {loading ? "..." : "Update"}
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel{" "}
                    </Button>
                </div>
                <input type="file" name="file" id="upload" hidden onChange={uploadFile} />
            </div>
        </div>
    );
};

export default UploadImage;
