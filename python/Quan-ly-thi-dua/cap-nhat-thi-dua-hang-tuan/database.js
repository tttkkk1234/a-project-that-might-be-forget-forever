const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5501;

app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "database.json");

const readData = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
    console.log("Created new database.json");
  }
  const data = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("database.json updated");
};

app.get("/loi", (req, res) => {
  try {
    const data = readData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Không thể đọc dữ liệu" });
  }
});

app.post("/loi", (req, res) => {
  const { className, week, violation, count, deduction, student, date } = req.body;
  if (!className || !week || !violation || typeof count !== "number" ||
      typeof deduction !== "number" || !student || !date) {
    return res.status(400).json({ error: "Thiếu dữ kiện" });
  }
  try {
    const data = readData();
    data.push({ className, week, violation, count, deduction, student, date });
    writeData(data);
    res.status(201).json({ message: "Cập nhật lỗi thành công" });
  } catch (error) {
    console.error("POST /loi error:", error);
    res.status(500).json({ error: "Không thể xóa dữ liệu" });
  }
});

app.delete("/loi", (req, res) => {
  const { className, week, violation, student } = req.body;
  if (!className || !week || !violation || !student) {
    return res.status(400).json({ error: "Thiếu dữ kiện" });
  }
  try {
    const data = readData();
    const filteredData = data.filter(
      (item) =>
        !(item.className === className &&
          item.week === week &&
          item.violation === violation &&
          item.student === student)
    );
    if (data.length === filteredData.length) {
      return res.status(404).json({ message: "Không thể xóa lỗi" });
    }
    writeData(filteredData);
    res.status(200).json({ message: "Xóa lỗi thành công" });
  } catch (error) {
    console.error("DELETE /loi error:", error);
    res.status(500).json({ error: "Không thể xóa lỗi" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
});