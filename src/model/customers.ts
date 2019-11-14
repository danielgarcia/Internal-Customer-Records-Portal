import { Customer, ICustomer } from '../core/Customer';
import outsideData from '../customers.json';

class Customers {
    constructor() {
        outsideData.forEach((customer): void => {
            this.customers.push(new Customer(customer as ICustomer));
        });
    }

    private customers: Customer[] = [];

    public updateClaim(id: string, claim: string): boolean {
        for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].id === id) {
                this.customers[i].customClaims.paymentHistory = claim;
                return true;
            }
        }

        return false;
    }

    public getAll(): Customer[] {
        return this.customers;
    }

    public getCustomer(id: string): Customer | null {
        return this.customers.find((customer): boolean => customer.id === id) || null;
    }
}

export default new Customers();