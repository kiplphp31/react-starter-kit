import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import EmployeeInfo from './features/employeeInfo/EmployeeInfo';
import CustomerInfo from './features/customerInfo/CustomerInfo';
import Header from './components/header';
import NavbarComponent from './components/navbar';
import { Container, Row, Col } from 'react-bootstrap';
import Questionnaire from './features/questionnaire/Questionnaire';

function App() {
    const queryString = new URLSearchParams(window.location.search);
    let brand = 'company1';
    if (queryString.has('brand')) {
        brand = queryString.get('brand') || 'company1';
    }
    return (
        <div className="App">
            <Header brand={brand} />
            <Container fluid="md">
                <Row>
                    <Col>
                        <NavbarComponent />
                        <Routes>
                            <Route
                                path="/t"
                                element={
                                    <PrivateRoute>
                                        <EmployeeInfo />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/t2"
                                element={
                                    <PrivateRoute>
                                        <CustomerInfo />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <Questionnaire />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/unauthorized" element={<><h2>You are not authorized to access this application</h2></>} />
                        </Routes>

                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default App;
