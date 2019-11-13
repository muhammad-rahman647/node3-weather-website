const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");

app.set("view engine", "pug");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.status(200).render("Home", {
    title: "Weather",
    name: "Rahman Sheikh"
  });
});

app.get("/help", (req, res) => {
  res.status(200).render("help", {
    helptext: "This is some helpful text",
    title: "Help"
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", {
    title: "About me",
    aboutText: "This is about page"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
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
      });
    }
  );
});

app.listen(port, () => {
  console.log("Server is running is on port " + port);
});
