// [cho duyet,da duyet,da ban giao,dang kiem ke,da xac nhan, da thanh toan]
import { Chip } from "@mui/material";
export const RenderStatusReport = (value) => {
    let tag;
    switch (value) {
        case "accept":
            tag = <Chip variant="filled" label={"Chấp nhận"} color="success" />;
            break;
        case "reject":
            tag = <Chip variant="filled" label={"Từ chối"} color="error" />;
            break;
        default:
            tag = <Chip variant="filled" label={"Đang chờ"} color="secondary" />;
    }
    return tag;
};
