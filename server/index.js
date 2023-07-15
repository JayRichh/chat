const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  try {
    const { model, messages } = req.body;
    const response = await openai.createChatCompletion({
      model,
      messages,
    });
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in Chat API" });
  }
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, n, size } = req.body;
    const response = await openai.createImage({
      prompt,
      n,
      size,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in Generate API" });
  }
});

app.post("/api/edit", upload.fields([{ name: 'image' }, { name: 'mask' }]), async (req, res) => {
  try {
    const { prompt, n, size } = req.body;
    const imageStream = fs.createReadStream(req.files.image[0].path);
    const maskStream = req.files.mask ? fs.createReadStream(req.files.mask[0].path) : null;
    const response = await openai.createImageEdit(imageStream, maskStream, prompt, n, size);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in Edit API" });
  }
});

app.post("/api/variation", upload.single('image'), async (req, res) => {
  try {
    const { n, size } = req.body;
    const imageStream = fs.createReadStream(req.file.path);
    const response = await openai.createImageVariation(imageStream, n, size);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in Variation API" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the OpenAI API" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
