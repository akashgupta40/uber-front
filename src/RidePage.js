import React from "react";
import configData from "./config";
import LinearProgress from "@material-ui/core/LinearProgress";
import RideDetails from "./RideDetails";
import MyAppBar from "./components/appBar";

class RidePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.match.params.userId,
            rideAlloted: false,
            driverId: ""
        }

    }

    getRideStatus() {
        if(!this.state.rideAlloted) {
            fetch(`${configData.BACKEND_SERVER_URL}/ride/latest?userId=${this.state.userId}`)
                .then(result => result.json())
                .then(result => {
                    if(result.rideStatus === "DRIVER_ALLOTED") {
                        this.setState({rideAlloted: true, driverId: result.driverId})
                    }

                });
        }
    }

    componentDidMount() {
        this.timer = setInterval(()=> this.getRideStatus(), 5000);
    }

    componentWillUnmount() {
        this.timer = null; //clear variable
    }

    render() {
        return <div>
            <MyAppBar heading = "Cabs"/>
            <div style={{padding: 20}}/>
            {this.state.rideAlloted ? <RideDetails userId = {this.state.userId} driverId = {this.state.driverId}/> : <LinearProgress color="primary" >Fetching Driver</LinearProgress>}
        </div>
    }

}

export default RidePage;