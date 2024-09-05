const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cors = require("cors");
const socketio = require("socket.io");
const morganMiddleware = require("./middleware/morgan");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const genreRoute = require("./routes/genres");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const statsRoute = require("./routes/stats");
const scraperRoute = require("./routes/scraper");
const imagesRoute = require("./routes/images");
const miscRoute = require("./routes/misc");
const stripeRoute = require("./routes/stripePayments");
const webhookRoute = require("./routes/webhook");

// Allowed origins for CORS
const allowed_origins = [
  "https://admin.haniflix.stream",
  "http://admin.haniflix.stream",
  "https://haniflix.stream",
  "http://haniflix.stream",
  "https://www.haniflix.stream",
  "http://www.haniflix.stream",
];
// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowed_origins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true
};

// Express app and server setup
const app = express();

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: allowed_origins,
    methods: ["GET", "POST"],
    allowedHeaders: ["token"],
    credentials: true,
  },
});

// Database connection
const connectDB = require("./startup/db");
connectDB();

// Server port
const PORT = process.env.PORT || 8000;



// Apply CORS middleware before routes
app.use(cors(corsOptions));

// Logging middleware
app.use(morgan('tiny')); // Standard logging
app.use(morganMiddleware); // Custom logging

// JSON parsing middleware
app.use(express.json());

// Route middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/genre", genreRoute);
app.use("/api/lists", listRoute);
app.use("/api/stats", statsRoute);
app.use("/api/image", imagesRoute);
app.use("/api/misc", miscRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/webhook", webhookRoute);

// Scraper route with IO
const scraperRouteWithIO = scraperRoute(io);
app.use("/api/scraper", scraperRouteWithIO);

// Error handling middleware
app.use(errorHandler);

// Import and call the socket setup function
const setupSockets = require("./sockets");
setupSockets(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
