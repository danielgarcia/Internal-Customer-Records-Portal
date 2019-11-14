import * as React from 'react';
import moment from 'moment';

import { RouteComponentProps } from 'react-router-dom';
import { routes } from '../../Routes';

import { Customer } from '../../core/Customer';
import { getCustomer } from '../../usecases/getCustomer';
import { setCustomClaim } from '../../usecases/setCustomClaim';
import { paymentHistoryMap } from '../../core/constants';

interface Params {
    customerID: string;
}

interface CustomerState {
    customer: Customer;
}

class CustomerDetails extends React.Component<RouteComponentProps<Params>, CustomerState> {
    public constructor(props: RouteComponentProps<Params>) {
        super(props);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    /**
     * State of the component
     */
    public readonly state: Readonly<CustomerState> = {
        customer: new Customer(),
    };

    public componentDidMount(): void {
        const { customerID } = this.props.match.params;
        const customer = getCustomer(customerID);
        if (!customer) {
            this.props.history.push(routes.NotFound.route);
            return;
        }
        this.setState({ customer });
    }

    public onSelectChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        let { customer } = this.state;
        const selectedValue = event.target.value;

        if (setCustomClaim(customer.id, selectedValue)) {
            customer.customClaims.paymentHistory = selectedValue;
            this.setState({ customer });
        }
    }

    /**
     * Renders the Linked Financial Institutions List
     */
    private renderLinkedFinancial(): JSX.Element {
        if (!this.state.customer.linkedFinancialInstitutions.length) {
            return <div className="linkedFinancial center">No Linked Financial Institutions</div>;
        }

        const linkedFinancial = this.state.customer.linkedFinancialInstitutions.map(
            (institution, index): JSX.Element => (
                <div className="institution" key={index}>
                    <div className="institution-name">{institution.name} <i className="fa fa-caret-down" /></div>
                    <div className="institution-info">
                        <div className="accountNumber"><span className="title-text">Account Number</span>{institution.accountNumber}</div>
                        <div className="account"><span className="title-text">Type</span>{institution.account}</div>
                        <div className="linkedDate"><span className="title-text">Linked On</span>{moment(institution.linkedDate).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    </div>
                </div>
            ),
        );

        return (<div className="linkedFinancial">
            <div className="title">Linked Financial Institutions</div>
            <div className="block">{linkedFinancial}</div>
        </div>);
    }

    /**
     * Renders the Verification History List
     */
    private renderVerficationFlowHistory(): JSX.Element {
        if (!this.state.customer.verficationFlowHistory.length) {
            return <div className="verficationFlowHistory center">No Verfication Flow History</div>;
        }

        const verficationFlowHistory = this.state.customer.verficationFlowHistory.map(
            (verfication, index): JSX.Element => {
                const dayDifference: number = moment().diff(moment(verfication.date), 'days');
                return (
                    <div className={`verfication ${verfication.state}`} key={index}>
                        <div className="state">{verfication.state.split('_').join(' ')}</div>
                        <div className="date">
                            {dayDifference === 0 ? `Today at ${moment(verfication.date).format('h:mm:ss a')}` : `${dayDifference} days ago on ${moment(verfication.date).format('MMMM Do YYYY, h:mm:ss a')}`}
                        </div>
                    </div>
                );
            });

        return (<div className="verficationFlowHistory">{verficationFlowHistory}</div>);
    }

    /**
     * Renders the Next Payment Block
     */
    private renderNextPayment(): JSX.Element {
        const { customer } = this.state;
        const dayDifference: number = moment(customer.nextPaymentDate).diff(moment(), 'days');
        if (!moment(customer.nextPaymentDate).isValid() || dayDifference < 0) {
            return <div className="nextPaymentDate center">No Next Payment Available</div>;
        }

        const inDays: JSX.Element = (<span className="indays"> {dayDifference === 0 ? '(Today)' : `(In ${moment(customer.nextPaymentDate).diff(moment(), 'days')} days)`}</span>);
        return (
            <div className="nextPaymentDate">
                <div className="title">Next Payment {inDays}</div>
                <div className="block date">
                    On {moment(customer.nextPaymentDate).format('MMMM Do YYYY, h:mm:ss a')}
                </div>
            </div>
        );
    }

    /**
     * Renders the Custom Claims Block
     */
    private renderCustomClaims(): JSX.Element {
        const { customer } = this.state;

        const options: JSX.Element[] = [];
        paymentHistoryMap.forEach((value, index): void => {
            options.push(<option key={index} value={value}>{value.split('_').join(' ')}</option>)
        });

        return (
            <div className="customClaims">
                <div className="title">Custom Claims</div>
                <div className="block">
                    <label>Payment History</label>
                    <select onChange={this.onSelectChange} value={customer.customClaims.paymentHistory}>
                        {options}
                    </select>
                </div>
            </div>
        );
    }

    public render(): JSX.Element {
        const { customer } = this.state;
        console.log(customer)
        return (
            <div className="customer-page">
                <div className="left-block">
                    <h2>Customer Information</h2>
                    <div className="customer-block">
                        <div className="name">
                            {customer.name.first} {customer.name.last} {customer.managedClaims.vip ? (<div className="vip-badge"><span>VIP</span><i className="fas fa-certificate" /></div>) : null}
                        </div>

                        {this.renderCustomClaims()}
                        {this.renderNextPayment()}
                        {this.renderLinkedFinancial()}
                    </div>
                </div>

                <div className="right-block">
                    <h2>Verfication History</h2>
                    {this.renderVerficationFlowHistory()}
                </div>
            </div>
        );
    }
}

export default CustomerDetails;
