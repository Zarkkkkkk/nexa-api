import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// 🏠 ROOT CHECK
// ======================
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Nexa API Running 🚀",
        endpoints: [
            "/api/jadibot",
            "/api/redeem",
            "/api/leaderboard"
        ]
    });
});

// ======================
// 🤖 JADIBOT
// ======================
app.post("/api/jadibot", (req, res) => {
    const { number, mode } = req.body;

    if (!number) {
        return res.status(400).json({
            status: false,
            message: "Nomor kosong"
        });
    }

    console.log("[JADIBOT]", number, mode);

    return res.json({
        status: true,
        message: "Request jadibot diterima",
        data: { number, mode: mode || "pairing" }
    });
});

// ======================
// 🎁 REDEEM
// ======================
app.post("/api/redeem", (req, res) => {
    const { code, user } = req.body;

    if (!code || !user) {
        return res.status(400).json({
            status: false,
            message: "Code / user kosong"
        });
    }

    console.log("[REDEEM]", code, user);

    return res.json({
        status: true,
        message: "Redeem diproses",
        data: { code, user }
    });
});

// ======================
// 🏆 LEADERBOARD (DUMMY)
// ======================
app.get("/api/leaderboard", (req, res) => {
    const type = req.query.type || "koin";

    const data = [
        { name: "Elvan", koin: 5000, exp: 1200, energi: 300 },
        { name: "NexaUser", koin: 3000, exp: 900, energi: 200 },
        { name: "BotMaster", koin: 2000, exp: 700, energi: 100 }
    ];

    return res.json({
        status: true,
        type,
        data
    });
});

// ======================
// ⚠️ ERROR HANDLER
// ======================
process.on("uncaughtException", (err) => {
    console.log("❌ ERROR:", err);
});

process.on("unhandledRejection", (err) => {
    console.log("❌ PROMISE ERROR:", err);
});

// ======================
// 🚀 START SERVER (RAILWAY SAFE)
// ======================
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("🚀 Nexa API running on port " + PORT);
});
