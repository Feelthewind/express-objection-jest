const { Model } = require("objection");
const Idea = require("./Idea");

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  static get relationMappings() {
    return {
      idea: {
        relation: Model.BelongsToOneRelation,
        modelClass: Idea,
        join: {
          from: "comments.ideas_id",
          to: "ideas.id"
        }
      }
    };
  }
}

module.exports = Comment;
