import Users from './../features/user/user_model.js';

const basicAuthorizer = (req, res, next) => {
  // check if authorization header is empty
  const authHeader = req.headers["authorization"];
  console.log(authHeader); // Basic a2FuaGFpeWFAZ21haWwuY29tOmthbmhhaXlhQDEyMw==

  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }

  // extract credentials
  const base64Credentials = authHeader.replace("Basic ", "");

  console.log(base64Credentials);

  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  console.log(decodedCreds); // kanhaiya@gmail.com:kanhaiya@123
  const creds = decodedCreds.split(":");
  console.log(creds); // [ 'kanhaiya@gmail.com', 'kanhaiya@123' ]

  const user = Users.getAll().find(u => u.email == creds[0] && u.password == creds[1]);

  if(user){
    next();
  } else {
    return res.status(401).send("Incorrect Credentials");
  }
}

export default basicAuthorizer;