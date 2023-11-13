/* eslint-disable react/prop-types */
import { Button, Modal } from "@mui/material";
import { useState } from "react";

function ComfirmModal({ open, onClose, title, handle, buttonName = "Cập nhật" }) {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
        setLoading(true);
        handle();
        setLoading(false);
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className="w-full h-screen flex items-center justify-center">
                <div className="w-full max-w-[400px] flex flex-col items-center justify-center gap-10 p-4 rounded-lg bg-white shadow-lg">
                    <h1 className="text-xl font-bold">{title || "Modal title"}</h1>

                    <div className="flex items-center gap-5">
                        <Button variant="contained" onClick={handleClick} disabled={loading}>
                            {loading ? "..." : buttonName}
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ComfirmModal;
