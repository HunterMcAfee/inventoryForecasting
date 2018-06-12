import React, { Component } from 'react'
import axios from 'axios'
import TopOptions from './TopOptions'
import Modal from './Modal'


const borderError = {
  boxShadow: "1px 1px 10px 1px red"
}
const borderNorm = {
  border: '1px solid grey'
}
const borderSuccess = {
  boxShadow: "1px 1px 10px 1px green"
  
}
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
      modalDisplay: false
    }

    this.addNewEntry = this.addNewEntry.bind(this);
  }

  componentDidMount(){

    axios.post("http://localhost:8080/factorData")
    .then((res) => {
      this.setState({
          factorOption: res.data
      })
    })
    .catch(function(error){
      if(!error.error);
    });

    axios.post("http://localhost:8080/skuMasterData")
    .then((res) => {
      this.setState({
          skuData: res.data
      })
    })
    .catch(function(error){
      if(!error.error);
    });

    axios.post("http://localhost:8080/strMasterData")
    .then((res) => {
      this.setState({
          strNumberData: res.data
      })
    })
    .catch(function(error){
      if(!error.error);
    });
    // this.setState({
    //   skuData: {
    //     '11111111': 'hammer',
    //     '22222222': "wood",
    //     '33333333': 'saws',
    //     '44444444': 'bucket',
    //     '55555555': 'nails',
    //     '66666666': 'screws',
    //     '77777777': 'shovel',
    //     '88888888': 'rake',
    //     '99999999': 'lawn mower'
    //   }
    // })
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
    this.setState({input: event.target.value})
  }

  handleEntryChange(event, element, column) {
    let tempHoldEntryList = this.state.holdValueEntryList;
    let tempEntryErr = this.state.entryErr;

    tempHoldEntryList[element][column] = event.target.value;

    // CC891CBC
    if(column === 0 && event.target.value.length === 8){
      let foundAMatch = false;
      for(let i=0; i < this.state.skuData.length; i++){
        if(event.target.value === this.state.skuData[i].sku_id){
          foundAMatch = true;
          tempEntryErr[element][column] = borderSuccess;
          tempHoldEntryList[element][1] = this.state.skuData[i].sku_description;
          break;
        }
      }
      if(!foundAMatch){
         tempEntryErr[element][column] = borderError;
         tempHoldEntryList[element][1] = "";
      }
    } else if(column === 0 && event.target.length !== 8){ 
      tempEntryErr[element][column] = borderError;
      tempHoldEntryList[element][1] = "";      
    }

    this.setState({
      holdValueEntryList: this.state.holdValueEntryList,
      entryErr: tempEntryErr
    })
  }

  handleStoreChange(event) {
    this.setState({storeNum: event.target.value})
  }
  handleFactorChange(event) {
    this.setState({factor: event.target.value})
  }
  handleWeekChange(event) {
    this.setState({week: event.target.value})
  }
  handleYearChange(event) {
    this.setState ({year: event.target.value})
  }

  onDeletePress(event) {
    let tempNewEntry = this.state.newEntry;
    let tempHoldValueEntryList = this.state.holdValueEntryList;
    let tempEntryErr = this.state.entryErr;


    tempNewEntry.splice(event, 1);
    tempHoldValueEntryList.splice(event, 1);
    tempEntryErr.splice(event, 1);

     for(let i = event; i < this.state.newEntry.length; i++) {
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
    for(let i=0; i < this.state.factorOption.length; i++){
      if(this.state.factorOption[i].f_description === this.state.factor){
        factorId = this.state.factorOption[i].f_id;
      }
    }

    if(factorId === -1){
      this.setState({factorErr: borderError
      });
      anyErrors = true;
    } else {
      this.setState({factorErr: borderSuccess})
    }

    // Convert Week to week id
    let splitedWeek = this.state.week.split(" ");
    if(splitedWeek[1] > 0 && splitedWeek[1] <= 52){
      this.setState({weekErr: borderSuccess})
    } else {
      this.setState({weekErr: borderError})
      anyErrors = true;
    }

    // Check Year
    let intYear = parseInt(this.state.year, 10);
    if(intYear >= 1000 && intYear <= 9999){
      this.setState({yearErr: borderSuccess})
    }
    else{
      this.setState({yearErr: borderError})
      anyErrors = true;
    }

    // Check Str Number
    let foundStrMatch = false;
    for(let i = 0; i < this.state.strNumberData.length; i++){
      // console.log(this.state.strNumberData[i].str_id)
      if(parseInt(this.state.storeNum,10) === this.state.strNumberData[i].str_id){
        foundStrMatch = true;
        this.setState({strErr: borderSuccess})
        break;
      }
    } 
    if(!foundStrMatch){
      this.setState({strErr: borderError})
      anyErrors = true;
    }
    // 
    let skuDataList = [];
    let soldQuantity = [];
    for(let i=0; i<this.state.holdValueEntryList.length; i++){
      for(let j=0; j<3; j++){
        if(j !== 1){
          if(this.state.holdValueEntryList[i][j].length === 8 || (j > 0 && this.state.holdValueEntryList[i][j] !=="")){
            if(this.state.holdValueEntryList[i][j].length === 8){
              skuDataList.push(this.state.holdValueEntryList[i][0]);
              soldQuantity.push(parseInt(this.state.holdValueEntryList[i][2],10))
            }
            let tempEntryErr = this.state.entryErr;
            tempEntryErr[i][j] = borderSuccess
            this.setState({entryErr: tempEntryErr});
          } else {
            anyErrors = true;
            let tempEntryErr = this.state.entryErr;
            tempEntryErr[i][j] = borderError
            this.setState({entryErr: tempEntryErr});
          } 
        }
      } 
    }    

    console.log(skuDataList)
    console.log(soldQuantity)

    if(anyErrors){
      console.log("There was an user Error");
      return;
    }

    if(!this.state.modalDisplay){
      this.setState({modalDisplay: true})
      return;
    }
    this.setState({modalDisplay: false});

      // dataArray: this.state.holdValueEntryList
      const obj = {
      storeId: parseInt(this.state.storeNum, 10),
      factorId: factorId,
      week: parseInt(splitedWeek[1], 10),
      year: intYear,
      skuNum: skuDataList,
      soldQuantuty: soldQuantity
      }

    axios.post("http://localhost:8080/dataEntry", obj)
    .then((res) => {
      console.log(res.data);
      // this.setState({
      //     pastInfo: res.data
      // })
    })
    .catch(function(error){
      if(!error.error);
    });
  }

  handleCloseModal(event){
    this.setState({modalDisplay: false});
  }
  handleFinalSubmit(event){
    console.log("The Final Submit");
    this.setState({modalDisplay: false});
  }

  render() {

    let newEntryList = [];
    this.state.newEntry.forEach((element) => {
      newEntryList.push(
        <div className="row" key={element}>
        <div className="col-sm-3 col-md-offset-1">
             <input value={this.state.holdValueEntryList[element][0]} style={this.state.entryErr[element][0]} onChange={(event) => {this.handleEntryChange(event, element, 0)}} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="SKU Number" />
        </div>

        <div className="col-sm-3">
             <input value={this.state.holdValueEntryList[element][1]} style={this.state.entryErr[element][1]}  type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="SKU Description" />
        </div>

        <div className="col-sm-3">
             <input value={this.state.holdValueEntryList[element][2]} style={this.state.entryErr[element][2]} onChange={(event) => {this.handleEntryChange(event, element, 2)}} type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNumber" placeholder="QTY Sold" />
        </div>

        <div className="col-sm-2">
             <button onClick={() => {this.onDeletePress(element)} } type="button" className="btn btn-default" aria-label="Left Align">
               <span className="glyphicon glyphicon-trash trashSymbole" aria-hidden="true"></span>
             </button>
        </div>
       </div>
       )
    })

    return (

      <div className="container">

        <h1 className="pageHeader"> Weekly Sales Report </h1>
        <br/>

   			<form className="form-inline">
   			  <div className="row">
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
              onStoreChange={(event) => {this.handleStoreChange(event)}}
              onFactorChange={(event) => {this.handleFactorChange(event)}}
              onWeekChange={(event) => {this.handleWeekChange(event)}}
              onYearChange={(event) => {this.handleYearChange(event)}}
             />
  			 </div>
			</form>
      <br/>

			<div className="newEntryList">
        <br />
         {newEntryList}
        <br/>
      </div>

      <br />
      <button onClick={this.addNewEntry}  type="button" id="addEntry" className="col-md-offset-5 btn btn-primary btn-lg btn-block buttonEntry">Add New Entry</button>
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
        onClose={(event)=>{this.handleCloseModal(event)}}
        onSubmit={(event)=>{this.handleSubmit(event)}}
      />
      {/* <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" display={this.state.modalDisplay} aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            ...
          </div>
        </div>
      </div> */}
      <button onClick={(e)=>{this.handleSubmit(e)}} type="button" id="addEntry" data-toggle="modal" target=".bs-example-modal.lg" className="btn btn-success btn-lg btn-block submitEntry">Submit</button>
      </div>
    )
  }
}

