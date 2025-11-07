module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.TEXT,
    image: DataTypes.TEXT // base64 image
  });
  return Post;
};
