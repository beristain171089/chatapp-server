import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { initSocketServer } from './utils/index.js';
import { 
    authRoutes, 
    UserRoutes, 
    chatRoutes, 
    chatMessageRoutes,
    groupRoutes,
    groupMessageRoutes
} from './routes/index.js';

const app = express();
const server = http.createServer(app);

initSocketServer(server);

// Configure Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));

// Configure Header - CORS
app.use(cors());

// Configure logger HTTP
app.use(morgan("dev"));

app.use("/api", authRoutes);
app.use("/api", UserRoutes);
app.use("/api", chatRoutes);
app.use("/api", chatMessageRoutes);
app.use("/api", groupRoutes);
app.use("/api", groupMessageRoutes);

export { server };