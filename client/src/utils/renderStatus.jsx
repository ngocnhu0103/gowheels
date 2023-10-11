// [cho duyet,da duyet,da ban giao,dang kiem ke,da xac nhan, da thanh toan]
import { Chip } from "@mui/material";
export const renderStatusBook = (value) => {
    let tag;
    switch (value) {
        case "Đã duyệt":
            tag = <Chip variant="filled" label={value} color="success" />;
            break;
        case "Đã bàn giao":
            tag = <Chip variant="filled" label={value} color="success" />;
            break;
        case "Đang kiểm kê":
            tag = <Chip variant="filled" label={value} color="warning" />;
            break;
        case "Đã xác nhận":
            tag = <Chip variant="filled" label={value} color="success" />;
            break;
        case "Đã thanh toán":
            tag = <Chip variant="filled" label={value} color="success" />;
            break;
        case "Đã hủy":
            tag = <Chip variant="filled" label={value} color="error" />;
            break;
        default:
            tag = <Chip variant="filled" label={value} color="secondary" />;
    }
    return tag;
};
