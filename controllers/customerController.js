var Customer = require('../models/Customer');
var Company = require('../models/Company');
var Meter = require ('../models/Meter');
var Account = require ('../models/Account');


// import validators and sanitizer
const { body, validationResult } = require( ' express-validator/check' );
const { sanitizeBody } = require('express-validator/filter');


// Display list of all customers.
exports.customer = function(req, res, next) {
  Customer.find()
    //.sort([['companyName', 'ascending']])
    .exec(function (err, customers){
        if(err){return next(err);}
        //Else
        //Success : means no error!
        //send it on the page (view) 'companies'
         res.send('customers', {title: 'Clients Abonnés', customer_list: customers });
      });

};

// Display detail page for a specific customer.
exports.customer_detail = function(req, res, next) {

    async.parallel({
      customer: function(callback){
          Customer.findById(req.params.id)
          .populate('Company')
          .populate('Meter')
          .populate('Account')
          .exec(callback)
      }
    },function(err, results){
        if(err){return next(err);}//Error
        if(results.customer ==null){//In case no results
          var err = new Error('Client non trouvé');
          err.status = 404;
          return next(err);
        }
        //Success ? so let's render it to the appropriate view
        // res.render('/client',
        res.render('/dashboard',
                   {
                    title: 'Informations sur le client',
                    customer: results.customer,
                    Meter: results.Meter,
                    Account: results.Account

                    })
      });
};


// Display company create form on GET.
exports.customer_create_get = function(req, res, next) {
    //company_form is the form with fields for creating a Customer
    res.send('customer_form', {title : 'Enregistrer un client'});
};


// Handle company create on POST.
exports.customer_create_post =[
    //First : validate fields
  //  body('companyName').isLength({min:1}).trim().withMessage('Le nom de la compagnie doit être specifié'),

    //Then : sanitize fields
    sanitizeBody('*').escape(),
    //Finaly : process request after validation and sanitization
    function (req, res, next){
      //Extract the validation errors from req
      const errors = validationResult(req);

      //Create Customer object
      var customer = new Customer (
      {
        Company:  req.body.companyId,
        Meter: req.body.meterId,
        Account: req.body.accountId,
        });

      if(!errors.isEmpty()){
        //There are errors. Render form again with sanitized values/errors messages
        //TheCustomer_form is the view we render on fields that are filled with data
        //to submit
        res.render('customer_form',
             { title : 'Enregistrer un client', customer: customer, errors: errors.array() });
            return;
      }
      else{
        //Valid data
        //Persist the Customer to database
        Customer.save((err)=>{
          if(err) {
            return next(err);
            }
            //Redirect to new created Customer
            //url is a *virtual*
            res.redirect('customer_url');
          });
      }
    }
];


// Display customer delete form on GET.
exports.customer_delete_get = function(req, res, next) {
    async.parallel({

      customer: function(callback){
        Customer.findOneAndRemove ({_id: req.params.id})
          .exec(callback)
      }
      },function (err, results){
        if(err) {return next(err);}
        if(results.Customer ===null){
          //case we found nothing
          //Case the main route is (watertech)
          res.redirect('/watertech/customers');
        }
        //Let's render then
        res.redirect('/watertech/customers');
      });

};


// Handle customer delete on POST.


// Display customer update form on GET.
exports.customer_update_get = function (req, res, next) {

    Customer.findById(req.params.id, function (err, author) {
        if (err) { return next(err); }
        if (Customer == null) { // No results.
            var err = new Error('Client introuvable ! ');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('Customer_form', { title: 'Mise à jour du client', Customer: Customer });
    });
};


// Handle customer update on POST.
exports.customer_update_post = [

    // Validate fields.
    // body('companyName').isLength({ min: 1 }).trim().withMessage('Le nom de la Compagnie doit être spécifié !')
    //     .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data (and the old id!)
        var customer = new Customer(
            {
              Company:  req.body.companyId,
              Meter: req.body.meterId,
              Account: req.body.accountId,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('customer', { title: 'Mise à jour du client', customer: customer, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Customer.findByIdAndUpdate(req.params.id, customer, {}, function (err, theCompany) {
                if (err) { return next(err); }
                // Successful - redirect to detail page.
                //Make sure in company virtual we defined url
                res.redirect('customer_url');
            });
        }
    }
];
