import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import styles from './CustomerInfo.module.scss';
import { saveCustomerInfo, selectCustomerInfoFormSubmitted, selectCustomerInfoFormErrors } from './CustomerInfoSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Link, Navigate } from 'react-router-dom';

export interface CustomerInfoForm {
    staff_detail_txn_id: number;
    audit_who: string;
    individual_first_name: string;
    individual_last_name: string;
    individual_email_address: string;
    is_unknown_email_address: number;
    customer_name: string;
    account_name: string;
    is_new_customer: number;
    cin_or_bin?: string;
    is_execution_Only: number;

}

function CustomerInfo() {
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [customerInfoForm, setCustomerInfoForm] = useState<CustomerInfoForm>({
        staff_detail_txn_id: 0,
        audit_who: 'EUROPA/SAHAAP',
        individual_first_name: '',
        individual_last_name: '',
        individual_email_address: '',
        is_unknown_email_address: 0,
        customer_name: '',
        account_name: '',
        is_new_customer: 0,
        cin_or_bin: '',
        is_execution_Only: 0
    });
    const [haveCinOrBin, setHaveCinOrBin] = useState(0);

    const customerInfoFormSubmitted = useAppSelector(selectCustomerInfoFormSubmitted);
    const customerInfoFormErrors = useAppSelector(selectCustomerInfoFormErrors);
    const dispatch = useAppDispatch();


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
                        <Form.Group as={Col} className={styles.required} md="6" controlId="individual_first_name">
                            <Form.Label>Individual's forename:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='individual_first_name'
                                value={customerInfoForm.individual_first_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} className={styles.required} md="6" controlId="individual_last_name">
                            <Form.Label>Individual's surname:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='individual_last_name'
                                value={customerInfoForm.individual_last_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="8" controlId="individual_email_address">
                            <Form.Label>Individual's email address:</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name='individual_email_address'
                                value={customerInfoForm.individual_email_address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="is_unknown_email_address">
                            <Form.Label>Email address unknown</Form.Label>
                            <Form.Check
                                type="checkbox"
                                name='is_unknown_email_address'
                                checked={customerInfoForm.is_unknown_email_address === 1}
                                onChange={(e: any) => setCustomerInfoForm({ ...customerInfoForm, is_unknown_email_address: e.target.checked ? 1 : 0 })}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="6" controlId="customer_name">
                            <Form.Label>Customer business name:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='customer_name'
                                value={customerInfoForm.customer_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="account_name">
                            <Form.Label>Business account name (if different):</Form.Label>
                            <Form.Control
                                type="text"
                                name='account_name'
                                value={customerInfoForm.account_name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="6" controlId="is_new_customer">
                            <Form.Label>Customer status:</Form.Label>
                            <div className='flexBox'>
                                <Form.Check
                                    required
                                    type="radio"
                                    name='is_new_customer'
                                    label="New customer"
                                    checked={customerInfoForm.is_new_customer === 0}
                                    onChange={(e: any) => setCustomerInfoForm({ ...customerInfoForm, is_new_customer: 0 })}
                                />
                                <Form.Check
                                    required
                                    type="radio"
                                    name='is_new_customer'
                                    label="Existing customer"
                                    checked={customerInfoForm.is_new_customer === 1}
                                    onChange={(e: any) => setCustomerInfoForm({ ...customerInfoForm, is_new_customer: 1 })}
                                />
                            </div>
                        </Form.Group>
                    </Row>
                    {(customerInfoForm.is_new_customer === 1) && (<Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="6" controlId="have_cin_or_bin">
                            <Form.Label>Do you have a CIN or BIN?</Form.Label>
                            <div className='flexBox'>
                                <Form.Check
                                    required
                                    type="radio"
                                    name='have_cin_or_bin'
                                    label="Yes"
                                    checked={haveCinOrBin === 1}
                                    onChange={(e: any) => setHaveCinOrBin(1)}
                                />
                                <Form.Check
                                    required
                                    type="radio"
                                    name='have_cin_or_bin'
                                    label="No"
                                    checked={haveCinOrBin === 0}
                                    onChange={(e: any) => setHaveCinOrBin(0)}
                                />
                            </div>
                        </Form.Group>
                        {haveCinOrBin === 1 ? (<Form.Group as={Col} className={styles.required} md="6" controlId="cin_or_bin">
                            <Form.Label>CIN or BIN:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='cin_or_bin'
                                value={customerInfoForm.cin_or_bin}
                                onChange={handleChange}
                            />
                        </Form.Group>) : null}

                    </Row>)
                    }

                    <Row className="mb-3">
                        <Form.Group as={Col} className={styles.required} md="6">
                            <Form.Check
                                type="checkbox"
                                name='is_execution_Only'
                                checked={customerInfoForm.is_execution_Only === 1}
                                onChange={(e: any) => setCustomerInfoForm({ ...customerInfoForm, is_execution_Only: e.target.checked ? 1 : 0 })}

                                label="Execution only?"
                            />
                        </Form.Group>
                    </Row>
                </div>
                <p className={styles.guideText}>Fields marked with <span className={styles.red}>*</span> must be completed.</p>

                <Link to="/t2" className={styles.pullLeft}>Back</Link>
                <Button type="submit" className={styles.pullRight}>Save</Button>
            </Form>
        </>

    );
}

export default CustomerInfo;