import React, { Component } from 'react';

class TopOptions extends Component{


	
	handleStoreChange(event){
		this.props.onStoreChange(event);
	}

	handleFactorChange(event){
		this.props.onFactorChange(event);
	}

	handleWeekChange(event){
		this.props.onWeekChange(event);
	}

	handleYearChange(event){
		this.props.onYearChange(event);
	}

  render(){

		let factorOption = ["Normal Day", "Rain", "Hurricane", "Snow", 
												"Zombie Apocalypse", "Father's day", "Fourth of July", 
												"Mother's day", "Memorial day", "Black Friday"];
		let displayFactors = [];
		for(let j = 0; j < factorOption.length; j++) {
			displayFactors.push(<option key={factorOption[j]}>{factorOption[j]}</option>)
		}

		let weekOption = [];
    for(let i = 1; i <= 52; i++) {
        weekOption.push(<option key={i}>week {i} </option>);
    }

		return(
			<div className="row">
				<div className="col-sm-3 sideInput" >
					<input className="topInput form-control mb-2 mr-sm-2 mb-sm-0 store" value={this.props.storeNum} onChange={(event) => {this.handleStoreChange(event)}} type="text" id="storeNumber" placeholder="Store Number" />
				</div>

				<div className="col-sm-3 ">
				<select value={this.props.factor} style={this.props.factorErr} onChange={(event) => {this.handleFactorChange(event)}} id="factor" className="topInput form-control factor">
						<option value="" disabled selected>Factor</option>
						{displayFactors}
					</select> 
				</div>

				<div className="col-sm-3 ">
					<select value={this.props.week} style={this.props.weekErr} onChange={(event) => {this.handleWeekChange(event)}} id="week" className="topInput form-control week">
						<option value="" disabled selected>Week</option>
						{weekOption}
					</select> 
				</div>

				<div className="col-sm-3 sideInput">
					<input className="topInput form-control mb-2 mr-sm-2 mb-sm-0 year" value = {this.props.year} style={this.props.yearErr} onChange={(event) => {this.handleYearChange(event)} } type="text" id="year" placeholder="Year" />
				</div>

			</div>
		)
  }
}

export default TopOptions
