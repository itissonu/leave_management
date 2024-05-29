import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userFunctions from '../apis/authApi';
import toast from 'react-hot-toast';
import { act } from 'react';



const LoginUser = createAsyncThunk("auth/userlogin", async (user) => {
    try {
        return await userFunctions.login(user);

    } catch (error) {
        throw error;
    }
});
const LogoutUser = createAsyncThunk("auth/userlogout", async () => {
    try {
        return await userFunctions.logout()

    } catch (error) {
        throw error;
    }
});
const RegisterUser = createAsyncThunk("auth/registeruser", async (user) => {
    try {
        return await userFunctions.register(user);

    } catch (error) {
        throw error;
    }
});
const GetAllUser = createAsyncThunk("auth/getalluser", async () => {
    try {
        return await userFunctions.getalluser();

    } catch (error) {
        throw error;
    }
});
const GetAUser = createAsyncThunk("auth/getauser", async (id) => {
    try {
        return await userFunctions.getauser(id);

    } catch (error) {
        throw error;
    }
});


const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    success: false,
    message: "",
    token: "",
    alluser: [],
    singleuser: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUserAuthenticated: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {

            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = ''
        })
            .addCase(LoginUser.fulfilled, (state, action) => {

                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.success = true;
                state.message = 'Login Successful.'

                if (state.success) {

                    localStorage.setItem('user', JSON.stringify(action.payload.user));
                    localStorage.setItem('token', action.payload.token);
                }
            })
            .addCase(LoginUser.rejected, (state, action) => {
              
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
                state.message = "login failed" || "Internal error ";    

            })
            .addCase(LogoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = ''
            })
            .addCase(LogoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.success = true;
                state.isAuthenticated = false;
                state.message = 'Logout Successful.'
                state.token = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');


            })

            .addCase(LogoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
                state.message = "logout failed" || "Internal error ";
            })
            //register
            .addCase(RegisterUser.pending, (state) => {

                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = ''
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {

                state.loading = false;
               // state.user = action.payload.user;
                state.isAuthenticated = true;
                state.success = true;
                state.message = 'New user created  Successfully.'


            })
            .addCase(RegisterUser.rejected, (state, action) => {

                state.loading = false;
                state.error = action.error.message;
                state.success = false;
                state.message = "signup failed" || "Internal error ";

            }).addCase(GetAllUser.pending, (state) => {

                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = 'got all user'
            })
            .addCase(GetAllUser.fulfilled, (state, action) => {

                state.loading = false;
                state.alluser = action.payload;
                state.success = true;

            })
            .addCase(GetAllUser.rejected, (state, action) => {

                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            }).addCase(GetAUser.pending, (state) => {

                state.loading = true;
                state.error = null;
                state.success = false;
                state.message = 'got the user'
            })
            .addCase(GetAUser.fulfilled, (state, action) => {

                state.loading = false;
                state.singleuser = action.payload;
                state.success = true;

            })
            .addCase(GetAUser.rejected, (state, action) => {

                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            })

    }
})

export const { setUserAuthenticated } = authSlice.actions;
export default authSlice.reducer;
export { LoginUser, LogoutUser, RegisterUser, GetAllUser, GetAUser };
