import {
  AuthorModel,
  NewsCategoryModel,
  NewsCommentModel,
  NewsLikeModel,
  NewsModel,
} from "../model/index";
require("../model/associations/index");

import { queryPayload } from "../../helper/QueryPayload";

require('../model/associations/index');

import { QueryTypes, Op } from 'sequelize';
import { sequelize } from "../init";

class NewsQuery {
  async find(payload: queryPayload) {
    const options: any = { ...payload };
    return await NewsModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    return await NewsModel.findAndCountAll({ ...payload,
      include: [
        {
          model: AuthorModel,
          required: false,
        },
        {
          model: NewsCategoryModel,
          required: false,
        }
      ]
       });
  }

  async getNewsDetail(payload: queryPayload) {
    const options: any = {
      ...payload,
      include: [
        {
          model: AuthorModel,
          required: false,
        },
        {
          model: NewsLikeModel,
          required: false,
        },
        {
          model: NewsCategoryModel,
          required: false,
        },
        {
          model: NewsCommentModel,
          required: false,
        },
      ],
    };
    return await NewsModel.findAll(options);
  }

  async getNewsDetailRaw(payload: queryPayload) {
    
  let additionalQuery: string = ``;
  let additionalQueryLimitOffset: string = ``;

  if(payload.where.category_id){
    additionalQuery = `${additionalQuery} AND t1.category_id = ${payload.where.category_id} `
  }
  if(payload.where.title){
    additionalQuery = `${additionalQuery} AND title ilike '%${payload.where.title}%' `
  }
  if(payload.where.author_id){ 
    additionalQuery = `${additionalQuery} AND t1.author_id = ${payload.where.author_id} `
  }
  if(payload.where.status !== undefined){ 
    additionalQuery = `${additionalQuery} AND t1.status = '${payload.where.status}' `
  }
  if(payload.where.is_recommendation !== undefined){ 
    additionalQuery = `${additionalQuery} AND is_recommendation = ${payload.where.is_recommendation} `
  }
  if(payload.where.is_trending !== undefined){ 
    additionalQuery = `${additionalQuery} AND is_trending = ${payload.where.is_trending} `
  }

  additionalQuery = `${additionalQuery} ORDER BY t1.created_at DESC `;

  if(payload.limit){ 
    additionalQuery = `${additionalQuery} LIMIT ${payload.limit} `;
    // additionalQueryLimitOffset = `${additionalQueryLimitOffset} LIMIT ${payload.limit} `;
  }

  if(payload.offset || payload.offset === 0){ 
    additionalQuery = `${additionalQuery} OFFSET ${payload.offset} `;
    // additionalQueryLimitOffset = `${additionalQueryLimitOffset} OFFSET ${payload.offset} `;
  }

  const query: string = `
  SELECT
  c.*,
  (like_count + total_likes) as total_likes,
  count(d.id) as total_comment
FROM
  (
      SELECT
          a.*,
          count(b.id) as total_likes
      FROM
          (
              SELECT
                  t1."id",
                  t1.like_count,
                  "author_id",
                  "news_url",
                  "title",
                  "image_url",
                  t1."status",
                  "category_id",
                  "posted_at",
                  t1."updated_at",
                  t1."created_at",
                  "is_recommendation",
                  "is_trending",
                  "total_visit",
                  t2.author_name,
                  category_name,
                  count(*) over() as total_data
              FROM
                  t_news t1
                  INNER JOIN t_author t2 ON t1.author_id = t2.id
                  INNER JOIN t_news_category t3 ON t1.category_id = t3.id
                  WHERE t1.id IS NOT NULL
                  ${additionalQuery}
          ) a
          LEFT JOIN t_news_like b ON b.news_id = a.id
      GROUP BY
          a.id,
          a.author_id,
          a.news_url,
          title,
          image_url,
          status,
          category_id,
          posted_at,
          updated_at,
          a.created_at,
          is_recommendation,
          is_trending,
          total_visit,
          author_name,
          category_name,
          b.id,
          total_data,
          like_count
  ) c
  LEFT JOIN t_news_comment d ON d.news_id = c.id
GROUP BY
  c.id,
  "author_id",
  "news_url",
  "title",
  "image_url",
  "status",
  "category_id",
  "posted_at",
  c."updated_at",
  c.created_at,
  "is_recommendation",
  "is_trending",
  "total_visit",
  author_name,
  category_name,
  c.total_likes,
  total_data,
  like_count
  ${additionalQueryLimitOffset}
  ORDER BY c.created_at DESC
  `;
  
  return await sequelize.query(
    query,
    {
        type: QueryTypes.SELECT
    });
  }

  async update(value: any, payload: any) {
    return await NewsModel.update(value, { ...payload });
  }

  async insert(value: any, payload: queryPayload) {
    return await NewsModel.create(value, { ...payload });
  }

  async destroy(payload: queryPayload) {
    return await NewsModel.destroy({ ...payload });
  }
}

export const newsQuery = new NewsQuery();
