import { Link } from "react-router-dom";
import Card from "../components/Card";
import { Button } from "@mui/material";

function MyStranport() {
    return (
        <div>
            <div className="flex pb-5 justify-between items-center">
                <h1 className="text-3xl font-banner text-primary ">Xe của tôi</h1>
                <Link to={"/bikeregister"}>
                    <Button variant="outlined">Đăng xe</Button>
                </Link>
            </div>
            <ul className="w-full grid grid-cols-1 gap-5 relative max-h-[70vh] overflow-auto snap-y snap-mandatory">
                <Card isRow={true} isManage={true} />
                <Card isRow={true} />
                <Card isRow={true} />
                <Card isRow={true} />
            </ul>
        </div>
    );
}

export default MyStranport;
