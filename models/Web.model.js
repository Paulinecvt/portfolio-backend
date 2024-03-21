const { Schema, model } = require("mongoose");

const webSchema = new Schema(
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
    
      },
    );

const Web = model("Web", webSchema);

module.exports = Web;
