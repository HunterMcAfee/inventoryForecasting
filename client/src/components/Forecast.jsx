import React, { Component } from 'react'
import SearchInfo from './SearchInfo.jsx'
import WeekdropdownStr from './WeekdropdownStr'
import WeekdropdownEnd from './WeekdropdownEnd'
import ForecastChart from './ForecastChart'
import axios from 'axios';

export default class Forecast extends Component {

    constructor() {
        super();
        this.state = ({
            show: false,
            factors: [],
            strType: "Store Type",
            factorTxt: "Factor",
            weekStr: "Week Start",
            weekEd: "Week End",
            pastInfo: [],
            forecastInfo: [],
            disableEndYear: true,
        })
        this.changeFactorText = this.changeFactorText.bind(this);
    }

    componentDidMount() {
        // make axios call to our backend for all str incase new factors have been added
        axios.post('http://35.237.25.64:8081/factors')
            .then((res) => {
                this.setState({
                    factors: res.data
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    handleSubmit = (event) => {
        event.preventDefault();
        let str = document.getElementById('str').value;
        let sku = document.getElementById('sku').value;
        let yearStart = document.getElementById('yearStart').value;
        if (yearStart === "") {
            yearStart = (new Date()).getFullYear() - 1;
        }
        let yearEnd = document.getElementById('yearEnd').value;
        if (yearEnd === "") {
            yearEnd = yearStart
        }
        let factor = this.state.factorTxt;
        if (factor === "Factor") {
            factor = ""
        }
        let type = this.state.strType;
        if (type === "Store Type") {
            type = ""
        }
        let weekStart = this.state.weekStr;
        if (weekStart === "Week Start") {
            weekStart = 0
        }
        let weekEnd = this.state.weekEd;
        if (weekEnd === "Week End") {
            weekEnd = weekStart
        }

        let searchParams = {
            str: str,
            sku: sku,
            type: type,
            factor: factor,
            weekStart: weekStart,
            yearStart: yearStart,
            weekEnd: weekEnd,
            yearEnd: yearEnd
        }

        axios.post('http://35.237.25.64:8081/past', searchParams)
            .then((res) => {
                this.setState({
                    pastInfo: res.data
                })
                this.requestForecast(searchParams);
            })
            .catch((error) => {
                console.log(error);
            })

        axios.post('http://35.237.25.64:8081/factorMultiplier', searchParams)
            .then((res) => {
                if (res.data.length > 0) {
                    let multiplierData = res.data;
                    let factorMultiplier = 0;
                    multiplierData.forEach((multiplier) => {
                        if (multiplier.sf_sign === true) {
                            factorMultiplier += multiplier.sf_percentvalue;
                        } else if (multiplier.sf_sign === false) {
                            factorMultiplier -= multiplier.sf_percentvalue;
                        }
                    })
                    factorMultiplier = ((factorMultiplier / res.data.length) / 100);
                    this.setState({
                        factorMultiplier: factorMultiplier
                    })
                } else {
                    alert("No factor data is available. Showing available schemes.");
                    this.setState({
                        factorTxt: "Factor"
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
        this.setState({
            show: true
        })
    }

    requestForecast = (searchParams) => {
        let payload = {
            searchParams,
            pastInfoResults: this.state.pastInfo
        }
        axios.post('http://35.237.25.64:8081/forecast', payload)
            .then((res) => {
                this.setState({
                    forecastInfo: res.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    changeTypeText(letter) {
        this.setState({
            strType: letter
        })
    }

    changeFactorText(event) {
        let fct = event.target.innerHTML;
        this.setState({
            factorTxt: fct
        })
    }

    changeWeekStart = (event) => {
        let str = event.target.innerHTML;
        this.setState({
            weekStr: str
        })
    }

    changeWeekEnd = (event) => {
        let ed = event.target.innerHTML;
        this.setState({
            weekEd: ed
        })
    }

    enableEndYear = (event) => {

       event.preventDefault();
       
       if(event.target.value === ""){
            document.getElementById('yearEnd').value = "";
            this.setState({
                disableEndYear: "disabled"
            })
        }else{
            this.setState({
             disableEndYear: ""
            })
        }
    }

    render() {
        const disableYear = this.state.disableEndYear;
        return (
            <div className="forecastPage">
                <div className="headerSearch">
                    <h1 className="pageHeader">Forecast Search</h1>
                    <div className="searchBox">
                        <form className="row" onSubmit={this.handleSubmit}>
                            <div className="col1 col-sm-12 col-lg-2 col-lg-offset-1">
                                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Store Number" id="str" />
                                <br />
                                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="SKU" id="sku" />
                            </div>
                            <div className="col2 col-sm-12 col-lg-2 ">
                                {/*Store Type*/}
                                <div className="dropdown">
                                    <button className="btn btn-default dropdown-toggle typeStore" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        {`${this.state.strType} `}
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                                        <li className="pointer" onClick={() => { this.changeTypeText('A') }}>A</li>
                                        <li className="pointer" onClick={() => { this.changeTypeText('B') }}>B</li>
                                        <li className="pointer" onClick={() => { this.changeTypeText('C') }}>C</li>
                                        <li className="pointer" onClick={() => { this.changeTypeText('D') }}>D</li>
                                        <li className="pointer" onClick={() => { this.changeTypeText('E') }}>E</li>
                                        <li className="pointer" onClick={() => { this.changeTypeText('F') }}>F</li>
                                    </ul>
                                </div>
                                <br />
                                {/*Factors*/}
                                <div className="dropdown">
                                    <button className="btn btn-default dropdown-toggle factorDrop" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        {this.state.factorTxt} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        {/* List all factors in our current factor arr in state */}
                                        {this.state.factors.map((factor, i) => {
                                            return (
                                                <li className="pointer" value={factor.f_description} onClick={(event) => { this.changeFactorText(event) }} key={i}>{factor.f_description}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            {/*Week Start Date*/}
                            <div className="col3 col-sm-12 col-lg-2">
                                <div className="dropdown">
                                    <button className="btn btn-default dropdown-toggle dropWeek" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        {this.state.weekStr}
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
                                        <WeekdropdownStr changeWeekStart={this.changeWeekStart} />
                                    </ul>
                                </div>
                                <br />
                                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Year" id="yearStart" onChange={(event)=> {this.enableEndYear(event)}}/>
                            </div>
                            {/*Week End Date */}
                            <div className="col3 col-sm-12 col-lg-2">
                                <div className="dropdown">
                                    <button className="btn btn-default dropdown-toggle dropWeek" type="button" id="dropdownMenu4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        {this.state.weekEd}
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu4">
                                        <WeekdropdownEnd changeWeekEnd={this.changeWeekEnd} />
                                    </ul>
                                </div>
                                <br />
                                <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" disabled={disableYear ? true : false} placeholder="Year" id="yearEnd"/>
                            </div>
                            <br />
                            <div className="col4 col-sm-12 col-lg-2 ">
                                <button className="btn btn-submit" type="submit"> Submit </button>
                            </div>
                        </form>
                    </div>
                </div>
                <h2 className="infoName">Forecast </h2>
                <SearchInfo searchInfo={this.state.forecastInfo} factorMultiplier={this.state.factorMultiplier} />
                <h2 className="infoName">Past Sales </h2>
                <SearchInfo searchInfo={this.state.pastInfo} />
                <ForecastChart show={this.state.show} pastInfo={this.state.pastInfo} forecastInfo={this.state.forecastInfo} multiplier={this.state.factorMultiplier} />
                <br />
                <br />
            </div>
        )
    }
}
