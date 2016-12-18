const {mongoose} = require('./../db/mongoose');

let Senator = mongoose.model('Senator', {
  cod: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
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
  title: {
    type: String,
  },
  webPage: {
    type: String
  },
});

module.exports = {Senator};