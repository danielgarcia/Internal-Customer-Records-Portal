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

export interface ICandidate {
    id: string;
    name: IName;
    verficationFlowHistory: IVerficationFlowHistory[];
    customClaims: ICustomClaims;
    linkedFinancialInstitutions: IInstitutions[];
    managedClaims: IManagedClaims;
}

class Candidate {
    public constructor(candidate?: ICandidate) {
        if (candidate) {
            this.id = candidate.id;
            this.name = candidate.name;
            this.verficationFlowHistory = candidate.verficationFlowHistory;
            this.customClaims = candidate.customClaims;
            this.linkedFinancialInstitutions = candidate.linkedFinancialInstitutions;
            this.managedClaims = candidate.managedClaims;
        }
    }

    public id = '';
    public name = { first: '', last: '' };
    public verficationFlowHistory: IVerficationFlowHistory[] = [];
    public customClaims = { paymentHistory: '' };
    public linkedFinancialInstitutions: IInstitutions[] = [];
    public managedClaims = { vip: false };
}

export { Candidate };
