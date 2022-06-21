const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
      res.redirect('/signin');
    } else {
      // if the user is logged in, exeucte the routefunction that will allow them to view the jobs
      // Calling next if the user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;