import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import leaveFunctions from '../apis/leaveApi';
import toast from 'react-hot-toast';



const SubmitLeaveRequest = createAsyncThunk('leave/submitLeaveRequest', async (requestData) => {
    try {
        const response = await leaveFunctions.submitLeaveRequest(requestData);
        return response;
    } catch (error) {
        throw error;
    }
});
const GetLeaveForEmployee = createAsyncThunk('leave/getallleaves', async (requestData) => {
    try {

        const response = await leaveFunctions.getLeaveForEmployee(requestData);
        return response;
    } catch (error) {
        throw error;
    }
});
const GetAbsentDates = createAsyncThunk('leave/getallabsents', async (requestData) => {
    try {
        const response = await leaveFunctions.getAbsentDatesforuser(requestData);
        return response;
    } catch (error) {
        throw error;
    }
});
const GetallLeavesAdmin = createAsyncThunk('leave/getallleavesadmin', async (requestData) => {
    try {
        const response = await leaveFunctions.getallleavesadmin(requestData);
        return response;
    } catch (error) {
        throw error;
    }
});
const UpdateLeave = createAsyncThunk('leave/updateleave', async (requestData) => {
    try {
        const response = await leaveFunctions.updateLeave(requestData);
        return response;
    } catch (error) {
        throw error;
    }
});




const initialState = {
    leaveRequests: [],
    loading: false,
    error: null,
    success: false,
    message: " ",
    absentdays: [],
    allleavesAdmin: []
};

// Slice
const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(SubmitLeaveRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(SubmitLeaveRequest.fulfilled, (state, action) => {
                state.loading = false;
                // state.leaveRequests.push(action.payload);
                state.message = (action.payload.message);

                state.success = true;
            })
            .addCase(SubmitLeaveRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.success = false;
            }).addCase(GetLeaveForEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GetLeaveForEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.leaveRequests = (action.payload.leaveRequests);
                state.message = (action.payload.message);
                state.success = true;
            })
            .addCase(GetLeaveForEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.success = false;
            }).addCase(GetAbsentDates.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GetAbsentDates.fulfilled, (state, action) => {
                state.loading = false;
                state.absentdays = (action.payload.absentDates);
                state.message = (action.payload.message);

                state.success = true;
            })
            .addCase(GetAbsentDates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.success = false;
            }).addCase(GetallLeavesAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(GetallLeavesAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.allleavesAdmin = (action.payload.leaveRequests);


                state.success = true;
            })
            .addCase(GetallLeavesAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.success = false;
            }).addCase(UpdateLeave.pending, (state, action) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(UpdateLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                toast.success(action.payload.message || "updated")
            })
            .addCase(UpdateLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.success = false;
            })
    },
});


export default leaveSlice.reducer;
//export const  { submitLeaveRequest }=leaveSlice.actions;

export { SubmitLeaveRequest, GetLeaveForEmployee, GetAbsentDates, GetallLeavesAdmin, UpdateLeave };

