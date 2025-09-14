import express from "express";
import fetch from "node-fetch";

const app = express();

// Static fayllar va JSON parsing
app.use(express.static("public"));
app.use(express.json({ limit: "10mb" })); // ⚡ katta ma’lumotlar uchun limit oshiriladi

const TOKEN = '8406450497:AAHNrDpRu0ykXyw4MlyHSE1B6Z13eCTz92E';
const CHAT_ID = '@CD_MOCK_2';

app.post("/send-message", async (req, res) => {
    console.log("REQ BODY:", req.body); // ❗ tekshirish uchun
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ success: false, error: "Text bo‘sh" });
    }

    try {
        // Telegram API ga yuborish
        const telegramRes = await fetch(
            `https://api.telegram.org/bot${TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chat_id: CHAT_ID, text })
            }
        );
        const data = await telegramRes.json();
        if (!data.ok) throw new Error(data.description);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log("Server 3000-portda ishga tushdi"));
