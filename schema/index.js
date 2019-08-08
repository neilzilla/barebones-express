const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscoDildoSchema = new Schema (
  {
    name: String,
    slug: String
  },
  {timestamps: true}
);

module.exports = {
  DiscoDildo: mongoose.model("Tag", DiscoDildoSchema),
}
