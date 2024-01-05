import express  from "express";
import connect from "./connection.js";
import { config } from "dotenv";
import router from "./router/route.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());
config();

const port = process.env.PORT || 8080;

connect().then(() => {  // Listen on port only after a successfull connection to DB has been established!
    console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]: Connected to DB")
    app.listen(port, () => {
        console.log('\x1b[42m%s\x1b[0m', `[SUCCESS]: Server Up -> http://localhost:${port}`)
     });
}).catch((error) => {
    console.log({error})
});

/** api routes*/
app.use('/api', router)

app.get('/', (req, res) => {
    try {
        res.json("Serevr Up and Running!!") 
            
    } catch (error) {
        console.log({ error })
    }
});




