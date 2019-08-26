var Country = require('../models/Country');

// import validators and sanitizer
const { body, validationResult } = require( ' express-validator/check' );
const { sanitizeBody } = require('express-validator/filter');


// Display list of all Country.
exports.countries = function(req, res, next) {

  Country.find()
    .sort([['countryName', 'ascending']])
    .exec(function (err, customers){
        if(err){return next(err);}
        //Else
        //Success : means no error!
        //send it on the page (view) 'country'
         res.send('/dashboard', {title: 'Liste des pays', country_list: countries });
      });

};


// Display detail page for a specific country.
exports.country_detail = function(req, res, next) {

    async.parallel({
      country: function(callback){
          Country.findById(req.params.id)
          .exec(callback)
      }
    },function(err, results){
        if(err){return next(err);}//Error
        if(results.country == null){//In case no results
          var err = new Error('Pays non trouvé');
          err.status = 404;
          return next(err);
        }
        //Success ? so let's render it to the appropriate view
        // res.render('/country',
        res.render('/dashboard',
                   {
                    title: 'Informations sur le pays',
                    countryName: results.countryName,
                    countryCode: results.countryCode
                    })
      });
};

// Display country create form on GET.
exports.country_create_get = function(req, res, next) {
    //company_form is the form with fields for creating a Customer
    res.send('country_form', {title : 'Enregistrer un pays'});
}



// Handle country create on POST.
exports.country_create_post =[
    //First : validate fields
   body('countryName').isLength({min:1}).trim().withMessage('Le nom du pays doit être specifié'),
   body('countryCode').isLength({min:1}).trim().withMessage('Le code du pays doit être specifié'),

    //Then : sanitize fields
    sanitizeBody('*').escape(),
    //Finaly : process request after validation and sanitization
    function (req, res, next){
      //Extract the validation errors from req
      const errors = validationResult(req);

      //Create country object
      var country = new Country (
      {
        countryName:  req.body.countryName,
        countryCode:  req.body.countryCode
        });

      if(!errors.isEmpty()){
        //There are errors. Render form again with sanitized values/errors messages
        //TheCustomer_form is the view we render on fields that are filled with data
        //to submit
        res.render('country_form',
             { title : 'Enregistrer un pays', country: country, errors: errors.array() });
            return;
      }
      else{
        //Valid data
        //Persist the Customer to database
        Country.save((err)=>{
          if(err) {
            return next(err);
            }
            //Redirect to new created Country
            //url is a *virtual*
            res.redirect('Country_url');
          });
      }
    }
];


// Display Country delete form on GET.
exports.Country_delete_get = function(req, res, next) {
    async.parallel({
      Country.findOneAndRemove ({_id: req.params.id})
      },function (err, results){
        if(err) {return next(err);}
        if(results.Country ===null){
          //case we found nothing
          //Case the main route is (watertech)
          res.redirect('/watertech/Country');
        }
        //Let's render then
        res.redirect('/watertech/Country');
      });

};


// Display Country update form on GET.
exports.country_update_get = function (req, res, next) {

    Country.findById(req.params.id, function (err, author) {
        if (err) { return next(err); }
        if (Country == null) { // No results.
            var err = new Error('Pays introuvable ! ');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('Country_form', { title: 'Mise à jour du pays', Country: Country });
    });
};



// Handle Country update on POST.
exports.Country_update_post = [

    // Validate fields.
    body('countryName').isLength({min:1}).trim().withMessage('Le nom du pays doit être specifié'),
    body('countryCode').isLength({min:1}).trim().withMessage('Le code du pays doit être specifié'),
    //     .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data (and the old id!)
        var country = new Country(
            {
              countryName:  req.body.countryName,
              countryCode:  req.body.countryCode,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('country', { title: 'Mise à jour du pays', country: country, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Country.findByIdAndUpdate(req.params.id, country, {}, function (err, theaccount) {
                if (err) { return next(err); }
                // Successful - redirect to detail page.
                //Make sure in company virtual we defined url
                res.redirect('customer_url');
            });
        }
    }
];
