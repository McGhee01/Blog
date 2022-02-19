const withAuth = (re,res,next) => {
    if(!requestAnimationFrame.session.user_id) {
        res.redirect('/login');
    }

    else {
        next();
    }
};

module.exports = withAuth;