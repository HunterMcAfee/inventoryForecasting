import React, { Component } from 'react';

class DataEntry extends Component{

    render(){

        return(
            <div>
                <h1>Data Entry</h1>
                <div className="dataInput">
                    <input type="text" placeholder="Store Number"/>
                    <input type="text" placeholder="Factor"/>
                    <input type="text" placeholder="Week"/>
                    <input type="text" placeholder="Year"/>
                </div>

                <button onclick={()=>{this.handleAddEntry()}} >ADD</button>
            </div>
        );
    }
}

export default DataEntry;