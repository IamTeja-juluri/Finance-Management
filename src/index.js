const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { ServerConfig } = require("./config");
const path = require("path");
const apiRoutes = require("./routes");
const retrieveSecrets = require("./config/retrieveSecrets");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", apiRoutes);

mongoose
  .connect(ServerConfig.MONGO_URI)
  .then(() => {
    app.listen(ServerConfig.PORT, () => {
      console.log(`Server running on port ${ServerConfig.PORT}`);
    });
  })
  .catch((error) => console.log(error));


  const startServer = async () => {
    try {
      const secretsString = await retrieveSecrets();
      await fs.writeFile(".env", secretsString);
      await mongoose.connect(ServerConfig.MONGO_URI);
      app.listen(ServerConfig.PORT, () => {
        console.log("Server running on port 3005");
      });
    } catch (error) {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  };
  
  startServer();