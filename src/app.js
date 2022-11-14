const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewPath)
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Pablo"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Pablo"
    })
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Pablo"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }

    geocode(req.query.address, (error, { latitude , longitude , location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    });
});

app.get("/help/*", (req, res) => {
    res.render("404page", {
        title: "404",
        name: "Pablo",
        errorText: "Help article not found"
    });
});

app.get("*", (req, res) => {
    res.render("404page", {
        title: "404",
        name: "Pablo",
        errorText: "Page not found" 
    });
});

app.listen(3500, () => {
    console.log("Server is up on port 3500")
});