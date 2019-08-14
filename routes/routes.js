var express = require('express');
var router = express.Router();

// Require controller modules.
var company_controller = require('../controllers/companyController');
var customer_controller = require('../controllers/customerController');
var meter_controller = require('../controllers/meterController');
var billing_controller = require('../controllers/billingController');

/// COMPANY ROUTES ///
// GET catalog home page.
//router.get('/', company_controller.index);

// GET request for creating a company. NOTE This must come before routes that display company (uses id).
router.get('/company/create', company_controller.company_create_get);

// POST request for creating company.
router.post('/company/create', company_controller.company_create_post);

// GET request to delete company.
router.get('/company/:id/delete', company_controller.company_delete_get);

// POST request to delete company.
router.post('/company/:id/delete', company_controller.company_delete_post);

// GET request to update company.
router.get('/company/:id/update', company_controller.company_update_get);

// POST request to update company.
router.post('/company/:id/update', company_controller.company_update_post);

// GET request for one company.
router.get('/company/:id', company_controller.company_detail);

// GET request for list of all company items.
router.get('/companies', company_controller.company_list);

///CUSTOMER ROUTES ////

// GET request for creating a customer. NOTE This must come before routes that display customer (uses id).
router.get('/customer/create', customer_controller.customer_create_get);

// POST request for creating customer.
router.post('/customer/create', customer_controller.customer_create_post);

// GET request to delete customer.
router.get('/customer/:id/delete', customer_controller.customer_delete_get);

// POST request to delete customer.
router.post('/customer/:id/delete', customer_controller.customer_delete_post);

// GET request to update customer.
router.get('/customer/:id/update', customer_controller.customer_update_get);

// POST request to update customer.
router.post('/customer/:id/update', customer_controller.customer_update_post);

// GET request for one customer.
router.get('/customer/:id', customer_controller.customer_detail);

// GET request for list of all customer items.
router.get('/customers', customer_controller.customer_list);

/// METER ///


// GET request for creating a meter. NOTE This must come before routes that display meter (uses id).
router.get('/meter/create', meter_controller.meter_create_get);

// POST request for creating meter.
router.post('/meter/create', meter_controller.meter_create_post);

// GET request to delete meter.
router.get('/meter/:id/delete', meter_controller.meter_delete_get);

// POST request to delete meter.
router.post('/meter/:id/delete', meter_controller.meter_delete_post);

// GET request to update meter.
router.get('/meter/:id/update', meter_controller.meter_update_get);

// POST request to update meter.
router.post('/meter/:id/update', meter_controller.meter_update_post);

// GET request for one meter.
router.get('/meter/:id', meter_controller.meter_detail);

// GET request for list of all meter items.
router.get('/meters', meter_controller.meter_list);

///BILLING ROUTES ///

// GET request for creating a billing. NOTE This must come before routes that display billing (uses id).
router.get('/billing/create', billing_controller.billing_create_get);

// POST request for creating billing.
router.post('/billing/create', billing_controller.billing_create_post);

// GET request to delete billing.
router.get('/billing/:id/delete', billing_controller.billing_delete_get);

// POST request to delete billing.
router.post('/billing/:id/delete', billing_controller.billing_delete_post);

// GET request to update billing.
router.get('/billing/:id/update', billing_controller.billing_update_get);

// POST request to update billing.
router.post('/billing/:id/update', billing_controller.billing_update_post);

// GET request for one billing.
router.get('/billing/:id', billing_controller.billing_detail);

// GET request for list of all billing items.
router.get('/billings', billing_controller.billing_list);

module.exports = router;
