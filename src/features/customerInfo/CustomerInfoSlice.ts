import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { fetchEmailDomains, fetchCustomerInfoById, createCustomerInfo, updateCustomerInfo } from './CustomerInfoAPI';
import { CustomerInfoForm } from './CustomerInfo';

export interface customerInfoState {
  emailDomainList: string[];
  formData: CustomerInfoForm;
  status: 'idle' | 'loading' | 'failed';
  customerInfoFormSubmitted: boolean;
  customerInfoFormErrors: string[];
}

const initialState: customerInfoState = {
  emailDomainList: [],
  formData: {} as CustomerInfoForm,
  status: 'idle',
  customerInfoFormSubmitted: false,
  customerInfoFormErrors: []
};

export const getEmailDomains = createAsyncThunk(
  'customerInfo/fetchEmailDomains',
  async () => {
    const response = await fetchEmailDomains();
    return response.data;[];
  }
);

export const getCustomerInfoById = createAsyncThunk(
  'customerInfo/fetchCustomerInfoById',
  async (tng_id: string) => {
    const response = await fetchCustomerInfoById(tng_id);
    return response.data;
  }
);

export const saveCustomerInfo = createAsyncThunk(
  'customerInfo/saveCustomerInfo',
  async (data: CustomerInfoForm) => {
    if (data.tng_id) {
      const response = await updateCustomerInfo(data.tng_id, data);
      return response.data;
    } else {
      const response = await createCustomerInfo(data);
      return response.data;
    }
  }
);

export const customerInfoSlice = createSlice({
  name: 'customerInfo',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFormData: (state, action: PayloadAction<CustomerInfoForm>) => {
      state.formData = action.payload;
    },
    resetFormData: (state) => {
      state.formData = {} as CustomerInfoForm;
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
      .addCase(getCustomerInfoById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCustomerInfoById.fulfilled, (state, action) => {
        state.status = 'idle';
        state.formData = action.payload;
      })
      .addCase(getCustomerInfoById.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(saveCustomerInfo.pending, (state) => {
        state.status = 'loading';
        state.customerInfoFormSubmitted = false;
        state.customerInfoFormErrors = [];
      })
      .addCase(saveCustomerInfo.fulfilled, (state, action) => {
        state.status = 'idle';
        state.formData = action.payload;
        state.customerInfoFormSubmitted = true;
        state.customerInfoFormErrors = [];
      })
      .addCase(saveCustomerInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.customerInfoFormSubmitted = false;
        state.customerInfoFormErrors = action.error.message ? [action.error.message] : [];
      });
  }
});

export const { setFormData, setEmailDomainList, resetFormData } = customerInfoSlice.actions;

export const selectEmailDomainList = (state: RootState) => state.customerInfo.emailDomainList;
export const selectFormData = (state: RootState) => state.customerInfo.formData;
export const selectCustomerInfoFormSubmitted = (state: RootState) => state.customerInfo.customerInfoFormSubmitted;
export const selectCustomerInfoFormErrors = (state: RootState) => state.customerInfo.customerInfoFormErrors;


export default customerInfoSlice.reducer;
