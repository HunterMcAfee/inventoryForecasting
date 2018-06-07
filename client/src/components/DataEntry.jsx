import React, { Component } from 'react'
import axios from 'axios'


export default class DataEntry extends Component {

  constructor(props) {
    super(props);
    this.addNewEntry = this.addNewEntry.bind(this);
    this.state = {
      newEntry: [0],
      holdValueEntryList: [["", "", ""]],
      store: [101, 201, 110, 340, 540, 670, 987],
      currentRow: 1,
      storeNum: "",
      factor: "",
      week: "",
      year: "",
    }
  }

  addNewEntry(event) {
    event.preventDefault();
    this.state.newEntry.push(this.state.currentRow);
    this.state.holdValueEntryList.push(["", "", ""]);
    this.setState({
      newEntry: this.state.newEntry,
      currentRow: this.state.currentRow + 1,
      holdValueEntryList: this.state.holdValueEntryList,

    })
  }

  onChangeHandler(event) {
    this.setState({
      input: event.target.value
    })
  }

  handleEntryChange(event, element, column) {
    this.state.holdValueEntryList[element][column] = event.target.value;
    this.setState({
      holdValueEntryList: this.state.holdValueEntryList,
    })
  }

  handleStoreChange(event) {
    this.state.storeNum = event.target.value;
    this.setState({
      storeNum: this.state.storeNum,
    })
  }

  handleFactorChange(event) {
    this.state.factor = event.target.value,
    this.setState({
      factor: this.state.factor,
    })
  }

  handleWeekChange(event) {
    this.state.week = event.target.value,
    this.setState({
      week: this.state.week
    })
  }


  handleYearChange(event) {
    this.state.year = event.target.value,
    this.setState ({
      year: this.state.year,
    })
  }


  onDeletePress(event) {
    console.log(event);
    this.state.newEntry.splice(event, 1)
    this.state.holdValueEntryList.splice(event, 1)
     for(let i = event; i < this.state.newEntry.length; i++) {
         this.state.newEntry[i] = i;
     }
    this.setState({
       newEntry: this.state.newEntry,
       currentRow: this.state.currentRow - 1,
       holdValueEntryList: this.state.holdValueEntryList,
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const store = this.state.storeNum;
    const factor = this.state.factor;
    const week = this.state.week;
    const year = this.state.year;
    const arrOfSKU = this.state.holdValueEntryList;

    const registerRequest = axios({
      method: "POST",
      url: "http://localhost:8080/dataEntry",
      data: {
        store,
        factor,
        week,
        year,
        arrOfSKU,
      },
    });
  }

  render() {
    console.log(this.state.storeNum, this.state.factor, this.state.week, this.state.year)
    let newEntryList = [];
    this.state.newEntry.forEach((element) => {
      newEntryList.push(
        <div class="row">
        <div className="col-sm-3 col-md-offset-1">
             <input value={this.state.holdValueEntryList[element][0]} onChange={(event) => {this.handleEntryChange(event, element, 0)}} type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder={element} />
        </div>

        <div className="col-sm-3">
             <input value={this.state.holdValueEntryList[element][1]} onChange={(event) => {this.handleEntryChange(event, element, 1)}} type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="SKU Description" />
        </div>

        <div className="col-sm-3">
             <input value={this.state.holdValueEntryList[element][2]} onChange={(event) => {this.handleEntryChange(event, element, 2)}} type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="QTY SOld" />
        </div>

        <div className="col-sm-2">
             <button onClick={() => {this.onDeletePress(element)} } type="button" class="btn btn-default" aria-label="Left Align">
               <span class="glyphicon glyphicon-trash trashSymbole" aria-hidden="true"></span>
             </button>
        </div>
       </div>
       )
    })


    let weekOption = [];
    for(let i = 1; i <= 52; i++) {
        weekOption.push(<option>week {i} </option>);
    }

    let factorOption = ["Normal Day", "Rain", "Hurricane", "Snow", 
                        "Zombie Apocalypse", "Father's day", "Fourth of July", 
                        "Mother's day", "Memorial day", "Black Friday"];
    let displayFactors = [];
    for(let j = 0; j < factorOption.length; j++) {
      displayFactors.push(<option>{factorOption[j]}</option>)
    }

    return (

      <div>

        <h1> Data Entry </h1>

        <br/>

   			<form className="form-inline">

   			  <div className="row">

   			    <div className="col-sm-2 col-md-offset-2">
  				    <input value={this.state.storeNum} onChange={(event) => {this.handleStoreChange(event)}} type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 store" id="storeNumber" placeholder="Store Number" />
            </div>	
  			  
            <div className="form-group col-sm-2">
              <select value={this.state.factor} onChange={(event) => {this.handleFactorChange(event)}} id="factor" className="form-control factor">
                  <option value="" disabled selected>Factor</option>
                  {displayFactors}
              </select> 
            </div>

            <div className="form-group col-sm-2">
                  <select value={this.state.week} onChange={(event) => {this.handleWeekChange(event)}} id="week" className="form-control week">
                    <option value="" disabled selected>Week</option>
                    {weekOption}
                  </select> 
            </div>
  			  	
    			  <div className="col-sm-2">
    				  <input value = {this.state.year} onChange={(event) => {this.handleYearChange(event)} } type="text" class="form-control mb-2 mr-sm-2 mb-sm-0 year" id="year" placeholder="Year" />
    			  </div>	

  			 </div>
			</form>
      <br/>
      <div className="newEntryList">
        <br />
         {newEntryList}
        <br/>
      </div>

      <br />
      <button onClick={this.addNewEntry}  type="button" id="addEntry" class="col-md-offset-5 btn btn-primary btn-lg btn-block buttonEntry">Add New Entry</button>
      <br />
      <br />
      <br />
      <button onClick={this.handleSubmit} type="button" id="addEntry" class="btn btn-success btn-lg btn-block submitEntry">Submit</button>
      </div>
    )
  }
}

