// Entry point for the Express server
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Collectify API running on port ${PORT}`);
});
