import {
  AuthorModel,
  NewsCategoryModel,
  NewsCommentModel,
  NewsLikeModel,
  NewsModel,
  UserModel,
  TagModel,
  TagMappingModel
} from "../index";

UserModel.hasOne(AuthorModel, { foreignKey: "user_id" });
AuthorModel.belongsTo(UserModel, { foreignKey: "user_id" });

UserModel.hasOne(NewsCommentModel, { foreignKey: "user_id" });
NewsCommentModel.belongsTo(UserModel, { foreignKey: "user_id" });

UserModel.hasOne(NewsLikeModel, { foreignKey: "user_id" });
NewsLikeModel.belongsTo(UserModel, { foreignKey: "user_id" });

AuthorModel.hasOne(NewsModel, { foreignKey: "author_id" });
NewsModel.belongsTo(AuthorModel, { foreignKey: "author_id" });

NewsCategoryModel.hasOne(NewsModel, { foreignKey: "category_id" });
NewsModel.belongsTo(NewsCategoryModel, { foreignKey: "category_id" });

NewsModel.hasOne(NewsLikeModel, { foreignKey: "news_id" });
NewsLikeModel.belongsTo(NewsModel, { foreignKey: "news_id" });

NewsModel.hasOne(NewsCommentModel, { foreignKey: "news_id" });
NewsCommentModel.belongsTo(NewsModel, { foreignKey: "news_id" });

NewsModel.hasOne(TagMappingModel, { foreignKey: "news_id" });
TagMappingModel.belongsTo(NewsModel, { foreignKey: "news_id" });

TagModel.hasMany(TagMappingModel, { foreignKey: "tag_id" });
TagMappingModel.belongsTo(TagModel, { foreignKey: "tag_id" });