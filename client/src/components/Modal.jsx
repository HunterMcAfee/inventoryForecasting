import React, { Component } from 'react'

class Modal extends Component{

    handleCloseModal(event){
        this.props.onClose(event);
    }

    handleFinalSubmit(event){
        this.props.onSubmit(event);
    }


    render(){
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
          };


        if(!this.props.show){
            return null;
        }

        let entryList = [];
        console.log(this.props.holdValue);
        this.props.holdValue.forEach(element => {
            entryList.push(
                <tr key={element[0]}>
                    <td>{this.props.strNum}</td>
                    <td>{this.props.factor}</td>
                    <td>{this.props.week}</td>
                    <td>{this.props.year}</td>
                    <td>{element[0]}</td>
                    <td>{element[1]}</td>
                    <td>{element[2]}</td>
                </tr>
            );
        });


        return( 
            <div style={backdropStyle} >
                <div style={modalStyle} >
                    <table >
                        <thead>
                            <tr>
                                <th>Store Number</th>
                                <th>Factor</th>                        
                                <th>Week</th>
                                <th>Year</th>
                                <th>SKU Number</th>
                                <th>SKU Decription</th>
                                <th>Sales Qty</th>                           
                            </tr>
                        </thead>
                        <tbody>
                            {entryList}
                        </tbody>
                    </table>
                    <button onClick={(event)=>{this.handleFinalSubmit(event)}} > Submit </button>
                    <button onClick={(event)=>{this.handleCloseModal(event)}} > Cancel </button>
                </div>
            </div>
        )
    }
}

export default Modal;