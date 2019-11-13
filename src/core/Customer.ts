export interface IInstitutions {
    account: string;
    accountNumber: string;
    linkedDate: string;
    name: string;
}

export interface IVerficationFlowHistory {
    state: string;
    date: string;
}

export interface ICustomClaims {
    paymentHistory: string;
}

export interface IManagedClaims {
    vip: boolean;
}

export interface IName {
    first: string;
    last: string;
}

export interface ICustomer {
    id: string;
    name: IName;
    verficationFlowHistory: IVerficationFlowHistory[];
    customClaims: ICustomClaims;
    linkedFinancialInstitutions: IInstitutions[];
    managedClaims: IManagedClaims;
    nextPaymentDate: string;
}

class Customer {
    public constructor(customer?: ICustomer) {
        if (customer) {
            this.id = customer.id;
            this.name = customer.name;
            this.verficationFlowHistory = customer.verficationFlowHistory;
            this.customClaims = customer.customClaims;
            this.linkedFinancialInstitutions = customer.linkedFinancialInstitutions;
            if (typeof customer.managedClaims.vip !== 'undefined') {
                this.managedClaims = customer.managedClaims;
            }
            this.nextPaymentDate = customer.nextPaymentDate;
        }
    }

    public id = '';
    public name = { first: '', last: '' };
    public verficationFlowHistory: IVerficationFlowHistory[] = [];
    public customClaims = { paymentHistory: '' };
    public linkedFinancialInstitutions: IInstitutions[] = [];
    public managedClaims = { vip: false };
    public nextPaymentDate = '';
}

export { Customer };
