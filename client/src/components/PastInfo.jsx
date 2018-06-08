import React, { Component } from 'react'

export default class PastInfo extends Component {
	constructor(props) {
		super(props);
	}

	loadPastInfo = () => {
	
		// axios call for pass info
		let weeklySales = this.props.pastInfo;

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

	render() {
		return (
			<div className="pastInfo row">
				{this.loadPastInfo()}
			</div>
		)
	}
}