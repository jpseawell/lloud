'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Play extends Model {
    song() {
        return this.belongsTo("App/Models/Song");
    }

    user() {
        return this.belongsTo("App/Models/User");
    }
}

module.exports = Play
