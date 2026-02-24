import express from "express";
import userRoutes from "./routes/user.route"
import "dotenv/config"

const app = express();

app.use(express.json());

/* app.use("/",(req,res)=>{
    res.json({
        creator:"Christopher Pazo Dev",
        endPoints:[
            "GET Obtener todos los usuarios /api/users",
            "GET Obtener usuario por id /api/users/:id",
        ]
    })
}) */

app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('Corriendo servidor.') })