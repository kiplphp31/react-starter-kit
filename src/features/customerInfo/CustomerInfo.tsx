import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import styles from './CustomerInfo.module.scss';
import { getEmailDomains, saveCustomerInfo, selectEmailDomainList, selectCustomerInfoFormSubmitted, selectCustomerInfoFormErrors } from './CustomerInfoSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

export interface CustomerInfoForm {
    tng_id?: string;
    interviewer_first_name: string;
    interviewer_last_name: string;
    interviewer_email_id: string;
    email_domain_ref_id: number;
    salary_reference: string;
    segment_type_ref_id: number;
    audit_who: string;
}

function CustomerInfo() {
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [customerInfoForm, setCustomerInfoForm] = useState<CustomerInfoForm>({
        interviewer_first_name: '',
        interviewer_last_name: '',
        interviewer_email_id: '',
        email_domain_ref_id: 0,
        salary_reference: '',
        segment_type_ref_id: 0,
        audit_who: 'EUROPA/SAHAAP'
    });

    const emailDomainList = useAppSelector(selectEmailDomainList);
    const customerInfoFormSubmitted = useAppSelector(selectCustomerInfoFormSubmitted);
    const customerInfoFormErrors = useAppSelector(selectCustomerInfoFormErrors);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getEmailDomains());
    }, []);

    const handleChange = (event: { currentTarget: any; }) => {
        const { name, value } = event.currentTarget;
        setCustomerInfoForm({ ...customerInfoForm, [name]: value });
        setErrors([]);
    };

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            const errorMessages: string[] = [];
            for (let i = 0; i < form.length; i++) {
                if (form[i].validity.valid === false) {
                    const label = form[i]?.labels[0]?.innerText || '';
                    errorMessages.push(label + " " + form[i].validationMessage);
                }
            }
            setErrors(errorMessages);
        } else {
            setErrors([]);
            setValidated(true);
            dispatch(saveCustomerInfo(customerInfoForm));

        }

    };

    if (customerInfoFormSubmitted) {
        return <Navigate to='/customerInfo' replace={true} />
    }
    if (customerInfoFormErrors && customerInfoFormErrors.length > 0) {
        customerInfoFormErrors.forEach((error: any) => {
            setErrors((errors) => [...errors, error.message]);
        }
        );
    }

    return (
        <>
            <h1>Customer Information</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {errors.map((error, index) => (
                    <p key={index} className={styles.showError}>{error}</p>
                ))}
                <div className={styles.formFields}>
                    <Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="6" controlId="interviewer_first_name">
                            <Form.Label>Interviewer's forename:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='interviewer_first_name'
                                value={customerInfoForm.interviewer_first_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} className={styles.required} md="6" controlId="interviewer_last_name">
                            <Form.Label>Interviewer's surname:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='interviewer_last_name'
                                value={customerInfoForm.interviewer_last_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="6" controlId="interviewer_email_id">
                            <Form.Label>Interviewer's email address:</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    name='interviewer_email_id'
                                    value={customerInfoForm.interviewer_email_id}
                                    onChange={handleChange}
                                />
                                <InputGroup.Text className={styles.inputGroupPrepend}>@</InputGroup.Text>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='email_domain_ref_id'
                                    onChange={handleChange}
                                >
                                    {emailDomainList && emailDomainList.map((emailDomain: any, index) => (
                                        <option key={index} value={emailDomain.id}>{emailDomain.name}</option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} className={styles.required} md="6" controlId="salary_reference">
                            <Form.Label>Interviewer's salary reference number:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='salary_reference'
                                value={customerInfoForm.salary_reference}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="6" controlId="segment_type_ref_id">
                            <Form.Label>Segment:</Form.Label>
                            <Form.Check
                                required
                                type="radio"
                                label="Business"
                                name="segment_type_ref_id"
                                value="1"
                                onChange={handleChange}
                            />
                            <Form.Check
                                required
                                type="radio"
                                label="Commercial"
                                name="segment_type_ref_id"
                                value="2"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                </div>
                <p className={styles.guideText}>Fields marked with <span className={styles.red}>*</span> must be completed.</p>

                <Button type="submit" className={styles.pullRight}>Save</Button>
            </Form>
        </>

    );
}

export default CustomerInfo;