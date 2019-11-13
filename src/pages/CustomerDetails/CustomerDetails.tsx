import * as React from 'react';

import { RouteComponentProps } from 'react-router-dom';
import { Customer } from '../../core/Customer';
import { getCustomer } from '../../usecases/getCustomer';

interface Params {
    customerID: string;
}

interface CustomerState {
    customer: Customer;
    loading: boolean;
}

class CustomerDetails extends React.Component<RouteComponentProps<Params>, CustomerState> {


    /**
     * State of the component
     */
    public readonly state: Readonly<CustomerState> = {
        customer: new Customer(),
        loading: false,
    };

    public async componentDidMount(): Promise<void> {
        this.setState({ loading: true });
        const { customerID } = this.props.match.params;
        const { customer } = getCustomer(customerID);
        this.setState({ customer, loading: false });
    }

    public render(): JSX.Element {
        return (
            <div className="customer-page">
                {this.state.customer.name.first}
            </div>
        );
    }
}

export default CustomerDetails;
