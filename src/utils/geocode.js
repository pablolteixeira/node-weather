const request = require("postman-request");

const geocode = (location, callback) => {
    const ACCESS_KEY = "eb9fc1a3c0340d43143db4f5b3ff90c3";
    const url = `http://api.positionstack.com/v1/forward?access_key=${ACCESS_KEY}&query=${location}&limit=1`

    request({ url, json: true}, (error, response, body ) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.data === undefined) {
            callback("Unable to find location. Try another search", undefined);
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].name
            });
        }
    });
}

module.exports = geocode;
