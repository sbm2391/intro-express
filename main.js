//para tener un servidor express
//1-. importacion de la libreria
const express = require("express");
const bodyParser = require("body-parser");
//2-. instancia de express
const app = express();
//body parser
app.use(bodyParser.urlencoded({extendes: true}))
const users = [
    {
        name:"bliss",
        password:"bliss",
        age:"20",
        favoriteFood:"Barbacoa"
    },
    {
        name:"betsy",
        password:"betsy",
        age:"27",
        favoriteFood:"mole"
    },
    {
        name:"pepe",
        password:"pepe",
        age:"22",
        favoriteFood:"Carnitas"
    }
]
//es para que pueda leer los archivos de la carpeta public
app.use(express.static("public"))

//indicamos el motor de vistas
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//a partir de aquí escribimos nuestra ruta
app.get("/dulces", function(req, res, next){
    res.send("Traigan tributos!");
});

app.get("/myPage", function(req, res, next){
    res.render("myPage", {betsy:"Betsy"});
});
//ruta de home
app.get("/", function(req, res, next){
   res.render("index");
   
    next();
});

app.get('/login',function(req, res,next){
    const user = req.query.username;
    
    console.log(req.query)
    res.render('login_form', {error:user})// cuando user:user solo lo pones una vez
   });
app.post('/login',function(req, res){
    console.log(req.body)
    const user = req.body.username;
    const favoriteFood = req.body.favoriteFood;
    users.forEach((element)=> {
        if(user===element.name) {
            res.send(`Bienvenido ${user}, te acabamos de servir ${element.favoriteFood}`)// cuando user:user solo lo pones una vez
        } else {
            res.render('login_form', {error:"incorrecto"})
          
        }
    })
    
});
app.get('/signup',function(req, res,next){
    res.render('signup_form')
});

app.post('/signup',function(req, res){
    var nuevoUsuario = {
    name: req.body.username,
    password: req.body.password,
    age: req.body.age,
    favoriteFood: req.body.favoriteFood,
    };
    users.push(nuevoUsuario);
    console.log("nuevoUsuario")
    res.json(users);
});

app.use(function(){
   console.log("hola")
});
// siempre va al final, es lo que escucha
app.listen(3000, function(err){
    if(err) console.log(err);
    console.log("Tu servidor está funcionando")
})
