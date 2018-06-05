import React, { Component } from 'react'

export default class DataEntry extends Component {
  render() {
    return (

    	<div>
   			<form className="form-inline">'
   			  <div className="row">
   			  <div className="col-sm-3">
  				<input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="storeNum" placeholder="Store Number" />
  			  </div>	
  			  <div className="col-sm-3 ">
  			  	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    				Factor 
    				<span class="caret">

    				</span>
  				</button>
  			  </div>
  			  <div className="col-sm-3 ">
  			  	<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    				Factor 
    				<span class="caret">

    				</span>
  				</button>
  			  </div>	
  			  	
  			  <div className="col-sm-3">
  				<input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" id="year" placeholder="Year" />
  			  </div>	
  			</div>
			</form>
    	</div>
    )
  }
}

