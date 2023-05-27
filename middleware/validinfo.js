module.exports = function(req, res, next) {
    const { email, hashedPassword, identifiant } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      if (![email, identifiant, hashedPassword].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json({invalid:true});
      }
    } else if (req.path === "/login") {
      if (![email, hashedPassword].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.json("Invalid Email");
      }
    }
  
    next();
  };