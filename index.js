import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import router from "./routes/index.js"; 
import cors from "cors";
import cookieParser from "cookie-parser";

// import Users from "./models/UserModel.js"; // tak ada pemakaian kecuali pertama kali sbg create tabel
// import UserLevels from "./models/UserLevelModel.js";
// import Proposal from "./models/ProposalModel.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database konek');
    // await Users.sync(); // utk generate tabel otomatis
    // await UserLevels.sync();
    // await Proposal.sync();
} catch (error) {
    console.error('koneksi gagal, ini erornya ', error);    
}

app.use(cookieParser());
app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('server jalann yeeeyyy'))