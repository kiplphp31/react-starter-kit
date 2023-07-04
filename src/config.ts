
export const brandName: any = {
    RBS: 'Royal Bank of Scotland',
    NatWest: 'NatWest'
};


export const brandNameShort: any = {
    RBS: 'RBS',
    NatWest: 'NW'
};

export const brandLogo: any = {
    RBS: 'https://www.rbs.com/content/dam/rbs/Images/Logos/rbs-logo.png',
    NatWest: 'https://www.natwestgroup.com/content/dam/natwestgroup/images/logos/natwest-logo.png'
};

export const projectTitle = 'Deposit Finder'

export const employeeInfoApi = process.env.REACT_APP_EMPLOYEE_INFO_API || 'http://localhost:5000/api/employeeInfo';

export const customerInfoApi = process.env.REACT_APP_CUSTOMER_INFO_API || 'http://localhost:5001/api/customerInfo';