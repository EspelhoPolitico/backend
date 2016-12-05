const {mongoose} = require('./../db/mongoose');

let Deputy = mongoose.model('Deputy', {
  cod: {
    type: Number,
    required: true,
    unique: true,
  },
  annex: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  cabinet: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

module.exports = {Deputy};