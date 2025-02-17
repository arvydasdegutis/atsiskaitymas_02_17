exports.sayHello = (req, res, next) => {
    console.log("hello from middlewere");
    next();
  };
  
  exports.addRequestedDate = (req, res, next) => {
    req.requestedTime = new Date().toString();
    next();
  };
  