"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Song extends Model {
  audioFile() {
    return this.hasOne("App/Models/AudioFile");
  }

  imageFile() {
    return this.hasOne("App/Models/ImageFile");
  }

  artists() {
    return this.belongsToMany("App/Models/Artist").pivotTable("artist_songs");
  }
}

module.exports = Song;