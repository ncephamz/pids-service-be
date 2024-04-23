const Usecase = require('./usecase');
const model = require('./model');
const validator = require('../../helpers/utils/validator');
const wrapper = require('../../helpers/utils/wrapper');
const {
  responseMessages,
  general: {
    FAIL,
    SUCCESS
  }
} = require('../../helpers/utils/constant');

const authUsecase = new Usecase();

const login = async (req, res) => {
  const validatePayload = await validator.isValidPayload(req.body, model.login());
  if (validatePayload.err) {
    return wrapper.response(res, FAIL, validatePayload, validatePayload.err.message);
  }

  const result = await authUsecase.login(validatePayload.data);
  if (result.err) {
    return wrapper.response(res, FAIL, result, result.err.message);
  }

  return wrapper.response(res, SUCCESS, result, responseMessages.AUTH.LOGIN[200]);
};

module.exports = {
  login,
};
