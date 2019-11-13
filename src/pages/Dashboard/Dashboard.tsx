import * as React from 'react';
import data from '../../customers.json';

class Dashboard extends React.Component {

    public render(): JSX.Element {
        console.log(data)
        return (
            <div className="dashboard-page">

                <div className="left-block">
                    <h2>Search</h2>
                    <div className="search-block">
                        <div className="form-block">
                            <label>Name</label>
                            <input type="text" placeholder="Search" value="" />
                        </div>
                        <div className="form-block">
                            <label>Number of linked bank accounts</label>
                            <input type="text" placeholder="Amount" value="" />
                        </div>
                        <div className="form-block">
                            <label>VIP Status</label>
                            VIP <input type="checkbox" />
                            Non-VIP <input type="checkbox" />
                        </div>
                        <div className="form-block">
                            <label>Payment History</label>
                            <select name="" id="">
                                <option value="">Status</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="right-block">
                    <h2>Results</h2>
                    <ul className="results">
                        <li>
                            <div>Name <br /> Number of linked bank accounts: 2</div>
                            <div>VIP: No</div>
                            <div>Payment History: [value]</div>
                            <div><button>Details</button></div>
                        </li>
                    </ul>

                    <ul className="pagination">
                        <li> back </li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li> next </li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default Dashboard;
