import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // console.log(req.headers);
    // 1. Read the token
    let token = req.headers["authorization"];
    if (!token) return res.status(401).send("Unauthorized");
     token = token
       ?.replace("Bearer ", "")
       ?.replace("Bearer ", "")
       ?.replace("bearer ", "");
    // console.log('token', token);
    // 2. if no token, return the error.
    if(!token) return res.status(401).send('Unauthorized');

    // 3. check if token is valid.
    try {
        // const payload = jwt.verify(token, "pwuB6Ynnry");
        // console.log(payload);
        jwt.verify(token, "pwuB6Ynnry", (err, user) => {
          if (err) return res.sendStatus(403); // Forbidden
          console.log('user', user);
          req.user = user; // Store the user object in the request
          req.userID = user.userID;
          //   next(); // Move to the next middleware
        //   console.log('user', user)
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send("Unauthorized");
    }

    next();

}

export default jwtAuth;