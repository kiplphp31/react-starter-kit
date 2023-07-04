import { Navbar, Container, Nav } from "react-bootstrap";
import { brandLogo, brandName, projectTitle } from "../config";
import { Link } from "react-router-dom";


interface HeaderProps {
    brand: string;
}

export default function Header({ brand }: HeaderProps) {
    return (
        <>
            <style type="text/css">
                {`
                    .bg-dark {
                        background-color: #09268a!important;
                    }
                `}
            </style>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt={brandName[brand]}
                            src={brandLogo[brand]}
                        />
                        {projectTitle}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link to="/search" className="btn btn-outline-secondary">
                                <i className="bi bi-search"></i>
                            </Link>
                            <Link to="/help" className="btn btn-outline-secondary">
                                <i className="bi bi-question"></i>
                            </Link>
                            <Link to="/refresh" className="btn btn-outline-secondary">
                                <i className="bi bi-arrow-clockwise"></i>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}