const express = require('express')
var bodyParser = require('body-parser')


const app = express()
app.use( bodyParser.json() );       // to support JSON-encoded bodies
const port = 3001;

var locations = 
{
    "31716cea": { "lat": 52.47156, "lng": 13.47859, "at": "2017-09-01T12:00:00Z" },
    "bac5188f": { "lat": 52.45276, "lng": 13.45806, "at": "2017-09-01T12:00:00Z" },
    "3a3eb23a": { "lat": 52.46101, "lng": 13.5203, "at": "2017-09-01T12:00:00Z" }
};

/**Deliver HTML */
var path = require('path');
app.use(express.static('web'))
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/web/index.html'));
});
*/
app.get('/vehicles/locations', (req, res) => {

    res.send(locations);

});
/**register vehicle */
app.post('/vehicles', (req, res) => {
    let id= req.body["id"];
    
    //registering new vehicle 
    locations[id]=null;
    //todo: save to db;
    console.log("vehicle registered " + id);
    res.sendStatus(204);
});
/**unregister vehicle */
app.delete('/vehicles/:id', (req, res) => {
    let id= req.params["id"];
    //registering new vehicle 
    locations[id]=undefined;
    //todo: remove from db;
    console.log("vehicle un-registered " + id);
    res.sendStatus(204);
});
/**location update */
app.post('/vehicles/:id/locations', (req, res) => {
    let id= req.params["id"];   
    let vehicle = locations[id];
    console.log(vehicle);
    if(vehicle === null|| vehicle){
        let body= req.body;
        //registering new vehicle 
        locations[id]=body;
        //todo: remove from db;
        console.log("vehicle updated " + JSON.stringify(locations[id]));
        res.sendStatus(204);
    }else{
        console.log("vehicle not registered " + id);
        res.sendStatus(404);
    }
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))