import jwt from 'jsonwebtoken';

function getSecret () {
  return Buffer.from(process.env.SECRET_KEY, 'base64').toString();
}

export function token (userParam: any): any {
  let encodedToken: any = null;
  try {
    encodedToken = jwt.sign({ data: userParam }, getSecret());
  } catch (error) {
    console.log('jwt.ts - token', error);
  }
  return encodedToken;
}

export function verifyToken (token: string) {
  var userLogin = null;
  try {    
    var decodedToken: any = jwt.verify(token, getSecret());
    userLogin = decodedToken.data;
    return userLogin;
  } catch (e) {
    console.log('verifyToken', e.message);
    return 'error';
  }
}

export function verifyTokenAccess (token) {
  var userLogin = null;
  var result = {};
  try {
    var decodedToken: any = jwt.verify(token, getSecret());
    userLogin = Buffer.from(decodedToken.data, 'base64').toString('ascii');
    result = { userLogin };
    return result;
  } catch (e) {
    console.log('verifyTokenAccess', e.message);
    return 'error';
  }
}
