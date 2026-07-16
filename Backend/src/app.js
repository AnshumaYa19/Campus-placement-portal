const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors')
const authRoutes = require('./config/routes/auth-routes');
const profileRoutes = require('./config/routes/profile-route');
const jobRoutes = require('./config/routes/job-route');
const applicationRoutes = require('./config/routes/application-routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(
    cors({
        origin: true,
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
module.exports = app;