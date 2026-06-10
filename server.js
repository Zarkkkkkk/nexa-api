import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// PTERO CONFIG
// =========================
const PTERO_PANEL = "https://server.lanzcihuy.fanzzhost.dpdns.org";
const API_KEY = "ptlc_xxxxxxxx"; // API KEY kamu
const SERVER_ID = "5144a4b4";

// =========================
// HEADERS
// =========================
const headers = {
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/vnd.pterodactyl.v1+json",
    "Content-Type": "application/json"
};

// =========================
// ROOT
// =========================
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Nexa API Ptero Control Online"
    });
});

// =========================
// START BOT
// =========================
app.post("/api/start", async (req, res) => {
    try {
        await axios.post(
            `${PTERO_PANEL}/api/client/servers/${SERVER_ID}/power`,
            { signal: "start" },
            { headers }
        );

        res.json({ status: true, message: "Bot started" });

    } catch (e) {
        res.json({ status: false, error: e.message });
    }
});

// =========================
// STOP BOT
// =========================
app.post("/api/stop", async (req, res) => {
    try {
        await axios.post(
            `${PTERO_PANEL}/api/client/servers/${SERVER_ID}/power`,
            { signal: "stop" },
            { headers }
        );

        res.json({ status: true, message: "Bot stopped" });

    } catch (e) {
        res.json({ status: false, error: e.message });
    }
});

// =========================
// RESTART BOT
// =========================
app.post("/api/restart", async (req, res) => {
    try {
        await axios.post(
            `${PTERO_PANEL}/api/client/servers/${SERVER_ID}/power`,
            { signal: "restart" },
            { headers }
        );

        res.json({ status: true, message: "Bot restarted" });

    } catch (e) {
        res.json({ status: false, error: e.message });
    }
});

// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 Nexa Ptero API running");
});
