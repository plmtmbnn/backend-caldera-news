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
    additionalQuery = `${additionalQuery} LIMIT ${payload.limit} `
  }

  if(payload.offset){ 
    additionalQuery = `${additionalQuery} OFFSET = ${payload.offset} `
  }

  return await sequelize.query(
    `
      SELECT
        t1."id", 
        "author_id", 
        "news_url", 
        "title", 
        "image_url", 
        t1."status", 
        "category_id", 
        "posted_at", 
        t1."updated_at", 
        "is_recommendation", 
        "is_trending", 
        "total_visit",
        t2.author_name,
        category_name
      FROM t_news t1
      INNER JOIN t_author t2 ON t1.author_id = t2.id
      INNER JOIN t_news_category t3 ON t1.category_id = t3.id
      WHERE t1.id IS NOT NULL
      ${additionalQuery}
      
    `,
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
}

export const newsQuery = new NewsQuery();
