import {
    Button,
    CircularProgress,
    Modal,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { evaluateReportAPI, getReportsAPI } from "../../api/reportAPI";
import moment from "moment";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import { RenderStatusReport } from "../../utils/RenderStatusReport";
const ReportManagement = () => {
    const { reports } = useSelector((state) => state.report);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllReport = async () => {
            await getReportsAPI(dispatch);
        };
        fetchAllReport();
    }, []);

    const resolveReport = async (status, reportId) => {
        setLoading("resolve");
        await evaluateReportAPI(dispatch, reportId, { newStatus: status });
        setLoading("off");
        setIsModal(false);
    };
    const [isModal, setIsModal] = useState(false);
    const [loading, setLoading] = useState("off");
    return (
        <TableContainer component={Paper} className="mt-20">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Tác giả</TableCell>
                        <TableCell align="right">Người bị báo cáo</TableCell>
                        <TableCell align="right">Nội dung</TableCell>
                        <TableCell align="right">Trạng thái</TableCell>
                        <TableCell align="right">Thời gian</TableCell>
                        <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports && reports.length > 0 ? (
                        reports.map((row) => (
                            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.reporter.email}</TableCell>
                                <TableCell align="right">{row.reportedPerson.email}</TableCell>
                                <TableCell align="right">{row.content}</TableCell>
                                <TableCell align="right">{RenderStatusReport(row.status)}</TableCell>
                                <TableCell align="right">{moment(row.timeReport).fromNow()}</TableCell>
                                <TableCell align="center">
                                    {row.status === "waiting" && (
                                        <span
                                            className="cursor-pointer"
                                            title="Chi tiết"
                                            onClick={() => {
                                                setIsModal(true);
                                            }}
                                        >
                                            <OpenWithIcon color="primary" />
                                        </span>
                                    )}
                                </TableCell>
                                <Modal
                                    open={isModal}
                                    onClose={() => {
                                        setIsModal(false);
                                    }}
                                    aria-labelledby="parent-modal-title"
                                    aria-describedby="parent-modal-description"
                                >
                                    <div className="w-full h-screen flex items-center justify-center">
                                        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-10 p-4 rounded-lg bg-white shadow-lg">
                                            <h1 className="text-3xl font-bold">Chi tiết Báo cáo</h1>
                                            <section className="w-full flex flex-col gap-2">
                                                <span className="text-gray-500 font-bold text-xl">
                                                    Thông tin người báo cáo:
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={row.reporter.avatar.url}
                                                        alt=""
                                                        className="w-12 h-12 rounded-full"
                                                    />
                                                    <div className="">
                                                        <h5 className="text-gray-400 font-medium">
                                                            {row.reporter.email}
                                                        </h5>
                                                        <p className="text-gray-400 font-medium">
                                                            {row.reporter?.fullName || ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className="w-full flex flex-col gap-2">
                                                <span className="text-gray-500 font-bold text-xl">
                                                    Thông tin chủ xe:
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={row.reportedPerson.avatar.url}
                                                        alt=""
                                                        className="w-12 h-12 rounded-full"
                                                    />
                                                    <div className="">
                                                        <h5 className="text-gray-400 font-medium">
                                                            {row.reportedPerson.email}
                                                        </h5>
                                                        <p className="text-gray-400 font-medium">
                                                            {row.reportedPerson?.fullName || ""}
                                                        </p>
                                                    </div>
                                                </div>
                                            </section>
                                            <section className="w-full flex flex-col gap-2">
                                                <span className="text-gray-500 font-bold text-xl">
                                                    Nội dung báo cáo:
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <p>{row.content}</p>
                                                </div>
                                            </section>
                                            {row.imageList && (
                                                <section className="w-full flex flex-col gap-2">
                                                    <span className="text-gray-500 font-bold text-xl">Hình ảnh:</span>
                                                    <ul className="flex items-center gap-2 flex-wrap">
                                                        {row.imageList.map((img) => (
                                                            <li
                                                                key={img.imgId}
                                                                className="basis-[calc(33.33333%_-_8px)]"
                                                            >
                                                                <img
                                                                    src={img.url}
                                                                    alt=""
                                                                    className="w-full h-auto rounded"
                                                                />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            )}
                                            <div className="flex items-center gap-5">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => resolveReport("accept", row.id)}
                                                    disabled={loading === "resolve"}
                                                >
                                                    {loading === "resolve" ? (
                                                        <CircularProgress color="inherit" />
                                                    ) : (
                                                        "Đồng ý"
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => resolveReport("reject", row.id)}
                                                    disabled={loading === "resolve"}
                                                >
                                                    {loading === "resolve" ? (
                                                        <CircularProgress color="inherit" />
                                                    ) : (
                                                        "Từ chối"
                                                    )}
                                                </Button>
                                                <Button variant="text" onClick={() => setIsModal(false)}>
                                                    Hủy
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </TableRow>
                        ))
                    ) : (
                        <>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell colSpan={7}>
                                    <Skeleton animation="wave" />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell colSpan={7}>
                                    <Skeleton animation="wave" />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell colSpan={7}>
                                    <Skeleton animation="wave" />
                                </TableCell>
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReportManagement;