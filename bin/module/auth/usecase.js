require('dotenv').config();

const AuthRepository = require('./repository');
const config = require('../../infra/configs/global_config');
const wrapper = require('../../helpers/utils/wrapper');
const logger = require('../../helpers/utils/logger');
const common = require('../../helpers/utils/common');
const jwtAuth = require('../../auth/jwt_auth_helper');
const constant = require('../../helpers/utils/constant');
const { InternalServerError, NotFoundError, UnauthorizedError } = require('../../helpers/error');

class AuthUsecase {
  constructor() {
    this.authRepository = new AuthRepository();
    this.ctx = __filename;
    this.secretKey = config.get('/secretKey');
  }

  async login({ email, password }){
    const { err, data } = await this.authRepository.findOneByEmail(email);
    if (err) {
      logger.error(this.ctx, err, 'login()');
      return wrapper.error(new InternalServerError(err));
    }
    if (!data) {
      return wrapper.error(new NotFoundError(constant.responseMessages.AUTH.LOGIN[404]));
    }
    if (!data.password) {
      return wrapper.error(new NotFoundError(constant.responseMessages.AUTH.LOGIN[406]));
    }

    const decryptPassword = await common.decrypt(data.password, 'aes-256-cbc', this.secretKey.encryptPasswordProfile);
    if (decryptPassword !== password) {
      return wrapper.error(new UnauthorizedError(constant.responseMessages.AUTH.LOGIN[401]));
    }

    const [
      token,
      { err: errUpdateLastLogin }
    ] = await Promise.all([
      await jwtAuth.generateToken({ id: data.id, email: email }),
      await this.authRepository.updateLastLogin(data.id)
    ]);
    if (errUpdateLastLogin) {
      return wrapper.error(new InternalServerError(err));
    }

    return wrapper.data({ token });
  }
}

module.exports = AuthUsecase;
