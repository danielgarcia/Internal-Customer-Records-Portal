import { Customer } from '../core/Customer';

import customersStore from '../model/customers';

export interface IFilter {
    paymentHistory?: string;
    name?: string;
    linkedAccounts?: number;
    vip?: boolean;
}

/**
 * Get the customers list.
 * @returns {{ customers: Customer[], total: number, page: number, count: number  }} .
 */
const getCustomers = (page: number = 1, count: number = 20, filter: IFilter): { customers: Customer[], total: number, page: number, count: number } => {
    const customers: Customer[] = [];
    let customersData = customersStore.getAll();
    let total = 0;

    // Filter out by name
    if (filter.name) {
        const name = filter.name.toLowerCase();
        customersData = customersData.filter(customer => {
            const fullname = customer.name.first + ' ' + customer.name.last;
            return fullname.toLowerCase().indexOf(name) !== -1;
        });
    }

    // Filter out linked Accounts
    if (typeof filter.linkedAccounts !== 'undefined') {
        customersData = customersData.filter(customer => customer.linkedFinancialInstitutions.length === filter.linkedAccounts)
    }

    // Filter out vips
    if (typeof filter.vip !== 'undefined') {
        customersData = customersData.filter(customer => {
            if (filter.vip) {
                return customer.managedClaims.vip === filter.vip;
            }
            return !customer.managedClaims.vip;
        })
    }

    // Filter out paymentHistory
    if (typeof filter.paymentHistory !== 'undefined') {
        customersData = customersData.filter(customer => customer.customClaims.paymentHistory === filter.paymentHistory)
    }

    // Slice to requested count
    total = customersData.length;
    customersData = customersData.slice((count * (page - 1)), (count * page));

    customersData.forEach((customer): void => {
        customers.push(new Customer(customer));
    });

    return { customers, total, page, count };
};

export { getCustomers };
