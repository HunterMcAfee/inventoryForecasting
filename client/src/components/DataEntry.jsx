import React, { Component } from 'react'
import axios from 'axios'
import TopOptions from './TopOptions'
import Modal from './Modal'
import AlertUser from './AlertUser'


const borderError = { boxShadow: "1px 1px 10px 1px red" }
const borderNorm = { border: '1px solid grey' }
const borderSuccess = { boxShadow: "1px 1px 10px 1px green" }

export default class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEntry: [0],
      holdValueEntryList: [["", "", ""]],
      currentRow: 1,
      storeNum: "",
      factor: "",
      week: "",
      year: "",
      entryErr: [[borderNorm, borderNorm, borderNorm]],
      strErr: borderNorm,
      factorErr: borderNorm,
      weekErr: borderNorm,
      yearErr: borderNorm,
      skuData: [],
      factorOption: [],
      strNumberData: [],
      modalDisplay: false,
      alert: false
    }

    this.addNewEntry = this.addNewEntry.bind(this);
  }

  componentDidMount() {

    axios.post("http://35.237.25.64:8081/factorData")
      .then((res) => { this.setState({ factorOption: res.data }); })
      .catch(function (error) { if (!error.error); });

    axios.post("http://35.237.25.64:8081/skuMasterData")
      .then((res) => { this.setState({ skuData: res.data }) })
      .catch(function (error) { if (!error.error); });

    axios.post("http://35.237.25.64:8081/strMasterData")
      .then((res) => { this.setState({ strNumberData: res.data }) })
      .catch(function (error) { if (!error.error); });
  }

  addNewEntry(event) {
    event.preventDefault();
    this.state.newEntry.push(this.state.currentRow);
    this.state.holdValueEntryList.push(["", "", ""]);
    this.state.entryErr.push([[borderNorm, borderNorm, borderNorm]])
    this.setState({
      newEntry: this.state.newEntry,
      currentRow: this.state.currentRow + 1,
      holdValueEntryList: this.state.holdValueEntryList,
      entryErr: this.state.entryErr
    })
  }

  onChangeHandler(event) {
    this.setState({ input: event.target.value })
  }

  handleEntryChange(event, element, column) {
    let tempHoldEntryList = this.state.holdValueEntryList;
    let tempEntryErr = this.state.entryErr;

    tempHoldEntryList[element][column] = event.target.value;

    // CC891CBC
    if (column === 0 && event.target.value.length === 8) {
      let foundAMatch = false;
      for (let i = 0; i < this.state.skuData.length; i++) {
        if (event.target.value === this.state.skuData[i].sku_id) {
          foundAMatch = true;
          tempEntryErr[element][column] = borderSuccess;
          tempHoldEntryList[element][1] = this.state.skuData[i].sku_description;
          break;
        }
      }
      if (!foundAMatch) {
        tempEntryErr[element][column] = borderError;
        tempHoldEntryList[element][1] = "";
      }
    } else if (column === 0 && event.target.length !== 8) {
      tempEntryErr[element][column] = borderError;
      tempHoldEntryList[element][1] = "";
    }

    this.setState({
      holdValueEntryList: this.state.holdValueEntryList,
      entryErr: tempEntryErr
    })
  }

  handleStoreChange(event) {
    this.setState({ storeNum: event.target.value })
  }
  handleFactorChange(event) {
    this.setState({ factor: event.target.value })
  }
  handleWeekChange(event) {
    this.setState({ week: event.target.value })
  }
  handleYearChange(event) {
    this.setState({ year: event.target.value })
  }

  onDeletePress(event) {
    let tempNewEntry = this.state.newEntry;
    let tempHoldValueEntryList = this.state.holdValueEntryList;
    let tempEntryErr = this.state.entryErr;


    tempNewEntry.splice(event, 1);
    tempHoldValueEntryList.splice(event, 1);
    tempEntryErr.splice(event, 1);

    for (let i = event; i < this.state.newEntry.length; i++) {
      tempNewEntry[i] = i;
    }
    this.setState({
      newEntry: tempNewEntry,
      currentRow: this.state.currentRow - 1,
      holdValueEntryList: tempHoldValueEntryList,
      entryErr: tempEntryErr
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let anyErrors = false;

    // Convert Factor to Factor Id
    let factorId = -1;
    for (let i = 0; i < this.state.factorOption.length; i++) {
      if (this.state.factorOption[i].f_description === this.state.factor) {
        factorId = this.state.factorOption[i].f_id;
      }
    }

    // If Factor Input is Valid
    (factorId === -1) ? (
      this.setState({ factorErr: borderError }),
      anyErrors = true) :
      this.setState({ factorErr: borderSuccess });


    // Convert Week to week id
    let splitedWeek = this.state.week.split(" ");
    (splitedWeek[1] > 0 && splitedWeek[1] <= 52) ?
      this.setState({ weekErr: borderSuccess }) : (
        this.setState({ weekErr: borderError }),
        anyErrors = true
      );


    // Check Year is Valid
    let intYear = parseInt(this.state.year, 10);
    (intYear >= 1000 && intYear <= 9999) ?
      this.setState({ yearErr: borderSuccess }) :
      (this.setState({ yearErr: borderError }),
        anyErrors = true);


    // Check Str Number
    let foundStrMatch = false;
    for (let i = 0; i < this.state.strNumberData.length; i++) {
      if (parseInt(this.state.storeNum, 10) === this.state.strNumberData[i].str_id) {
        foundStrMatch = true;
        this.setState({ strErr: borderSuccess })
        break;
      }
    }
    if (!foundStrMatch) {
      this.setState({ strErr: borderError })
      anyErrors = true;
    }

    // Check if the Sku entries are valid
    let skuDataList = [];
    let soldQuantity = [];
    for (let i = 0; i < this.state.holdValueEntryList.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (j !== 1) {
          if (this.state.holdValueEntryList[i][j].length === 8 || (j > 0 && this.state.holdValueEntryList[i][j] !== "")) {
            if (this.state.holdValueEntryList[i][j].length === 8) {
              skuDataList.push(this.state.holdValueEntryList[i][0]);
              soldQuantity.push(parseInt(this.state.holdValueEntryList[i][2], 10))
            }
            let tempEntryErr = this.state.entryErr;
            tempEntryErr[i][j] = borderSuccess
            this.setState({ entryErr: tempEntryErr });
          } else {
            anyErrors = true;
            let tempEntryErr = this.state.entryErr;
            tempEntryErr[i][j] = borderError
            this.setState({ entryErr: tempEntryErr });
          }
        }
      }
    }

    if (anyErrors) {
      console.log("There was an user Error");
      this.setState({ alert: 'failed' });
      return;
    }

    if (!this.state.modalDisplay) {
      this.setState({ modalDisplay: true })
      return;
    }
    this.setState({ modalDisplay: false });

    /*  Obj to send to Backend  */
    const obj = {
      storeId: parseInt(this.state.storeNum, 10),
      factorId: factorId,
      week: parseInt(splitedWeek[1], 10),
      year: intYear,
      skuNum: skuDataList,
      soldQuantuty: soldQuantity
    }

    this.successfulSubmit(obj);
  }

  successfulSubmit = (obj) => {
    console.log(obj);
    let success = true;

    axios.post("http://35.237.25.64:8081/dataEntry", obj)
      .then((res) => {/* console.log(res.data); */ })
      .catch(function (error) { if (!error.error); });

    /*** Submit successfully enteried entries into the database ***/
    /*** Clear all the Entries ***/
    if (success) {
      this.setState({
        newEntry: [0],
        holdValueEntryList: [["", "", ""]],
        currentRow: 1,
        storeNum: "",
        factor: "",
        week: "",
        year: "",
        entryErr: [[borderNorm, borderNorm, borderNorm]],
        strErr: borderNorm,
        factorErr: borderNorm,
        weekErr: borderNorm,
        yearErr: borderNorm,
        alert: 'success'
      });
    }
  }

  handleCloseModal(event) {
    this.setState({ modalDisplay: false });
  }


  render() {

    let newEntryList = this.state.newEntry.map((element, i) => {
      return (
        <div className="row" key={i}>
          {/***  SKU Number Input  ***/}
          <div className="col-sm-3 col-md-offset-1">
            <input value={this.state.holdValueEntryList[element][0]} style={this.state.entryErr[element][0]} onChange={(event) => { this.handleEntryChange(event, element, 0) }} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="SKU Number" />
          </div>

          {/***  SKU Decription  ***/}
          <div className="col-sm-3">
            <input value={this.state.holdValueEntryList[element][1]} style={this.state.entryErr[element][1]} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="SKU Description" />
          </div>

          {/***  Sales QTY Input  ***/}
          <div className="col-sm-3">
            <input value={this.state.holdValueEntryList[element][2]} style={this.state.entryErr[element][2]} onChange={(event) => { this.handleEntryChange(event, element, 2) }} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="QTY Sold" />
          </div>

          {/***  Trash Can Delete Row  ***/}
          <div className="col-sm-2" style={{marginBottom: "0.5%"}}>
            <button onClick={() => { this.onDeletePress(element) }} type="button" className="btn btn-default" aria-label="Left Align">
              <span className="glyphicon glyphicon-trash trashSymbole" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      )
    })

    return (

      <div className="container">

        <AlertUser
          show={this.state.alert}
        />

        <div className="dataEntry">
          <h1 className="pageHeader"> Weekly Sales Entry </h1>
          <br />

          <form className="form-inline">
            <TopOptions
              storeNum={this.state.storeNum}
              strErr={this.state.strErr}
              factor={this.state.factor}
              factorErr={this.state.factorErr}
              week={this.state.week}
              weekErr={this.state.weekErr}
              year={this.state.year}
              yearErr={this.state.yearErr}
              factorOption={this.state.factorOption}
              onStoreChange={(event) => { this.handleStoreChange(event) }}
              onFactorChange={(event) => { this.handleFactorChange(event) }}
              onWeekChange={(event) => { this.handleWeekChange(event) }}
              onYearChange={(event) => { this.handleYearChange(event) }}
            />
          </form>
          <br />

          {/***  SKU Entry List  ***/}
          <div className="newEntryList">
            <br />
            {newEntryList}
            <br />
          </div>

          <br />
          <button onClick={this.addNewEntry} type="button" id="addEntry" className="col-md-offset-5 btn-lg btn-add buttonEntry">Add New Entry</button>
          <br />
          <br />
          <br />

          <Modal
            show={this.state.modalDisplay}
            factor={this.state.factor}
            strNum={this.state.storeNum}
            week={this.state.week}
            year={this.state.year}
            holdValue={this.state.holdValueEntryList}
            onClose={(event) => { this.handleCloseModal(event) }}
            onSubmit={(event) => { this.handleSubmit(event) }}
          />

          <button onClick={(e) => { this.handleSubmit(e) }} type="button" id="addEntry" data-toggle="modal" target=".bs-example-modal.lg" className="btn-lg btn-submit submitEntry">Submit</button>
        </div>
      </div>
    )
  }
}

