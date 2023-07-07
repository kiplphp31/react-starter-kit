import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employeeInfoReducer from '../features/employeeInfo/EmployeeInfoSlice';
import customerInfoReducer from '../features/customerInfo/CustomerInfoSlice';
import questionnaireReducer from '../features/questionnaire/QuestionnaireSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    employeeInfo: employeeInfoReducer,
    customerInfo: customerInfoReducer,
    questionnaire: questionnaireReducer,
    auth: authReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
