const { Model } = require("objection");

const Comment = require("./Comment");

class Idea extends Model {
  static get tableName() {
    return "ideas";
  }

  static get relationMappings() {
    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "ideas.id",
          to: "comments.ideas_id"
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["idea", "creator"],
      properties: {
        idea: { type: "string", minLength: 1, maxLength: 255 },
        creator: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }
}

module.exports = Idea;
