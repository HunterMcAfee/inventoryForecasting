import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand link" to="/"><i className="fa fa-wpforms"></i> Inventory Forecasting</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="link"><Link to="/">Weekly Sales Entry<span className="sr-only">(current)</span></Link></li>
                                <li className="link"><Link to="/forecast">Forecast</Link></li>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


