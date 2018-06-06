import React, { Component } from 'react'

const Weekdropdown = ()=>{
    let weeks = [];
    for (let i = 1; i < 53; i++ ){
        weeks.push(<li>{i}</li>)   
    }
    return weeks;      
}

export default class Forecast extends Component {

    constructor(){
        super();
        this.state = ({
            factors: []
        })
    }

    componentDidMount(){
        // make axios call to our backend for all str incase new factors have been added
    
        this.setState({
            // factors: 
            factors: ['Rain', 'Snow']
        })
        
    }

    render() {
        return (
            <div>
                <h1>Forecast</h1>
                <br />
                <form className="searchBox row">
                    <div className="col1 col-sm-12 col-lg-2 col-lg-offset-1">
                        <input type="text" placeholder="Store Number" id="str" />
                        <br />
                        <input type="text" placeholder="SKU" id="sku" />
                    </div>
                    <div className="col2 col-sm-12 col-lg-2 ">
                        {/*Store Type*/}
                        <div className="dropdown"> 
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Store Type
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                               <li>A</li>
                               <li>B</li>
                               <li>C</li>
                               <li>D</li>
                               <li>E</li>
                               <li>F</li>
                            </ul>
                        </div>
                        {/*Factors*/}
                        <div className="dropdown"> 
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Factors &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                {/* List all factors in our current factor arr in state */}
                                {this.state.factors.map((factor, i) => {
                                    return (
                                        <li key={i}>{factor}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    {/*Week Start Date*/}
                    <div className="col3 col-sm-12 col-lg-2">
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Week start
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <Weekdropdown />
                            </ul>
                        </div>
                        <input type="text" placeholder="year" id="yearStart" /> 
                    </div>
                    {/*Week End Date */}
                    <div className="col3 col-sm-12 col-lg-2">
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Week End
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <Weekdropdown />
                            </ul>
                        </div>
                        <input type="text" placeholder="year" id="yearEnd" /> 
                    </div>
                    <div className = "col4 col-sm-12 col-lg-2 ">
                        <button className="btn btn-primary" type="submit"> Submit </button>
                    </div>
                </form>
            </div>
        )
    }
}
