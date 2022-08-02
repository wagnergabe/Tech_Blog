const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// class simply allow methods and data to be packaged together and used elsewhere in our code
// setting up models as classes gives developers much scalability for our table to have added methods, which act on the model data, when our app functionality grows
class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: DataTypes.STRING,
    allowNull: false
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Post'

  }
);

module.exports = Post;
