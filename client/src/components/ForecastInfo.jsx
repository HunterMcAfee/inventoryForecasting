import React, { Component } from 'react'

export default class ForecastInfo extends Component {
	constructor(props) {
		super(props);
	}

	loadForecastInfo = () => {
		// axios call for pass info
		let weeklySales = this.props.forecastInfo

		let weeklyBox = weeklySales.map((item, i)=>{
			return (<div className="weekCard" key={i}>
						Week: {item.week}, Year: {item.year}<br/>
						Factor: {item.factor} <br />
						SKU: {item.sku_id} <br />
						Description: {item.description} <br />
						Quantity: {item.quantity}
					</div>)
		})
		return weeklyBox;
	}

	render(){
		return (
			<div className="forecastInfo row">
				{this.loadForecastInfo()}
			</div>
		)
	}
}