var async = require('async');
var Meter = require ('../models/Meter');

//import validators and sanitizer
const { body, validationResult, sanitizeBody } = require('express-validator');
// Display list of all companies.
exports.meter_list = function(req, res, next) {
  
    Meter.find()
    .sort([['meterMacNumber', 'ascending']])
    .exec(function (err, list_meters){
        if(err){return next(err);}
        //Else
        //Success : means no error!
        //send it on the page (view) 'companies'
         res.send('/dashbord', {title: 'Compteurs installés', meter_list: list_meters });
      });
   
};

// Display detail page for a specific meter.
exports.meter_state_get = function(req, res, next) {
    
    async.parallel({
      meter: function(callback){
          Meter.findById(req.params.id)
          .exec(callback)
      }
    },function(err, results){
        if(err){return next(err);}//Error
        if(results.meter ==null){//In case no results
          var err = new Error('Compteur non trouvé');
          err.status = 404;
          return next(err);
        }
        //Success ? so let's render it to the appropriate view
        res.render('/dashbord',
                   {
                    title: 'Informations sur la compteur',
                    meter: results.meter,
                    })
      });
};

// Display meter create form on GET.
exports.meter_create_get = function(req, res, next) {
    //meter_form is the form with fields for creating a meter
    res.send('/dashbord', {title : 'Enregistrer une compteur'});
};

// Handle meter create on POST.
exports.meter_create_post =[
    //First : validate fields
    //body('meterMacNumber').isLength({min:1}).trim().withMessage('Le nom de la compagnie doit être specifié'),
    //This data comes from meter
    
    //Then : sanitize fields
    //sanitizeBody('*').escape(),
    //Finaly : process request after validation and sanitization
    function (req, res, next){
      //Extract the validation errors from req
      const errors = validationResult(req);
      
      //Create meter object
      var meter = new meter (
      {
        meterMacNumber: req.body.meterMacNumber,
        meterRFIDNumber: req.body.meterRFIDNumber,
        meterSIMNumber: req.bodymeterSIMNumber,
        meterHardwareVersion: req.body.meterHardwareVersion,
        meterFirmewareVersion: req.body.meterFirmewareVersion,
        meterIssueDate: req.body.meterIssueDate,
        meterCommissionigDate: req.body.meterCommissionigDate,
        meterInfos: req.body.meterInfos,
        // Statuts 0 = Non utiisé et 1 = Utilisé
        meterStatus: req.body.meterStatus,
        meterOther: req.body.meterOther,
        // GPS LOACTION
        //format : lat : lat, long: long, alti : alti
        meterLocation: req.body.meterLocation

        });
      
      if(!errors.isEmpty()){
        //There are errors. Render form again with sanitized values/errors messages
        //The meter_form is the view we render on fields that are filled with data
        //to submit
        res.render('/dashboard', { title : 'Enregistrer une compteur', meter: meter, errors: errors.array() });
            return;
      }
      else{
        //Valid data
        //Persist the meter to database
        meter.save((err)=>{
          if(err) {
            return next(err);
            }
            //Redirect to new created meter
            //url is a *virtual*
            res.redirect('/dashboard');
          });
      }
    }
];

// Display meter delete form on GET.
exports.meter_delete_get = function(req, res, next) {
    async.parallel({
      meter: function (callback){
        Meter.findById(req.params.id).exec(callback)
      },function (err, results){
        if(err) {return next(err);}
        if(results.meter ===null){
          //case we found nothing
          //Case the main route is (watertech)
          res.redirect('/dashboard');
        }
        //Let's render then
        res.render('/dashboard', {title: 'Supprimer compteur', meter: results.meter});
      }});  
};

// Handle meter delete on POST.
exports.meter_delete_post = function(req, res, next) {
    async.parallel({
      meter : function (callback){
        meter.findById(req.body.meterid).exec(callback)
      },
    }, function (err, results){
      
      if(err){return next(err);}
      //Success
      //Clear the object then redirect to the dashboard
        meter.findByIdAndRemove(req.body.meterid, function deletemeter(err) {
                if (err) { return next(err); }
                // Success - go to meter list.
                //Make sure in routes 'watertech' is our root document route.
                res.redirect('/dashboard')
            })
      
    });
};

// Display meter update form on GET.
exports.meter_update_get = function (req, res, next) {

    meter.findById(req.params.id, function (err, author) {
        if (err) { return next(err); }
        if (meter == null) { // No results.
            var err = new Error('Compteur introuvable ! ');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('/dashboard', { title: 'Mise à jour du Compteur', meter: meter });
    });
};

// Handle meter update on POST.
exports.meter_update_post = [

    // Validate fields.
    
    // Sanitize fields.
    //sanitizeBody('*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data (and the old id!)
        var meter = new meter(
            {
                meterMacNumber: req.body.meterMacNumber,
                meterRFIDNumber: req.body.meterRFIDNumber,
                meterSIMNumber: req.bodymeterSIMNumber,
                meterHardwareVersion: req.body.meterHardwareVersion,
                meterFirmewareVersion: req.body.meterFirmewareVersion,
                meterIssueDate: req.body.meterIssueDate,
                meterCommissionigDate: req.body.meterCommissionigDate,
                meterInfos: req.body.meterInfos,
                // Statuts 0 = Non utiisé et 1 = Utilisé
                meterStatus: req.body.meterStatus,
                meterOther: req.body.meterOther,
                // GPS LOACTION
                //format : lat : lat, long: long, alti : alti
                meterLocation: req.body.meterLocation,
                _id: req.params.id
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('meter', { title: 'Mise à jour Compteur', meter: meter, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            meter.findByIdAndUpdate(req.params.id, meter, {}, function (err, themeter) {
                if (err) { return next(err); }
                // Successful - redirect to detail page.
                //Make sure in meter virtual we defined url
                res.redirect('/dashboard');
            });
        }
    }
];