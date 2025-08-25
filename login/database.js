const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5501;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'], 
    optionsSuccessStatus: 200 
}));

app.post("/save-option", (req, res) => {
    const { option } = req.body;

    if (option) {
        console.log(`Received new option: ${option}`);
    
        const filePath = path.join(__dirname, "user.json");
   
        fs.readFile(filePath, "utf8", (err, data) => {
            let users = [];
            if (!err && data) {
                users = JSON.parse(data);
            }
            users.push(option);

            fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error("Error writing to file:", writeErr);
                    return res.status(500).json({ error: "Failed to save the option." });
                }

                res.status(200).json({ message: "Option saved successfully!" });
            });
        });
    } else {
        res.status(400).json({ error: "Invalid option" });
    }
});
app.get("/get-options", (req, res) => {
    const filePath = path.join(__dirname, "user.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ error: "Failed to retrieve options." });
        }
    });
});

app.use(express.static(path.join(__dirname, "newest login")));

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});