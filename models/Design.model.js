// DESIGN model

const { Schema, model } = require("mongoose");

const designSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    improvements: {
      type: Array,
    },
    implemented : {
      type: Boolean,
      default: false,
    },
    images : {
        type: Array,
        },
    category: {
        type: String,
        },
    linkToWeb: {
      type: String,
    },
    linkToCode: {
      type: String,
    },
    languages: {
      type: Array,
    },
    createdAt: {
      type: String,
    },
    team: {
      type: Array,
    }

  }
);

const Design = model("Design", designSchema);

module.exports = Design;

