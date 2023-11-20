import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportsAPI } from "../../api/reportAPI";
import { renderStatusBook } from "../../utils/renderStatus";
import moment from "moment";

const ReportManagement = () => {
    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
        createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
        createData("Eclair", 262, 16.0, 24, 6.0),
        createData("Cupcake", 305, 3.7, 67, 4.3),
        createData("Gingerbread", 356, 16.0, 49, 3.9),
    ];

    const { reports } = useSelector((state) => state.report);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllReport = async () => {
            await getReportsAPI(dispatch);
        };
        fetchAllReport();
    }, []);
    console.log(reports);
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
                                <TableCell align="right">{renderStatusBook(row.status)}</TableCell>
                                <TableCell align="right">{moment(row.timeReport).fromNow()}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell colSpan={5}>
                                    <Skeleton animation="wave" />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell colSpan={5}>
                                    <Skeleton animation="wave" />
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell colSpan={5}>
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
