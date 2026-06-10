import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// =========================
// CONFIG BOT BRIDGE
// =========================
const BOT_BRIDGE = "http://IP-BOT-KAMU:4000"; 
// WAJIB: isi IP VPS / Pterodactyl bot kamu

// =========================
// HEALTH CHECK
// =========================
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "🚀 Nexa API Online",
        version: "2.0"
    });
});

// =========================
// 🤖 JADIBOT REAL CONNECT
// =========================
app.post("/api/jadibot", async (req, res) => {
    try {
        const { number, mode } = req.body;

        if (!number) {
            return res.json({
                status: false,
                message: "Nomor kosong"
            });
        }

        const response = await fetch(`${BOT_BRIDGE}/api/jadibot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number, mode })
        });

        const data = await response.json();

        return res.json(data);

    } catch (err) {
        return res.json({
            status: false,
            message: "Bot bridge tidak terhubung",
            error: err.message
        });
    }
});

// =========================
// 🎁 REDEEM SYSTEM (REAL FILE DB)
// =========================
const CODE_FILE = "./database/redeemCodes.json";
const CLAIM_FILE = "./database/claimed.json";

function loadJSON(file, fallback) {
    try {
        return JSON.parse(fs.readFileSync(file));
    } catch {
        return fallback;
    }
}

function saveJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.post("/api/redeem", (req, res) => {
    const { user, code } = req.body;

    if (!user || !code) {
        return res.json({
            status: false,
            message: "User atau code kosong"
        });
    }

    const codes = loadJSON(CODE_FILE, {});
    const claims = loadJSON(CLAIM_FILE, {});

    if (!codes[code]) {
        return res.json({
            status: false,
            message: "Kode tidak valid"
        });
    }

    if (!claims[user]) claims[user] = [];

    if (claims[user].includes(code)) {
        return res.json({
            status: false,
            message: "Kode sudah pernah dipakai"
        });
    }

    claims[user].push(code);
    saveJSON(CLAIM_FILE, claims);

    return res.json({
        status: true,
        message: "Redeem berhasil",
        reward: codes[code].reward
    });
});

// =========================
// 🏆 LEADERBOARD REAL (FROM FILE)
// =========================
const USER_DB = "./database/users.json";

app.get("/api/leaderboard", (req, res) => {
    const users = loadJSON(USER_DB, {});

    const list = Object.entries(users).map(([id, u]) => ({
        name: u.name || id,
        koin: u.koin || 0,
        exp: u.exp || 0
    }));

    list.sort((a, b) => b.koin - a.koin);

    res.json({
        status: true,
        data: list.slice(0, 10)
    });
});

// =========================
// 🧠 ADD USER (AUTO CREATE)
// =========================
app.post("/api/user", (req, res) => {
    const { id } = req.body;

    const users = loadJSON(USER_DB, {});

    if (!users[id]) {
        users[id] = {
            name: id,
            koin: 0,
            exp: 0
        };
    }

    saveJSON(USER_DB, users);

    res.json({
        status: true,
        user: users[id]
    });
});

// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 Nexa API running on port " + PORT);
});
