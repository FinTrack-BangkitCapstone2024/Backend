const Model = require('./model')

class Financial extends Model {
  constructor() {
    super('financials')
  }
}

module.exports = new Financial()