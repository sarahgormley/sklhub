const withAuth = (req, res, next) => {
  // If the user not logged in, redirect the user to the login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      // if the user is logged in, exeucte the routefunction that will allow them to view the jobs
      // Calling next if the user is authenticated
      next();
    }
  };
    
  module.exports = withAuth;