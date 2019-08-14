var Company = require('../models/Company');
var async = require('async');
var Customer = require('../models/Customer');
var Meter = require ('../models/Meter');

//import validators and sanitizer
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
// Display list of all companies.
exports.company_list = function(req, res, next) {
  
    Company.find()
    .sort([['companyName', 'ascending']])
    .exec(function (err, list_companies){
        if(err){return next(err);}
        //Else
        //Success : means no error!
        //send it on the page (view) 'companies'
         res.send('companies', {title: 'Compagnies Abonnées', company list: list_companies });
      });
   
};

// Display detail page for a specific company.
exports.company_detail = function(req, res, next) {
    
    async.parallel({
      company: function(callback){
          Company.findById(req.params.id)
          .exec(callback)
      },
      companies_customers : function(callback){
        Customer.find({'company': req.params.id}, 'Clients de la compagnie')
        .exec(callback)
      },
      companies_meters : function(callback){
        Meter.find({'company': req.params.id}, 'Compteurs installés par compagnie')
        .exec(callback)
      }
    },function(err, results){
        if(err){return next(err);}//Error
        if(results.company ==null){//In case no results
          var err = new Error('Compagnie non trouvée');
          err.status = 404;
          return next(err);
        }
        //Success ? so let's render it to the appropriate view
        res.render('companies',
                   {
                    title: 'Informations sur la compagnie',
                    company; results.company,
                    company_customers: results.companies_customers,
                    company_meters: results.companies_meters
                    })
      });
};

// Display company create form on GET.
exports.company_create_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: company create GET');
};

// Handle company create on POST.
exports.company_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: company create POST');
};

// Display company delete form on GET.
exports.company_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: company delete GET');
};

// Handle company delete on POST.
exports.company_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: company delete POST');
};

// Display company update form on GET.
exports.company_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: company update GET');
};

// Handle company update on POST.
exports.company_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: company update POST');
};