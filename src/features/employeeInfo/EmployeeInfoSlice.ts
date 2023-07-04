import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { fetchEmailDomains, fetchEmployeeInfoById, createEmployeeInfo, updateEmployeeInfo } from './EmployeeInfoAPI';
import { EmployeeInfoForm } from './EmployeeInfo';

export interface employeeInfoState {
  emailDomainList: string[];
  formData: EmployeeInfoForm;
  status: 'idle' | 'loading' | 'failed';
  employeeInfoFormSubmitted: boolean;
  employeeInfoFormErrors: string[];
}

const initialState: employeeInfoState = {
  emailDomainList: [],
  formData: {} as EmployeeInfoForm,
  status: 'idle',
  employeeInfoFormSubmitted: false,
  employeeInfoFormErrors: []
};

export const getEmailDomains = createAsyncThunk(
  'employeeInfo/fetchEmailDomains',
  async () => {
    const response = await fetchEmailDomains();
    return response.data;[];
  }
);

export const getEmployeeInfoById = createAsyncThunk(
  'employeeInfo/fetchEmployeeInfoById',
  async (tng_id: string) => {
    const response = await fetchEmployeeInfoById(tng_id);
    return response.data;
  }
);

export const saveEmployeeInfo = createAsyncThunk(
  'employeeInfo/saveEmployeeInfo',
  async (data: EmployeeInfoForm) => {
    if (data.tng_id) {
      const response = await updateEmployeeInfo(data.tng_id, data);
      return response.data;
    } else {
      const response = await createEmployeeInfo(data);
      return response.data;
    }
  }
);

export const employeeInfoSlice = createSlice({
  name: 'employeeInfo',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFormData: (state, action: PayloadAction<EmployeeInfoForm>) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = {} as EmployeeInfoForm;
    },
    setEmailDomainList: (state, action: PayloadAction<string[]>) => {
      state.emailDomainList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmailDomains.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmailDomains.fulfilled, (state, action) => {
        state.status = 'idle';
        state.emailDomainList = action.payload;
      })
      .addCase(getEmailDomains.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(getEmployeeInfoById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployeeInfoById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.formData = action.payload;
      })
      .addCase(getEmployeeInfoById.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(saveEmployeeInfo.pending, (state) => {
        state.status = 'loading';
        state.employeeInfoFormSubmitted = false;
        state.employeeInfoFormErrors = [];
      })
      .addCase(saveEmployeeInfo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.formData = action.payload;
        state.employeeInfoFormSubmitted = true;
        state.employeeInfoFormErrors = [];
      })
      .addCase(saveEmployeeInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.employeeInfoFormSubmitted = false;
        state.employeeInfoFormErrors = action.error.message ? [action.error.message] : [];
      });
  }
});

export const { setFormData, setEmailDomainList, resetFormData } = employeeInfoSlice.actions;

export const selectEmailDomainList = (state: RootState) => state.employeeInfo.emailDomainList;
export const selectFormData = (state: RootState) => state.employeeInfo.formData;
export const selectEmployeeInfoFormSubmitted = (state: RootState) => state.employeeInfo.employeeInfoFormSubmitted;
export const selectEmployeeInfoFormErrors = (state: RootState) => state.employeeInfo.employeeInfoFormErrors;


export default employeeInfoSlice.reducer;
