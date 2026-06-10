import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ======================
// 🤖 JADIBOT API
// ======================
app.post("/api/jadibot", (req, res) => {
    const { number, mode } = req.body;

    if (!number) {
        return res.json({
            status: false,
            message: "Nomor tidak boleh kosong"
        });
    }

    console.log("JADIBOT REQUEST:", number, mode);

    // nanti bot kamu yang proses (manual trigger dulu)
    return res.json({
        status: true,
        message: "Request jadibot diterima",
        number,
        mode
    });
});

// ======================
// 🎁 REDEEM API
// ======================
app.post("/api/redeem", (req, res) => {
    const { code, user } = req.body;

    if (!code || !user) {
        return res.json({
            status: false,
            message: "Data kurang"
        });
    }

    console.log("REDEEM:", code, user);

    return res.json({
        status: true,
        message: "Code diproses",
        code
    });
});

// ======================
// 🏆 LEADERBOARD API (dummy dulu)
// ======================
app.get("/api/leaderboard", (req, res) => {
    const type = req.query.type || "koin";

    const data = [
        { name: "Elvan", koin: 5000, exp: 1200 },
        { name: "NexaUser", koin: 3000, exp: 900 },
        { name: "BotMaster", koin: 2000, exp: 700 }
    ];

    return res.json({
        status: true,
        type,
        data
    });
});

// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 Nexa API running on port " + PORT);
});
