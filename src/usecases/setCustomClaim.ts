import { Customer, ICustomer } from '../core/Customer';

import customersStore from '../model/customers';

/**
 * Sets a customer custom claim.
 * @returns {boolean} return true if success.
 */
const setCustomClaim = (id: string, claim: string): boolean => {
    return customersStore.updateClaim(id, claim);
};

export { setCustomClaim };
