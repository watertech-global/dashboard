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
    //company_form is the form with fields for creating a company
    res.send('company_form', {title : 'Enregistrer une Compagnie'});
};

// Handle company create on POST.
exports.company_create_post =[
    //First : validate fields
    body('companyName').isLength({min:1}).trim().withMessage('Le nom de la compagnie doit être specifié'),
    
    //Then : sanitize fields
    sanitizeBody('*').escape(),
    //Finaly : process request after validation and sanitization
    function (req, res, next){
      //Extract the validation errors from req
      const errors = validationResult(req);
      
      //Create Company object
      var company = new Company (
      {
        companyName: req.body.companyName,
        //This address data, can be simply saved as a text, but coded as a mixed pattern
        companyAdress: req.body.companyAdress,
        companyContact req.body.companyContact,
        account: req.body.account,
        tarrifCode: req.body.tarrifCode
        });
      
      if(!errors.isEmpty()){
        //There are errors. Render form again with sanitized values/errors messages
        //The company_form is the view we render on fields that are filled with data
        //to submit
        res.render('company_form', { title : 'Enregistrer une Compagnie', company: company, errors: errors.array() });
            return;
      }
      else{
        //Valid data
        //Persist the company to database
        company.save((err)=>{
          if(err) {
            return next(err);
            }
            //Redirect to new created company
            //url is a *virtual*
            res.redirect(company.url);
          });
      }
    }
];

// Display company delete form on GET.
exports.company_delete_get = function(req, res, next) {
    async.parallel({
      company: function (callback){
        Company.findById(req.params.id).exec(callback)
      },
      company_customers: function (callback){
        Customer.find({'company': req.params.id}).exec(callback)
      },
      company_meters: function(callback){
         Meter.find({'company': req.params.id}).exec(callback)
      },
      },function (err, results){
        if(err) {return next(err);}
        if(results.company ===null){
          //case we found nothing
          //Case the main route is (watertech)
          res.redirect('/watertech/companies');
        }
        //Let's render then
        res.render('company_delete', {title: 'Supprimer compangie abonnée', company: results.company, company_customers : results.company_customers, company_meters : results.company_meters});
      });
    
};

// Handle company delete on POST.
exports.company_delete_post = function(req, res, next) {
    async.parallel({
      company : function (callback){
        Company.findById(req.body.companyid).exec(callback)
      },
      company_customers: function (callback){
        Customer.find({'company':req.body.companyid}).exec(callback)
      },
      company_meters: function (callback){
         Meter.find({'company': req.body.companyid}).exec(callback)
      },
    }, function (err, results){
      
      if(err){return next(err);}
      //Success
      if(results.company_customers.length > 0 && results.company_customers.length > 0){
        //Company has customers.
        //Company has meters
        //Render them
        res.render('company_delete', {title : 'Supprimer compagnie', company: results.company, company_customers : results.company_customers, company_meters : results.company_meters});
        return;
      }else if(results.company_customers.length > 0){
        //Company has customers.
        //Customers has no meters yet
        //Render them
        res.render('company_delete', {title : 'Supprimer compagnie', company: results.company, company_customers : results.company_customers});
        return;
      }else {
        //Company has no customers. Clear the object then redirect to the list of companies
        Company.findByIdAndRemove(req.body.companyid, function deleteCompany(err) {
                if (err) { return next(err); }
                // Success - go to company list.
                //Make sure in routes 'watertech' is our root document route.
                res.redirect('/watertech/companies')
            })
      }
    });
};

// Display company update form on GET.
exports.company_update_get = function (req, res, next) {

    Company.findById(req.params.id, function (err, author) {
        if (err) { return next(err); }
        if (company == null) { // No results.
            var err = new Error('Compangie introuvable ! ');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('company_form', { title: 'Mise à jour de la Compangie Author', company: company });
    });
};

// Handle company update on POST.
exports.company_update_post = [

    // Validate fields.
    body('companyName').isLength({ min: 1 }).trim().withMessage('Le nom de la Compagnie doit être spécifié !')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data (and the old id!)
        var company = new Company(
            {
                companyName: req.body.companyName,
                //This address data, can be simply saved as a text, but coded as a mixed pattern
                companyAdress: req.body.companyAdress,
                companyContact req.body.companyContact,
                account: req.body.account,
                tarrifCode: req.body.tarrifCode
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('company', { title: 'Mise à jour Compagnie', company: company, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Company.findByIdAndUpdate(req.params.id, company, {}, function (err, theCompany) {
                if (err) { return next(err); }
                // Successful - redirect to detail page.
                //Make sure in company virtual we defined url
                res.redirect(theCompany.url);
            });
        }
    }
];
