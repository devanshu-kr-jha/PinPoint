import express  from "express";
import connect from "./connection.js";
import { config } from "dotenv";
import router from "./router/route.js";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // allow cookies to be sent and received
  };
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


config();

const port = process.env.PORT || 8080;

connect().then(() => {  // Listen on port only after a successfull connection to DB has been established!
    console.log('\x1b[42m%s\x1b[0m',"[SUCCESS]: Connected to DB")
    app.listen(port, () => {
        console.log(`[SUCCESS]: Server Up -> http://localhost:${port}`)
     });
}).catch((error) => {
    console.log({error})
});

app.use('/api', router)

app.get('/', (req, res) => {
    try {
       res.json("Serevr Up and Running!!") 
            
    } catch (error) {
        console.log({ error })
    }
});




