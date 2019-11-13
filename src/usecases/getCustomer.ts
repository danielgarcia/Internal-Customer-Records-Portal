import { Customer, ICustomer } from '../core/Customer';
import outsideData from '../customers.json';

/**
 * Get the customers list.
 * @returns {{ customer: Customer }} .
 */
const getCustomer = (id: string): { customer: Customer } => {

    const customer = outsideData.find(function (customer) {
        return customer.id === id;
    }) as ICustomer;

    return { customer: new Customer(customer) };
};

export { getCustomer };
