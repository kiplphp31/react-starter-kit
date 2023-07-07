import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { fetchCustomerInfoById, createCustomerInfo, updateCustomerInfo } from './CustomerInfoAPI';
import { CustomerInfoForm } from './CustomerInfo';

export interface customerInfoState {
  formData: CustomerInfoForm;
  status: 'idle' | 'loading' | 'failed';
  customerInfoFormSubmitted: boolean;
  customerInfoFormErrors: string[];
}

const initialState: customerInfoState = {
  formData: {} as CustomerInfoForm,
  status: 'idle',
  customerInfoFormSubmitted: false,
  customerInfoFormErrors: []
};


export const getCustomerInfoById = createAsyncThunk(
  'customerInfo/fetchCustomerInfoById',
  async (staff_detail_txn_id: number) => {
    const response = await fetchCustomerInfoById(staff_detail_txn_id);
    return response.data;
  }
);

export const saveCustomerInfo = createAsyncThunk(
  'customerInfo/saveCustomerInfo',
  async (data: CustomerInfoForm) => {
    if (data.staff_detail_txn_id) {
      const response = await updateCustomerInfo(data.staff_detail_txn_id, data);
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
  },
  extraReducers: (builder) => {
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

export const { setFormData, resetFormData } = customerInfoSlice.actions;

export const selectFormData = (state: RootState) => state.customerInfo.formData;
export const selectCustomerInfoFormSubmitted = (state: RootState) => state.customerInfo.customerInfoFormSubmitted;
export const selectCustomerInfoFormErrors = (state: RootState) => state.customerInfo.customerInfoFormErrors;


export default customerInfoSlice.reducer;
