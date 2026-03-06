import express from "express";
import userRoutes from "./routes/user.route"
import "dotenv/config"

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    
    res.json({
        msg: 'Api estudiantes',
        endPoints:{
            'GET api/students/':"Obtener todos los estudiantes",
            'GET api/students/:id':"Obtener estudiante por Id",
            'POST api/students/':"Crear nuevo estudiante",
        }
    })
})

app.use('/api/students', userRoutes);


const PORT = process.env.PORT || 3306;
app.listen(PORT, () => { console.log('Corriendo servidor.') })