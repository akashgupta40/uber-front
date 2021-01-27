import React from "react";
import MapGL, {GeolocateControl} from 'react-map-gl';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import configData from "../config";
import MyAppBar from "./appBar";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWthc2hndXB0YTQwIiwiYSI6ImNrazlxano3ZzBiaWMyb21ucWttbmpnZWcifQ.p0QhEC2Fnhir51aYWJYfrw';

const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 100
};

class UberApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceLatitude: "",
            sourceLongitude: "",
            destinationLatitude: "",
            destinationLongitude: "",
            rideTypeId: 33,
            userId: 1,
            errorMessage: "",
            showError: false,
            viewport: {
                zoom: 14,
                bearing: 0,
                pitch: 0
            }
        };
        this.delta = this.delta.bind(this);
    }

    delta = (position) => {
        console.log(position);
        this.setState(prevState => ({
            viewport: {                   // object that we want to update
                ...prevState.viewport,    // keep all other key-value pairs
                latitude: position.coords.latitude,
                longitude: position.coords.longitude // update the value of specific key
            },
            sourceLatitude: position.coords.latitude,
            sourceLongitude: position.coords.longitude
        }))
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.delta)
    }

    _onViewportChange = viewport => this.setState({viewport});

    render() {
        return <div>
            <MyAppBar heading = "Cabs"/>
            {this.state.showError ? <p>{this.state.errorMessage}</p> : null}
            <MapGL
                {...this.state.viewport}
                width="100vw"
                height="100vh"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                onViewportChange={viewport => this.setState({viewport})}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                />
                <div style={{padding: 20}}/>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >

                    <TextField id="standard-basic" label="Source"  color="primary" variant="filled" style={{backgroundColor: "white", width: "370px"}}
                               value={this.state.sourceLatitude + "," + this.state.sourceLongitude }  name="source" InputProps={{readOnly: true,}}/>
                    <TextField id="standard-basic" label="Destination"  color="primary" variant="filled" style={{backgroundColor: "white", width: "370px"}}
                               value={this.state.destinationLatitude +"," + this.state.destinationLongitude} onChange={this.handleChange} name="dest"/>
                    <Button variant="contained" onClick={() => this.handleSubmit()}>BOOK</Button>

                </Grid>

            </MapGL>

        </div>
    }

    handleChange = (event) => {
        this.setState(state => state[event.target.name] = event.target.value);
    };

    handleSubmit = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: this.state.userId,
                sourceLocationLatitude: this.state.sourceLatitude,
                sourceLocationLongitude: this.state.sourceLongitude,
                rideTypeId: 33
            })
        };
        fetch(`${configData.BACKEND_SERVER_URL}/ride`, requestOptions)
            .then(response => response.json())
            .then((data) => {

                if(data.stackTrace) {
                    console.log(data.message);
                    this.setState({showError: true, errorMessage: data.message})
                } else {
                    window.location = `/ride/${this.state.userId}`;
                    this.setState({});
                }
            })
            .catch(error => console.log(error) );

    };
}


export default UberApp;