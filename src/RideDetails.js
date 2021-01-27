import React from "react";
import configData from "./config";
import MediaCard from "./components/card";
import Grid from "@material-ui/core/Grid";

class RideDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userId,
            driverId: this.props.driverId,
            hasLoaded: false,
            driverDetails: {}
        };

    }

    componentDidMount() {
        fetch(`${configData.BACKEND_SERVER_URL}/driver/${this.state.driverId}`)
            .then(response => response.json())
            .then(data => this.setState({ driverDetails: data, hasLoaded: true }));
    }

    render() {
        return <div>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
            Your ride is Booked.
            <MediaCard img = "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1587078988/assets/39/367176-34d7-4913-8618-53fbc46b6309/original/drive-banner.jpg"
                       description =  {`Driver's Current Location ${this.state.driverDetails.location_latitude} ,${this.state.driverDetails.location_longitude}`} title = "Your Ride  is Booked" url = { '/shows/' }  />

                <MediaCard img = "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1587078988/assets/39/367176-34d7-4913-8618-53fbc46b6309/original/drive-banner.jpg"
                           description =  {`Name: ${this.state.driverDetails.name}  Ph: ${this.state.driverDetails.mobileNo}`} title = {this.state.driverDetails.vehicle} url = { '/shows/' }  />
            </Grid>
        </div>
    }
}

export default RideDetails;
