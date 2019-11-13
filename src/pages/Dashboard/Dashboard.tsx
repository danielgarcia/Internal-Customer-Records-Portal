import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { routes } from '../../Routes';
import { getCustomers, IFilter } from '../../usecases/getCustomers';
import { Customer } from '../../core/Customer';

import { paymentHistoryMap } from '../../core/constants';

interface DashboardState {
    customers: Customer[];
    loading: boolean;
    total: number;
    count: number;
    page: number;
    filter: IFilter;
    searched: boolean;
}


class Dashboard extends React.Component<RouteComponentProps, DashboardState> {
    public constructor(props: RouteComponentProps) {
        super(props);
        this.onStringChange = this.onStringChange.bind(this);
        this.onNumberChange = this.onNumberChange.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    /**
     * State of the component
     */
    public readonly state: Readonly<DashboardState> = {
        customers: [],
        loading: false,
        total: 0,
        count: 20,
        page: 1,
        filter: {
            paymentHistory: undefined,
            name: undefined,
            linkedAccounts: undefined,
            vip: undefined,
        },
        searched: false,
    };

    public componentDidMount(): void {
        this.fetchCustomers(this.state.page, this.state.filter);
    }

    private goToPage(newPage: number): void {
        this.fetchCustomers(newPage, this.state.filter);
    }

    private fetchCustomers(page: number, filter: IFilter): void {
        this.setState({ loading: true });
        const { customers, total, count } = getCustomers(page, this.state.count, filter);
        this.setState({ customers, loading: false, total, page, count });
    }

    public onNumberChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let { filter } = this.state;
        filter.linkedAccounts = event.target.value === '' ? undefined : Number(event.target.value);
        this.setState({ filter, searched: true });
        this.fetchCustomers(1, filter);
    }

    public onStringChange(event: React.ChangeEvent<HTMLInputElement>): void {
        let { filter } = this.state;
        filter.name = event.target.value;
        this.setState({ filter, searched: true });
        this.fetchCustomers(1, filter);
    }

    public onSelectChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        let { filter } = this.state;
        filter.paymentHistory = event.target.value === '' ? undefined : event.target.value;
        this.setState({ ...this.state, filter, searched: true });
        this.fetchCustomers(1, filter);
    }

    private onCheckboxChange(value: string): void {
        let { filter } = this.state;
        if (typeof filter.vip === 'undefined') {
            filter.vip = value === 'vip' ? true : false;
        } else if (value === 'vip') {
            filter.vip = filter.vip ? undefined : true;
        } else {
            filter.vip = filter.vip ? false : undefined;
        }
        this.setState({ ...this.state, filter, searched: true });
        this.fetchCustomers(1, filter);
    }

    private renderCustomers(): JSX.Element {
        if (this.state.searched && !this.state.customers.length) {
            return <div className="results">No Customers Found</div>;
        }

        const CustomerList = this.state.customers.map(
            (customer, index): JSX.Element => (
                <Link to={routes.CustomerDetails.go(customer.id)} className="customer" key={index}>
                    <div className="name">{`${customer.name.first} ${customer.name.last}`} </div>
                    <div className="accounts">Number of linked bank accounts: <span>{customer.linkedFinancialInstitutions.length}</span></div>
                    <div className="vip">VIP: <span>{customer.managedClaims.vip ? 'YES' : 'NO'}</span></div>
                    <div className="history">Payment History: <span>{customer.verficationFlowHistory.length}</span></div>
                </Link>
            ),
        );

        return <div className="results">{CustomerList}</div>;
    }

    private renderPagination(): JSX.Element {
        const { total, page, count } = this.state;
        const pagination: JSX.Element[] = [];
        for (let i = 1; i <= (total / count); i++) {
            const pageUI: JSX.Element = (i === page) ? (<li key={i} className='active'>{i}</li>) : (<li key={i} onClick={this.goToPage.bind(this, i)}>{i}</li>);
            pagination.push(pageUI)
        }
        return <ul className="pagination">{pagination}</ul>;
    }

    public render(): JSX.Element {
        console.log(this.state);

        const pagination: JSX.Element[] = [];
        paymentHistoryMap.forEach((value, index): void => {
            pagination.push(<option key={index} value={value}>{value.split('_').join(' ')}</option>)
        })
        return (
            <div className="dashboard-page">

                <div className="left-block">
                    <h2>Search</h2>
                    <div className="search-block">
                        <div className="form-block">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Search"
                                onChange={this.onStringChange}
                                value={this.state.filter.name || ''}
                            />
                        </div>
                        <div className="form-block">
                            <label>Number of linked bank accounts</label>
                            <input
                                type="number"
                                placeholder="Amount"
                                onChange={this.onNumberChange}
                                value={typeof this.state.filter.linkedAccounts === 'undefined' ? '' : this.state.filter.linkedAccounts}
                            />
                        </div>
                        <div className="form-block">
                            <label>VIP Status</label>
                            <div className="checkbox-block">
                                <input
                                    type="checkbox"
                                    className="radio-box"
                                    name="unitsSuffix"
                                    value={this.state.filter.vip ? 1 : 0}
                                    onChange={this.onCheckboxChange.bind(this, 'vip')}
                                    checked={typeof this.state.filter.vip !== 'undefined' && this.state.filter.vip}
                                    id="isVIP"
                                />
                                <label htmlFor="isVIP">VIP</label>
                            </div>
                            <div className="checkbox-block">
                                <input
                                    type="checkbox"
                                    className="radio-box"
                                    name="unitsSuffix"
                                    value={this.state.filter.vip ? 0 : 1}
                                    onChange={this.onCheckboxChange.bind(this, 'nonvip')}
                                    checked={typeof this.state.filter.vip !== 'undefined' && !this.state.filter.vip}
                                    id="isNotVIP"
                                />
                                <label htmlFor="isNotVIP">Non-VIP</label>
                            </div>
                        </div>
                        <div className="form-block">
                            <label>Payment History</label>
                            <select name="" id="" onChange={this.onSelectChange}>
                                <option value="">Status</option>
                                {pagination}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="right-block">
                    <h2>Results</h2>
                    {this.renderCustomers()}

                    {this.renderPagination()}
                </div>

            </div>
        );
    }
}

export default Dashboard;
