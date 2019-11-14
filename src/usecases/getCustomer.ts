import { Customer } from '../core/Customer';

import customersStore from '../model/customers';

/**
 * Get the customers list.
 * @returns {{ customer: Customer }} .
 */
const getCustomer = (id: string): Customer | null => {
    const customer = customersStore.getCustomer(id);

    return customer;
};

export { getCustomer };
