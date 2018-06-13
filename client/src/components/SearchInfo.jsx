import React, { Component } from 'react'

export default class SearchInfo extends Component {
	constructor(props) {
		super(props);
	}

	loadPastInfo = () => {
	
		let weeklySales = this.props.searchInfo;

		let weeklyBox = weeklySales.map((item, i)=>{
			return (<tr key={i}>
					      <th scope="row">{i + 1}</th>
					      <td>{item.week}</td>
					      <td>{item.year}</td>
					      <td>{item.factor ? item.factor : "-"}</td>
					      <td>{item.sku_id}</td>
					      <td>{item.description}</td>
					      <td>{Math.floor(item.quantity * (this.props.factorMultiplier ? Math.abs(this.props.factorMultiplier) : 1))}</td>
			    	</tr>)
		})

		return weeklyBox;
	}

	render() {
		return (
			<div className="searchInfo">
				<table className="table">
						<thead className="thead-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Week</th>
								<th scope="col">Year</th>
								<th scope="col">Factor</th>
								<th scope="col">SKU</th>
								<th scope="col">Description</th>
								<th scope="col">Quantity</th>
							</tr>
						</thead>
					<tbody>
						{this.loadPastInfo()}
					</tbody>
				</table>
			</div>
		)
	}
}