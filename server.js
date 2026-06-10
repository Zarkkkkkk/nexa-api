import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
const PANEL = "https://server.lanzcihuy.fanzzhost.dpdns.org";
const KEY = "ptlc_Q30SpuDD7oxyp5oNIV5cR3vkwyzaMtpHZYDbuWJorm7";
const SERVER_ID = "5144a4b4";

// =========================
const headers = {
Authorization: `Bearer ${KEY}`,
Accept: "application/vnd.pterodactyl.v1+json",
"Content-Type": "application/json"
};

// =========================
app.get("/", (req,res)=>{
res.json({status:true,message:"Nexa API OK"});
});

// START
app.post("/api/start", async (req,res)=>{
await axios.post(`${PANEL}/api/client/servers/${SERVER_ID}/power`,
{signal:"start"},{headers});
res.json({status:true});
});

// STOP
app.post("/api/stop", async (req,res)=>{
await axios.post(`${PANEL}/api/client/servers/${SERVER_ID}/power`,
{signal:"stop"},{headers});
res.json({status:true});
});

// RESTART
app.post("/api/restart", async (req,res)=>{
await axios.post(`${PANEL}/api/client/servers/${SERVER_ID}/power`,
{signal:"restart"},{headers});
res.json({status:true});
});

app.listen(process.env.PORT || 3000, ()=>{
console.log("Nexa API running");
});
