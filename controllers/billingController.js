var Billing = require('../models/Billing');
var async = require('async');
var Customer = require('../models/Customer');

// Display list of all billings.
exports.billing_list = function(req, res, next) {
  
    Billing.find()
    .sort([['_id', 'ascending']])
    .exec(function (err, list_billings){
        if(err){return next(err);}
        //Else
        //Success : means no error!
        //send it on the page (view) 'billings'
         res.send('billings', {title: 'Abonnements', billing_list: list_billings });
      });
   
};

// Display detail page for a specific billing.
exports.billing_detail = function(req, res, next) {
    
    async.parallel({
      billing: function(callback){
          Billing.findById(req.params.id)
          .exec(callback)
      },
      billings_customers : function(callback){
        Customer.find({'billing': req.params.id}, 'Clients facturés')
        .exec(callback)
      }    },function(err, results){
        if(err){return next(err);}//Error
        if(results.billing ==null){//In case no results
          var err = new Error('Compagnie non trouvée');
          err.status = 404;
          return next(err);
        }
        //Success ? so let's render it to the appropriate view
        res.render('billings',
                   {
                    title: 'Abonnement du client',
                    billing: results.billing,
                    billing_customers: results.billings_customers,
                    })
      });
};
