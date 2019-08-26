var Account = require ('../models/Account');

// import validators and sanitizer
const { body, validationResult } = require( ' express-validator/check' );
const { sanitizeBody } = require('express-validator/filter');


// Display list of all account.
exports.accounts = function(req, res, next) {

  Account.find()
    .sort([['Name', 'ascending']])
    .exec(function (err, customers){
        if(err){return next(err);}
        //Else
        //Success : means no error!
        //send it on the page (view) 'account'
         res.send('account_view', {title: 'Liste des comptes', account_list: accounts });
      });

};


// Display detail page for a specific account.
exports.account_detail = function(req, res, next) {

    async.parallel({
      account: function(callback){
          Account.findById(req.params.id)
          .exec(callback)
      }
    },function(err, results){
        if(err){return next(err);}//Error
        if(results.account ==null){//In case no results
          var err = new Error('Compte non trouvé');
          err.status = 404;
          return next(err);
        }
        //Success ? so let's render it to the appropriate view
        // res.render('/account',
        res.render('/dashboard',
                   {
                    title: 'Informations sur le compte',
                    Name: results.name,
                    login: results.login,
                    password: results.password,
                    roleCode: results.roleCode,
                    accessType: results.accessType,
                    access: results.access,
                    createdAt: results.createdAt,
                    updateAt: results.updateAt,

                    })
      });
};


// Display account create form on GET.
exports.account_create_get = function(req, res, next) {
    //account_form is the form with fields for creating a account
    res.send('account_form', {title : 'Enregistrer un compte'});
};


// Handle account create on POST.
exports.account_create_post =[
    //First : validate fields
   body('Name').isLength({min:1}).trim().withMessage('Le nom du titulaire du compte doit être specifié'),
   body('login').isLength({min:1}).trim().withMessage('Le login du titulaire du compte doit être specifié'),

    //Then : sanitize fields
    sanitizeBody('*').escape(),
    //Finaly : process request after validation and sanitization
    function (req, res, next){
      //Extract the validation errors from req
      const errors = validationResult(req);

      //Create account object
      var account = new Account (
      {
        Name: req.body..name,
        login: req.body..login,
        password: req.body..password,
        roleCode: req.body..roleCode,
        accessType: req.body..accessType,
        access: req.body..access,
        createdAt: req.body..createdAt,
        updateAt: req.body..updateAt,
        });

      if(!errors.isEmpty()){
        //There are errors. Render form again with sanitized values/errors messages
        //The account_form is the view we render on fields that are filled with data
        //to submit
        res.render('customer_form',
             { title : 'Enregistrer un compte', account: account, errors: errors.array() });
            return;
      }
      else{
        //Valid data
        //Persist the account to database
        Account.save((err)=>{
          if(err) {
            return next(err);
            }
            //Redirect to new created account
            //url is a *virtual*
            res.redirect('Account_url');
          });
      }
    }
];


// Display account delete form on GET.
exports.account_delete_get = function(req, res, next) {
    async.parallel({
      acount: function(callback){
          Account.findOneAndRemove ({_id: req.params.id})
          .exec(callback)
      }
      },function (err, results){
        if(err) {return next(err);}
        if(results.account ===null){
          //case we found nothing
          //Case the main route is (watertech)
          res.redirect('/watertech/account');
        }
        //Let's render then
        res.redirect('/watertech/account');
      });

};



// Display account update form on GET.
exports.account_update_get = function (req, res, next) {

  var account = new Account (
  {
    Name: req.body..name,
    login: req.body..login,
    password: req.body..password,
    roleCode: req.body..roleCode,
    accessType: req.body..accessType,
    access: req.body..access,
    createdAt: req.body..createdAt,
    updateAt: req.body..updateAt,
    });
    Account.findById(req.params.id, function (err, author) {
        if (err) { return next(err); }
        if (Account == null) { // No results.
            var err = new Error('Compte introuvable ! ');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('Account_form', { title: 'Mise à jour du comptes', account: account });
    });
};



// Handle account update on POST.
exports.account_update_post = [

  //First : validate fields
 body('Name').isLength({min:1}).trim().withMessage('Le nom du titulaire du compte doit être specifié'),
 body('login').isLength({min:1}).trim().withMessage('Le login du titulaire du compte doit être specifié'),

  //Then : sanitize fields
  sanitizeBody('*').escape(),
  //Finaly : process request after validation and sanitization
    function(req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Author object with escaped and trimmed data (and the old id!)
        var account = new Account (
        {
          Name: req.body..name,
          login: req.body..login,
          password: req.body..password,
          roleCode: req.body..roleCode,
          accessType: req.body..accessType,
          access: req.body..access,
          createdAt: req.body..createdAt,
          updateAt: req.body..updateAt,
          });
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render({ title : 'Enregistrer un compte', account: account, errors: errors.array() });
            return;

        else {
            // Data from form is valid. Update the record.
            Account.findByIdAndUpdate(req.params.id, account, {}, function (err, theAccount) {
                if (err) { return next(err); }
                // Successful - redirect to detail page.
                //Make sure in Account virtual we defined url
                res.redirect('Account_url');
            });
        }
    }
];
