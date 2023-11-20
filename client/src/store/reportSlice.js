import { createSlice } from "@reduxjs/toolkit";


const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reports: [],
        report: {

        }
    },
    reducers: {
        saveReports: (state, actions) => {
            state.reports = actions.payload;
        },
        detailReport: (state, actions) => {
            state.report = actions.payload;
        },
        leaveReport: (state, actions) => {
            state.reports = state.reports.filter((report) => report.id !== actions.payload.reportId)
        },
    }
})

export const { saveReports, leaveReport, detailReport } = reportSlice.actions;
export default reportSlice.reducer;