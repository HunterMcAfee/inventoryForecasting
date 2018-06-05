import React, { Component } from 'react'

export default class Forecast extends Component {

    constructor(){
        super();
        this.state = ({
            factors: []
        })
    }

    factorDropDown(event){
        // make query call for all str
        //throw them into stores []
        return(
            <h1>Stuff</h1>
        )
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
                        <div className="dropdown">
                            <span id="type">Type &nbsp;</span> 
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Factors
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li>Action</li>
                                <li>Another action</li>
                            </ul>
                        </div>
                        <div>
                            <button className="btn btn-primary" type = "button" id="addFactor">Add Factor</button>
                        </div>
                    </div>
                    <div className="col3 col-sm-12 col-lg-2">
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Week start
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li>1</li>
                                <li>2</li>
                            </ul>
                        </div>
                        <input type="text" placeholder="year" id="yearStart" /> 
                    </div>
                    <div className="col3 col-sm-12 col-lg-2">
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Week End
                            <span className="caret"></span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li>1</li>
                                <li>2</li>
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
