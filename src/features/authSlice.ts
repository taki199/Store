import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI, getCurrentUserAPI, uploadProfilePhotoAPI } from '../api/Customer';
import { User } from '../types'; // Import User type

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  status: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  status: 'idle', // idle | loading | succeeded | failed
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAPI(credentials);
      localStorage.setItem('token', response.token);
      return response.user;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);
      localStorage.setItem('token', response.token);
      return response.user;
    }  catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserAPI();
      return response;
    } catch (error:any){
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadProfilePhoto = createAsyncThunk(
  'auth/uploadProfilePhoto',
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await uploadProfilePhotoAPI(file);
      return response;
    }  catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadProfilePhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profilePhoto = action.payload.profilePhoto;
        }
        state.loading = false;
      })
      .addCase(uploadProfilePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
