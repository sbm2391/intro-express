//para tener un servidor express
//1-. importacion de la libreria
const express = require("express");

//2-. instancia de express
const app = express();
//a partir de aquí escribimos nuestra ruta
app.get("/dulces", function(req, res, next){
    res.send("Traigan tributos!");
});
//ruta de home
app.get("/", function(req, res, next){
   return res.send("Hola")
    next();
});
app.use(function(){
   console.log("holaaa")
});
// siempre va al final, es lo que escucha
app.listen(3000, function(err){
    if(err) console.log(err);
    console.log("Tu servidor está funcionando")
})

