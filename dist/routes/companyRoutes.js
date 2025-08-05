"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = require("../controllers/companyController");
const router = (0, express_1.Router)();
const companyController = new companyController_1.CompanyController();
// GET /companies - Get all companies
router.get('/', (req, res) => companyController.getAllCompanies(req, res));
// POST /companies - Create a new company
router.post('/', (req, res) => companyController.createCompany(req, res));
// GET /companies/:id - Get company by ID
router.get('/:id', (req, res) => companyController.getCompanyById(req, res));
// PUT /companies/:id - Update company
router.put('/:id', (req, res) => companyController.updateCompany(req, res));
// DELETE /companies/:id - Delete company
router.delete('/:id', (req, res) => companyController.deleteCompany(req, res));
exports.default = router;
//# sourceMappingURL=companyRoutes.js.map