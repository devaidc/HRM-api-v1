"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.message });
        return;
    }
    if (error.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    res.status(500).json({ error: 'Internal server error' });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({ error: 'Route not found' });
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorMiddleware.js.map