require('dotenv').config({path:'../../.env'})
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.cookies.salary_access_token;
    if (!token) {
      return res.redirect('/')
    }
    try {
      jwt.verify(token, process.env.jwt_secret, (err, user) => {
        if (err) return res.Status(403)
        req.user = user
        next()
      })
    } catch {
      return res.redirect('/');
    }
  };

  module.exports =  {auth}