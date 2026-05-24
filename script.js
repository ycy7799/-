import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 静态目录
app.use(express.static(__dirname));

// 首页
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 Pi Game Running On Port ${PORT}`);
});