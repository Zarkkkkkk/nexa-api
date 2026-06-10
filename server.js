import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// BOT BRIDGE URL (WAJIB)
// =========================
const BOT_API = "http://IP-VPS-KAMU:4000";

// =========================
// 🔥 JADIBOT REAL
// =========================
app.post("/api/jadibot", async (req,res)=>{
    try {
        const r = await axios.post(`${BOT_API}/api/jadibot`, req.body);
        res.json(r.data);
    } catch(e){
        res.json({
            status:false,
            message:"Bot bridge tidak connect",
            error:e.message
        });
    }
});

// =========================
// LEADERBOARD (dummy dulu)
// =========================
app.get("/api/leaderboard",(req,res)=>{
    res.json({
        status:true,
        data:[
            {name:"Admin",koin:9999},
            {name:"User",koin:5000}
        ]
    });
});

// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("API RUNNING");
});
