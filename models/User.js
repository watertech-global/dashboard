//  User controller
//   Require mongoose
var mongoose = require( 'mongoose' );
//   account worker customer agent
//  Require models
var User = require('../models/User');
var Customer = require('../models/Customer');
var Worker = require('../models/Worker');
var Agent = require('../models/Agent');

//validator and sanitizor
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

var async = require('async');


// Display list of all user.
exports.user_list = function (req, res, next) {

    User.find()
        .sort([['firstName', 'ascending']])
        .exec(function (err, list_user) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('user_list', { title: 'User List', user_list: list_user });
        })

};


// Display detail page for a specific User.
exports.user_detail = function (req, res, next) {

    async.parallel({
        user: function (callback) {
            User.findById(req.params.id)
                .exec(callback)
        },
        
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.user == null) { // No results.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('user_detail', { title: 'User Detail', user: results.user });
    });

};


// Handle user create on POST.
exports.user_create_post = [

    // Validate fields.
    body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('lastName').isLength({ min: 1 }).trim().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('email').isEmail().trim().withMessage('Email must be specified.'),
    body('age').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isNumeric().withMessage('Age have to be a valid number.'),
    // Sanitize fields.
    sanitizeBody('*').escape(),
 
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create user object with escaped and trimmed data
        var user = new User(
            {
                //Saving refs to other documents works the same way you normally save properties,
                // just assign the _id value:
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                personFunction:req.body.personFunction,
                phone:req.body.phone,
                details:req.body.details
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('user_form', { title: 'Create User', user: user, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save user.
            user.save(function (err) {
                if (err) { return next(err); }
				
                //Save a user as a Customer 
                if(req.body.userFunction == 'Customer'){

                    var customer = new Customer({
                        user : user._id, //assign the user id here

                    });

                    customer.save(function(err){
                        if(err){return handleError(err)};
                    });

                }

				 //Save a user as a Worker
                if(req.body.userFunction == 'Worker'){

                    var worker = new Worker({
                        user : user._id, //assign the user id here
                    });

                    worker.save(function(err){
                        if(err){return handleError(err)};
                    });

                }
				
				//Save a user as a Agent
                if(req.body.userFunction == 'Agent'){

                    var agent = new Agent({
                        user : user._id, //assign the user id here
                    });

                    agent.save(function(err){
                        if(err){return handleError(err)};
                    });

                }

                // Successful - redirect to new user record.
                res.redirect(user.url);
            });
        }
    }
];


// Display user delete form on GET.
exports.user_delete_get = function (req, res, next) {

    async.parallel({
        user: function (callback) {
            User.findById(req.params.id).exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.user == null) { // No results.
            res.redirect('/ ');
        }
        // Successful, so render.
        res.render('user_delete', { title: 'Delete User', user: results.user });
    });

};


//Handle User delete on POST
exports.user_delete_post = function (req, res, next) {

    async.parallel({
        user: function (callback) {
            User.findById(req.body.userid).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        // Delete object and redirect to the list of users.
        User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
                if (err) { return next(err); }
                // Success - go to user list.
                res.redirect('/ ')
            })
    });

};



//Display User update on GET
exports.user_update_get = function (req, res, next) {

    User.findById(req.params.id, function (err, user) {
        if (err) { return next(err); }
        if (user == null) { // No results.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('user_form', { title: 'Update User', user: user });

    });
};



//Handle User update on POST
exports.user_update_post = [

    // Validate fields.
    body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('lastName').isLength({ min: 1 }).trim().withMessage('Last name must be specified.')
        .isAlphanumeric().withMessage('Last name has non-alphanumeric characters.'),
    body('email').isEmail().trim().withMessage('Email must be specified.'),
    body('age').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isNumeric().withMessage('Age have to be a valid number.'),
    // Sanitize fields.
    sanitizeBody('*').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create user object with escaped and trimmed data
        var user = new User(
            {
                //Saving refs to other documents works the same way you normally save properties,
                // just assign the _id value:
                _id: new mongoose.Types.ObjectId(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                age: req.body.age,
                personFunction:req.body.personFunction,
                phone:req.body.phone,
                details:req.body.details
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('user_form', { title: 'Update User', user: user, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            User.findByIdAndUpdate(req.params.id, user, {}, function (err, theuser) {
                if (err) { return next(err); }
                // Successful - redirect to genre detail page.
                res.redirect(theuser.url);
            });
        }
    }
];

