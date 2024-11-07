const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json()); // Middleware to parse JSON request body

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/send_otp", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const body = {
    senderId: "thelocalgodd",
    phoneNumber: phoneNumber,
    countryCode: "GH",
  };

  const username = "<<>>";
  const password = "<<>>";
  const auth = Buffer.from(`${username}:${password}`).toString("base64");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
  };

  try {
    const response = await axios.post(
      "https://api-otp.hubtel.com/otp/send",
      body,
      config
    );
    res.status(response.status).json(response.data); // Send back the API response data
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : "Internal Server Error",
    });
  }
});

app.post("/verify_otp", async (req, res) => {
  const { requestId, prefix, code } = req.body;

  if (!requestId || !prefix || !code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const body = {
    requestId: requestId,
    prefix: prefix,
    code: code,
  };

  const username = "criegyty";
  const password = "zfpgyahn";
  const auth = Buffer.from(`${username}:${password}`).toString("base64");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
  };

  try {
    const response = await axios.post(
      "https://api-otp.hubtel.com/otp/verify",
      body,
      config
    );
    res.status(response.status).json(response.data); // Send back the API response data
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : "Internal Server Error",
    });
  }
});

app.listen(3000, () => {
  console.log("App live on http://localhost:3000");
});
