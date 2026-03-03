import express from "express";
import userRoutes from "./routes/user.route"
import "dotenv/config"

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    
    res.json({
        msg: 'Api de geely',
        endPoints:{
            'GET api/users/':"Obtener todos los usuarios",
            'GET api/users/:id':"Obtener usuario por Id",
            'POST api/users/':"Crear nuevo usuario",
        }
    })
})

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3306;
app.listen(PORT, () => { console.log('Corriendo servidor.') })