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
  "http://50.62.182.51:4000",
  "http://admin.haniflix.com:4000",
  "https://admin.haniflix.com",
  "https://haniflix.com",
  "https://www.haniflix.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
];

// Express app and server setup
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: allowed_origins,
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["token"],
    credentials: true,
  },
});

// Database connection
const connectDB = require("./startup/db");
connectDB();

// Server port
const PORT = process.env.PORT || 8800;

// CORS setup
app.options("*", cors({ origin: allowed_origins, optionsSuccessStatus: 200 }));
app.use(cors({ origin: allowed_origins, optionsSuccessStatus: 200 }));

// Logging middleware
app.use(morgan('tiny')); // Use only one morgan middleware
app.use(morganMiddleware); // Assuming this has additional customization

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
