const models = require('../../helpers/databases/postgres/models');
const wrapper = require('../../helpers/utils/wrapper');

class AuthRepository {
  constructor() {
    this.models = models.init();
  }

  async findOneByEmail(email) {
    try {
      return wrapper.data(await this.models.Users.findOne({
        where: {
          email
        }
      }));
    } catch (error) {
      return wrapper.error(error);
    }
  }

  async updateLastLogin(id) {
    try {
      return wrapper.data(await this.models.Users.update(
        { lastLogin: new Date(), isLogin: true },
        { 
          where: {
            id
          }
        }
      ));
    } catch (error) {
      return wrapper.error(error);
    }
  }

}

module.exports = AuthRepository;
