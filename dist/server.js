"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const attendanceRoutes_1 = __importDefault(require("./routes/attendanceRoutes"));
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/auth', authRoutes_1.default);
app.use('/attendance', attendanceRoutes_1.default);
app.use('/companies', companyRoutes_1.default);
app.use('/locations', locationRoutes_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Error handling middleware
app.use(errorMiddleware_1.notFoundHandler);
app.use(errorMiddleware_1.errorHandler);
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🔐 Auth endpoints: http://localhost:${PORT}/auth`);
    console.log(`🕒 Attendance endpoints: http://localhost:${PORT}/attendance`);
    console.log(`🏢 Company endpoints: http://localhost:${PORT}/companies`);
    console.log(`📍 Location endpoints: http://localhost:${PORT}/locations`);
});
exports.default = app;
//# sourceMappingURL=server.js.map