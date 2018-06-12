import React, { Component } from 'react'

class AlertUser extends Component{

    render(){
        let alertBox;

        if(this.props.show === 'success'){
            alertBox =  <div class="alert alert-success">
                            <strong>Success!</strong> Weekly Sales Report has been submitted!
                        </div>
        } else if(this.props.show === 'failed'){
            alertBox =   <div class="alert alert-danger">
                            <strong>Error!</strong> Plese resolve invalid input highligted in Red!
                         </div>
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