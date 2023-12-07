import { createSlice } from "@reduxjs/toolkit";


const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reports: [],
        report: {

        },
        totals: null
    },
    reducers: {
        saveReports: (state, actions) => {
            state.reports = actions.payload;
        },
        detailReport: (state, actions) => {
            state.report = actions.payload;
        },
        updateReport: (state, actions) => {
            state.reports = state.reports.map((rp) => {
                if (rp.id === actions.payload.reportId) {
                    rp.status = actions.payload.newStatus
                }
                return rp
            })
        },
        leaveReport: (state, actions) => {
            state.reports = state.reports.filter((report) => report.id !== actions.payload.reportId)
        },
        saveReportsForAdmin: (state, actions) => {
            state.reports = actions.payload.content;
            state.totals = actions.payload.numberOfElements;
        },
    }
})

export const { saveReports, leaveReport, detailReport, updateReport, saveReportsForAdmin } = reportSlice.actions;
export default reportSlice.reducer;