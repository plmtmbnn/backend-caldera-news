SELECT
    c.*,
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
                FROM
                    "t_news" t1
                    INNER JOIN t_author t2 ON t1.author_id = t2.id
                    INNER JOIN t_news_category t3 ON t1.category_id = t3.id
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
            is_recommendation,
            is_trending,
            total_visit,
            author_name,
            category_name,
            b.id
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
    "is_recommendation",
    "is_trending",
    "total_visit",
    author_name,
    category_name,
    c.total_likes