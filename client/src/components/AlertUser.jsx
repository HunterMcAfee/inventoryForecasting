import React, { Component } from 'react'

class AlertUser extends Component{

    render(){
        let alertBox;

        /*** SUCCESS ***/
        if(this.props.show === 'success'){
            alertBox =  <div className="alert alert-success">
                            <strong>Success!</strong> Weekly Sales Report has been submitted!
                        </div>
        /*** INVALID ENTRY ***/
        } else if(this.props.show === 'failed'){
            alertBox =   <div className="alert alert-danger">
                            <strong>Error!</strong> Plese resolve invalid input highligted in Red!
                         </div>
        /*** DONT Show any Alert Box ***/        
        } else {
            return null;
        }

        return(
            <div>
                {alertBox}
            </div>
        )
    }
}

export default AlertUser;