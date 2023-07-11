import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styles from './Questionnaire.module.scss';
import { getQuestionnaires, saveQuestionnaire, selectQuestionnaireList, selectQuestionnaireFormSubmitted, selectQuestionnaireFormErrors } from './QuestionnaireSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Navigate, useNavigate } from 'react-router-dom';


function Questionnaire() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [currentQuestionnaire, setCurrentQuestionnaire] = useState<any>({});
    const [currentQuestionnaireId, setCurrentQuestionnaireId] = useState<any>(0);
    const [currentQuestionnaireType, setCurrentQuestionnaireType] = useState<string>('');
    const [nextQuestionTxnId, setNextQuestionTxnId] = useState<any>(0);
    const questionnaireList = useAppSelector(selectQuestionnaireList) as any[];
    const questionnaireFormSubmitted = useAppSelector(selectQuestionnaireFormSubmitted);
    const questionnaireFormErrors = useAppSelector(selectQuestionnaireFormErrors);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getQuestionnaires());
    }, []);

    useEffect(() => {
        const urlQuery = new URLSearchParams(window.location.search);
        const questionnaireId = urlQuery.get('questionId');
        let currentQuestionnaire = questionnaireList[0];
        if (questionnaireList && questionnaireList.length > 0) {
            if (questionnaireId) {
                setCurrentQuestionnaireId(Number(questionnaireId));
                currentQuestionnaire = questionnaireList.find(q => q.question_txn_id === Number(questionnaireId));
                currentQuestionnaire = currentQuestionnaire || questionnaireList[0];
            }
            setCurrentQuestionnaire(currentQuestionnaire);
            setCurrentQuestionnaireType(currentQuestionnaire.options[0].resp_type);
        }
    }, [questionnaireList]);

    const handelSubmit = (reqData: any, next_question_txn_id: any) => {
        dispatch(saveQuestionnaire(reqData));
        setNextQuestionTxnId(next_question_txn_id);
    };

    useEffect(() => {
        if (questionnaireFormSubmitted) {
            if (questionnaireFormErrors.length > 0) {
                setErrors(questionnaireFormErrors);
            } else {
                if (nextQuestionTxnId > 0) {
                    navigate(`/questionnaire?questionId=${nextQuestionTxnId}`);
                } else {
                    navigate(`/employeeInfo`);
                }
            }
        }
    }, [questionnaireFormSubmitted, questionnaireFormErrors]);



    return (
        <>
            <h1>Questionnaire</h1>
            <Form noValidate validated={validated}>
                {errors.map((error, index) => (
                    <p key={index} className={styles.showError}>{error}</p>
                ))}
                <div className={styles.formFields}>
                    <Row className="mb-3">
                        {/* <h3>{currentQuestionnaire.}</h3> */}

                    </Row>
                </div>

                <Button type="button" onClick={() => { navigate(-1) }} className={styles.pullLeft} >Back</Button>
                {currentQuestionnaireType === 'Text Box' && <Button type="submit" className={styles.pullRight}>Next</Button>}


            </Form>
        </>

    );
}

export default Questionnaire;