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
    const questionnaireList = useAppSelector(selectQuestionnaireList) as any[];
    const questionnaireFormSubmitted = useAppSelector(selectQuestionnaireFormSubmitted);
    const questionnaireFormErrors = useAppSelector(selectQuestionnaireFormErrors);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getQuestionnaires());
    }, []);

    useEffect(() => {
        if (questionnaireList && questionnaireList.length > 0) {
            setCurrentQuestionnaire(questionnaireList[0]);
        }
    }, [questionnaireList]);



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

                <Button type="button" onClick={() => { navigate(-1) }} >Back</Button>

                <Button type="submit" className={styles.pullRight}>Save</Button>
            </Form>
        </>

    );
}

export default Questionnaire;