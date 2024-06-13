const Model = require('./model');

class Inventaris extends Model {
  constructor() {
    super('inventaris');
  }
}

module.exports = new Inventaris();
