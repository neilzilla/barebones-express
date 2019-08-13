const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthSchema = new Schema (
  {
    username: String,
    password: String
  },
  {timestamps: true}
);

/* eg Schema
const TestSchema= new Schema (
  {
    name: String,
    slug: String
  },
  {timestamps: true}
);
*/



module.exports = {
/* eg. schema export
  Test: mongoose.model("Test", TestSchema),
*/

  Auth: mongoose.model('Auth', AuthSchema)
}
