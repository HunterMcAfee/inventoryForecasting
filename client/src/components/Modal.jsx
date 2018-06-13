import React, { Component } from 'react'

const modal_btn = {
    background: 'rgb(229,229,229)',
    color: 'rgb(35,35,35)',
    border: '2px solid rgb(35,35,35)',
    borderRadius: '4px'
}

const hover_modal_btn = {
    background: 'rgb(35,35,35)',
    color: 'rgb(229,229,229)',
    border: '2px solid rgb(35,35,35)',
    borderRadius: '4px'
}

class Modal extends Component{
    constructor(props){
        super(props);

        this.state = {
            hoverSubmit: modal_btn,
            hoverCancel: modal_btn
        }
    }

    handleCloseModal(event){
        this.props.onClose(event);
    }

    handleSubmit(event){
        this.props.onSubmit(event);
    }

    hoverOffEvent(whichButton){
        (whichButton === 'submit') ?
            this.setState({hoverSubmit: modal_btn}) :
            this.setState({hoverCancel: modal_btn});
    }
    hoverEvent(whichButton){
        (whichButton === 'submit') ?
            this.setState({hoverSubmit: hover_modal_btn}) :
            this.setState({hoverCancel: hover_modal_btn});
    }


    render(){
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 0
        };

        const modalStyle = {
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: 5,
            maxWidth: '80%',
            minHeight: '40%',
            margin: '150px auto 0px',
            padding: 0
          };

        const buttonStyle = {
            maxWidth: '80%',
            margin: '0px auto 0px',
        }



        if(!this.props.show){
            return null;
        }


        let entryList = this.props.holdValue.map((element, i) =>{
            return ( 
                <tr key={i}>
                    <td>{this.props.strNum}</td>
                    <td>{this.props.factor}</td>
                    <td>{this.props.week}</td>
                    <td>{this.props.year}</td>
                    <td>{element[0]}</td>
                    <td>{element[1]}</td>
                    <td>{element[2]}</td>
                </tr>                
            )
        });

        return( 
            <div style={backdropStyle} >
                <div style={modalStyle} className="searchInfo modalInfo">
                    <table className="table modalTable">
                        {/***  HEADER of Modal Table  ***/}
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Store Number</th>
                                <th scope="col">Factor</th>                        
                                <th scope="col">Week</th>
                                <th scope="col">Year</th>
                                <th scope="col">SKU Number</th>
                                <th scope="col">SKU Decription</th>
                                <th scope="col">Sales Qty</th>                           
                            </tr>
                        </thead>
                        {/***  BODY of Modal Table  ***/}
                        <tbody>
                            {entryList}
                        </tbody>
                    </table>

                </div>
                <div style={buttonStyle}>
                        <button className="btn btn-submit" onMouseOut={()=>{this.hoverOffEvent(this, 'submit')}} onMouseOver={()=>{this.hoverEvent(this, 'submit')}} onClick={(event)=>{this.handleSubmit(event)}} > Submit </button>
                        <button className="btn btn-add" onMouseOut={()=>{this.hoverOffEvent(this, 'cancel')}} onMouseOver={()=>{this.hoverEvent(this, 'cancel')}} onClick={(event)=>{this.handleCloseModal(event)}} > Cancel </button>
                </div>
            </div>
        )
    }
}

export default Modal;