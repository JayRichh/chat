const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-4-0314",
      messages: messages,
    });
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in Chat API" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
