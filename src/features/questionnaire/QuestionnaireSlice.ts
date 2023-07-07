import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { fetchQuestionnaires, fetchQuestionnaireById, createQuestionnaire, updateQuestionnaire } from './QuestionnaireAPI';

export interface QuestionnaireState {
  questionnaireList: [];
  status: 'idle' | 'loading' | 'failed';
  questionnaireFormSubmitted: boolean;
  questionnaireFormErrors: string[];
}

const initialState: QuestionnaireState = {
  questionnaireList: [],
  status: 'idle',
  questionnaireFormSubmitted: false,
  questionnaireFormErrors: []
};

export const getQuestionnaires = createAsyncThunk(
  'questionnaire/fetchEmailDomains',
  async () => {
    const response = await fetchQuestionnaires();
    return response.data;
  }
);

export const getQuestionnaireById = createAsyncThunk(
  'questionnaire/fetchQuestionnaireById',
  async (staff_detail_txn_id: number) => {
    const response = await fetchQuestionnaireById(staff_detail_txn_id);
    return response.data;
  }
);

export const saveQuestionnaire = createAsyncThunk(
  'questionnaire/saveQuestionnaire',
  async (data: any) => {
    if (data.staff_detail_txn_id) {
      const response = await updateQuestionnaire(data.staff_detail_txn_id, data);
      return response.data;
    } else {
      const response = await createQuestionnaire(data);
      return response.data;
    }
  }
);

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setQuestionnaireList: (state, action: PayloadAction<[]>) => {
      state.questionnaireList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionnaires.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuestionnaires.fulfilled, (state, action) => {
        state.status = 'idle';
        state.questionnaireList = action.payload;
      })
      .addCase(getQuestionnaires.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(getQuestionnaireById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuestionnaireById.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getQuestionnaireById.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(saveQuestionnaire.pending, (state) => {
        state.status = 'loading';
        state.questionnaireFormSubmitted = false;
        state.questionnaireFormErrors = [];
      })
      .addCase(saveQuestionnaire.fulfilled, (state, action) => {
        state.status = 'idle';
        state.questionnaireFormSubmitted = true;
        state.questionnaireFormErrors = [];
      })
      .addCase(saveQuestionnaire.rejected, (state, action) => {
        state.status = 'failed';
        state.questionnaireFormSubmitted = false;
        state.questionnaireFormErrors = action.error.message ? [action.error.message] : [];
      });
  }
});

export const { setQuestionnaireList } = questionnaireSlice.actions;

export const selectQuestionnaireList = (state: RootState) => state.questionnaire.questionnaireList;
export const selectQuestionnaireFormSubmitted = (state: RootState) => state.questionnaire.questionnaireFormSubmitted;
export const selectQuestionnaireFormErrors = (state: RootState) => state.questionnaire.questionnaireFormErrors;


export default questionnaireSlice.reducer;
