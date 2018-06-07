import React, { Component } from 'react'

export default class PastInfo extends Component {

	loadPastInfo = () => {
	
		// axios call for pass info
		let weeklySales = [	
			{
			week: 12,
			year: 2017,
			factor: "Snow",
			sku: "AA123BAB",
			sku_description: "Hammer",
			qty: 85,
			},
			{
			week: 12,
			year: 2017,
			factor: "Snow",
			sku: "AA123BAB",
			sku_description: "Hammer",
			qty: 85,
			},

		]

		let weeklyBox = weeklySales.map((item, i)=>{
			return (<div className="weekCard" key={i}>
						Week: {item.week} ,Year: {item.year}<br/>
						Factor: {item.factor} ,SKU: {item.sku} <br />
						Item Description: {item.sku_description} <br />
						Quantity: {item.qty}
					</div>)
		})

		return weeklyBox;
	}

	render() {
		return (
			<div className="pastInfo row">
				{this.loadPastInfo()}
			</div>
		)
	}
}