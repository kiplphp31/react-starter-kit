
import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';

export default function NavbarComponent() {
    const [items, setItems] = useState<any>({
        employeeInfo: {
            label: 'Employee info',
            active: false,
            disabled: true
        },
        customerInfo: {
            label: 'Customer info',
            active: false,
            disabled: true
        },
        questionnaire: {
            label: 'Questionnaire',
            active: false,
            disabled: true
        },
        products: {
            label: 'Products',
            active: false,
            disabled: true
        },
        summary: {
            label: 'Summary',
            active: false,
            disabled: true
        }
    });

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath) {
            for (const key in items) {
                if (currentPath.includes(key) || (currentPath === '/' && key === 'employeeInfo')) {
                    items[key].active = true;
                    break;
                } else {
                    items[key].active = false;
                    items[key].disabled = false;
                }
            }
            setItems({ ...items });
        }
    }, []);


    return (
        <>
            <style type="text/css">
                {`
                    .nav-tabs  {
                        margin: 30px 0 10px 0;
                    }
                `}
            </style>
            <Nav fill variant="tabs" >
                {Object.keys(items).map((key, index) => {
                    const item = items[key];
                    return (
                        <Nav.Item key={index}>
                            <Nav.Link
                                active={item.active}
                                disabled={item.disabled}
                            >
                                {item.label}
                            </Nav.Link>
                        </Nav.Item>
                    );
                }
                )}
            </Nav>
        </>
    );
}