const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const envs = require("./envs");

express.json();
app.use(cookieParser());

// Exercício 1
app.get("/coords", async (req, res) => {
  try {
    const city = req.query.city;
    const response = await fetch(
      `${envs.url}/geo/1.0/direct?q=${city}&appid=${envs.apiKey}`
    );
  
    const data = await response.json();
  
    const lat = data[0].lat;
    const lon = data[0].lon;
  
    res.json({
      latitude: lat,
      longitude: lon,
    })

  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar coordenadas." });
  }
});

// Exercício 2
app.get("/weather", async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;

    // /weather?lon=xxxx&lat=yyyy

    const response = await fetch(
      `${envs.url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${envs.apiKey}`
    );
  
    const data = await response.json();
  
    const feelsLike = data.main.feels_like;
    const description = data.weather[0].description;
  
    res.json({
      sensacao_termica: feelsLike,
      descricao: description,
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar previsão do tempo." });
  }  
})

app.listen(envs.port, () => {
  console.log(`Servidor iniciado. Porta: ${envs.port}`);
});