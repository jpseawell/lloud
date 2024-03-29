"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LikeSchema extends Schema {
  up() {
    this.create("likes", table => {
      table.increments();
      table.bigInteger("user_id");
      table.bigInteger("song_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("likes");
  }
}

module.exports = LikeSchema;
