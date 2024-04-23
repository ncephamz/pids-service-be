const jwt = require('jsonwebtoken');
const config = require('../infra/configs/global_config');
const wrapper = require('../helpers/utils/wrapper');
const { ERROR } = require('../helpers/http-status/status_code');
const { UnauthorizedError, ForbiddenError } = require('../helpers/error');
const { responseMessages, general: { FAIL }, roles: { ADMIN_P3D } } = require('../helpers/utils/constant');
const secretKey = config.get('/secretKey');

const generateToken = async (payload, expiresIn = '24h') => {
  const verifyOptions = {
    expiresIn
  };

  const token = jwt.sign(payload, secretKey.jwt, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    err: null,
    data: null
  };

  const token = getToken(req.headers);
  if (!token) {
    result.err = new ForbiddenError(responseMessages.TOKEN[403]);
    return wrapper.response(res, FAIL, result, responseMessages.TOKEN[403], ERROR.FORBIDDEN);
  }

  try {
    const decodedToken = await jwt.verify(token, secretKey.jwt);

    req.id = decodedToken.id;
    if (decodedToken.role) {
      req.role = decodedToken.role;
      req.p3dId = null;
      if (decodedToken.role.id == ADMIN_P3D) {
        req.p3dId = decodedToken.p3dId;
      }
    }

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.err = new UnauthorizedError(responseMessages.TOKEN[401]);
      return wrapper.response(res, FAIL, result, responseMessages.TOKEN[401], ERROR.UNAUTHORIZED);
    }

    result.err = new UnauthorizedError(responseMessages.TOKEN[400]);
    return wrapper.response(res, FAIL, result, responseMessages.TOKEN[400], ERROR.UNAUTHORIZED);
  }
};

const authorization = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.role.id)) {
      const result = { err: new ForbiddenError(responseMessages.ROLE[403]) };
      return wrapper.response(res, FAIL, result, result.err.message);
    }
    next();
  };
};

const verifyTokenVerificationAccount = async (req, res, next) => {
  const result = {
    err: null,
    data: null
  };

  const token = req.query.token ? req.query.token : null;
  if (!token) {
    result.err = new ForbiddenError(responseMessages.TOKEN[403]);
    return wrapper.response(res, FAIL, result, responseMessages.TOKEN[403], ERROR.FORBIDDEN);
  }

  try {
    const decodedToken = await jwt.verify(token, secretKey.jwt);

    req.id = decodedToken.id;
    if (decodedToken.role) {
      req.role = decodedToken.role;
    }

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      result.err = new UnauthorizedError(responseMessages.TOKEN[401]);
      return wrapper.response(res, FAIL, result, responseMessages.TOKEN[401], ERROR.UNAUTHORIZED);
    }

    result.err = new UnauthorizedError(responseMessages.TOKEN[400]);
    return wrapper.response(res, FAIL, result, responseMessages.TOKEN[400], ERROR.UNAUTHORIZED);
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authorization,
  verifyTokenVerificationAccount
};
