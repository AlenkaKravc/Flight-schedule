import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from './style.scss';
import {Footer} from '../footer';

import classnames from 'classnames';


import search from '../../assets/media/search.png';
import arrivals from '../../assets/media/arrivals.png';
import arrivals_delay from '../../assets/media/arrivals_delay.png';
import departures from '../../assets/media/departures.png';


class FeedUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            isOpenAll: true,
            isOpenArrivals: false,
            isOpenDepartures: false,
            isOpenDelayed: false,
            filterFlights: this.props.flights,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filterFlight = this.filterFlight.bind(this);
        this.openAll = this.openAll.bind(this);
        this.openArrivals = this.openArrivals.bind(this);
        this.openDepartures = this.openDepartures.bind(this);
        this.openDelayed = this.openDelayed.bind(this);
        this.sort = this.sort.bind(this);

    };

    componentWillMount() {
        this.setState({
            filterFlights: this.props.flights,
        });
        this.sort();
    }


    filterFlight() {
        if (this.state.isOpenAll) {
            this.openAll();
        }
        if (this.state.isOpenArrivals) {
            this.openArrivals();
        }
        if (this.state.isOpenDepartures) {
            this.openDepartures();
        }
        if (this.state.isOpenDelayed) {
            this.openDelayed();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.filterFlight();
    }

    handleChange(e) {
        this.setState({
            searchText: e.target.value,
        });
    }

    sort() {
        this.setState({
            filterFlight: this.state.filterFlights.sort((a, b) => a.time.localeCompare(b.time)),
        });
    }

    openAll() {
        let reg = new RegExp(this.state.searchText);
        this.setState({
            isOpenAll: true,
            isOpenArrivals: false,
            isOpenDepartures: false,
            isOpenDelayed: false,
            filterFlights: (this.state.searchText.length > 0) ?
                this.props.flights.filter((flight) => reg.test(flight.number)) :
                this.props.flights,
        });
        this.sort();
    }


    openArrivals() {
        let reg = new RegExp(this.state.searchText);
        this.setState({
            isOpenAll: false,
            isOpenArrivals: true,
            isOpenDepartures: false,
            isOpenDelayed: false,
            filterFlights: (this.state.searchText.length > 0) ?
                this.props.flights.filter((flight) => flight.type === "Arrivals").filter((flight) => reg.test(flight.number)) :
                this.props.flights.filter((flight) => flight.type === "Arrivals"),
        });
        this.sort();
    }

    openDepartures() {
        let reg = new RegExp(this.state.searchText);
        this.setState({
            isOpenAll: false,
            isOpenArrivals: false,
            isOpenDepartures: true,
            isOpenDelayed: false,
            filterFlights: (this.state.searchText.length > 0) ?
                this.props.flights.filter((flight) => flight.type === "Departures")
                    .filter((flight) => reg.test(flight.number)) :
                this.props.flights.filter((flight) => flight.type === "Departures"),
        });
        this.sort();
    }

    openDelayed() {
        let reg = new RegExp(this.state.searchText);
        this.setState({
            isOpenAll: false,
            isOpenArrivals: false,
            isOpenDepartures: false,
            isOpenDelayed: true,
            filterFlights: (this.state.searchText.length > 0) ?
                this.props.flights.filter((flight) => (flight.type === "Arrivals") && (flight.delay))
                    .filter((flight) => reg.test(flight.number)) :
                this.props.flights.filter((flight) => (flight.type === "Arrivals") && (flight.delay))
        });
        this.sort();
    }

    render() {
        return (
            <div className={styles.fullPageBack}>
                <div className={styles.fullPageContent}>
                    <div className={styles.fullPage}>
                        <div className={classnames(styles.flightComponent, styles.panel)}>
                            <form onSubmit={e => this.handleSubmit(e)} className={styles.headerSearchForm}>
                                <img src={search} alt='search' className={styles.headerSearchImg}
                                     onClick={() => this.filterFlight()}/>
                                <input type='text'
                                       className={styles.headerSearchFromInput}
                                       value={this.state.searchText}
                                       maxLength={4}
                                       placeholder={"Search by flight number"}
                                       onChange={e => this.handleChange(e)}/>
                            </form>
                            <div className={styles.buttonNavigateSearch}
                                 onClick={() => this.filterFlight()}>
                                Search
                            </div>
                            <div className={!this.state.isOpenAll ? styles.buttonNavigate : styles.buttonNavigateActive}
                                 onClick={() => this.openAll()}>
                                All
                            </div>
                            <div
                                className={!this.state.isOpenDepartures ? styles.buttonNavigate : styles.buttonNavigateActive}
                                onClick={() => this.openDepartures()}>
                                Departures
                            </div>
                            <div
                                className={!this.state.isOpenArrivals ? styles.buttonNavigate : styles.buttonNavigateActive}
                                onClick={() => this.openArrivals()}>
                                Arrivals
                            </div>
                            <div
                                className={!this.state.isOpenDelayed ? styles.buttonNavigate : styles.buttonNavigateActive}
                                onClick={() => this.openDelayed()}>
                                Delayed
                            </div>

                        </div>
                        {this.state.filterFlights.map((flight, index) =>
                            <div key={index} className={styles.flightComponent}>
                                <Flight flight={flight}/>
                            </div>
                        )}
                        {this.state.filterFlights.length === 0 &&
                        <div className={styles.message}>
                            Your search returned no results.
                        </div>}
                    </div>

                </div>
                <Footer/>
            </div>
        );
    }
}

const Flight = ({flight}) => <div className={styles.flight}>
    <img src={flight.type === "Departures" ? departures :
        (!flight.delay ? arrivals : arrivals_delay)} alt='type_flight' className={styles.typeFlightImg}/>
    <div className={styles.timeFlight}>
        {flight.time}
    </div>
    <div className={styles.titleFlight}>
        {flight.title}
    </div>
    <div className={styles.numberFlight}>
        {flight.number}
    </div>
    <div className={styles.terminalFlight}>
        {flight.terminal}
    </div>
</div>;


export const Feed = connect(
    store => ({
        flights: store.flights,
    }),
)(FeedUI);