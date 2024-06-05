const Model = require('./model')
class Usaha extends Model {
  constructor() {
    super('usaha')
  }
}

module.exports = new Usaha()