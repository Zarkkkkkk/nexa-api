import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// ENV CONFIG
// =====================
const PANEL = process.env.PTERO_PANEL;
const KEY = process.env.PTERO_API_KEY;
const SERVER_ID = process.env.PTERO_SERVER_ID;
const BOT_BRIDGE = process.env.BOT_BRIDGE_URL; 
// contoh: http://ip-vps-kamu:4000

const headers = {
  Authorization: `Bearer ${KEY}`,
  Accept: "Application/vnd.pterodactyl.v1+json",
  "Content-Type": "application/json"
};

// =====================
// 🔥 REAL JADIBOT (NO DUMMY)
// =====================
app.post("/api/jadibot", async (req,res)=>{
  try {
    const { number, mode } = req.body;

    const r = await axios.post(`${BOT_BRIDGE}/jadibot`, {
      number,
      mode
    });

    return res.json(r.data);
  } catch (e) {
    return res.json({
      status:false,
      message:e.message
    });
  }
});

// =====================
// 🟢 PTERO CONTROL
// =====================
app.post("/api/bot/start", async (req,res)=>{
  await axios.post(`${PANEL}/api/client/servers/${SERVER_ID}/power`,
  { signal:"start" }, { headers });

  res.json({status:true});
});

app.post("/api/bot/stop", async (req,res)=>{
  await axios.post(`${PANEL}/api/client/servers/${SERVER_ID}/power`,
  { signal:"stop" }, { headers });

  res.json({status:true});
});

app.post("/api/bot/restart", async (req,res)=>{
  await axios.post(`${PANEL}/api/client/servers/${SERVER_ID}/power`,
  { signal:"restart" }, { headers });

  res.json({status:true});
});

// =====================
app.listen(process.env.PORT || 3000, ()=>{
  console.log("Nexa API Running");
});
