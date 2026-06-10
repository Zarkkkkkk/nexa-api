import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// JADIBOT
app.post("/api/jadibot", (req, res) => {
    const { number, mode } = req.body;

    if (!number) {
        return res.json({ status: false, message: "Nomor kosong" });
    }

    console.log("JADIBOT:", number, mode);

    return res.json({
        status: true,
        message: "Request diterima",
        number,
        mode
    });
});

// REDEEM
app.post("/api/redeem", (req, res) => {
    const { code, user } = req.body;

    return res.json({
        status: true,
        message: "Redeem diproses",
        code,
        user
    });
});

// LEADERBOARD (dummy dulu)
app.get("/api/leaderboard", (req, res) => {
    res.json({
        status: true,
        data: [
            { name: "Elvan", koin: 5000 },
            { name: "NexaUser", koin: 3000 }
        ]
    });
});

// ⚠️ PENTING RAILWAY
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Nexa API running on port " + PORT);
});
