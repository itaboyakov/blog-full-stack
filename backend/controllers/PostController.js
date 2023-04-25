import PostModel from '../models/Post.js';

export const getLastTags = async (request, responce) => {
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts.map(post => post.tags).flat().slice(0, 5);
        responce.json(tags);
    } catch (error) {
        console.log(error);
        responce.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};
export const create = async (request, responce) => {
    try {
        const document = new PostModel({
            title: request.body.title,
            text: request.body.text,
            imageUrl: request.body.imageUrl,
            tags: request.body.tags.split(','),
            user: request.userId,
        });

        const post = await document.save();

        responce.json(post);
    } catch (error) {
        console.log(error);
        responce.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};
export const getAll = async (request, responce) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        responce.json(posts);
    } catch (error) {
        console.log(error);
        responce.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const getOne = async (request, responce) => {
    try {
        const postId = request.params.id;
        const document = await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
        ).populate('user');
        responce.json(document);
    } catch (error) {
        console.log(error);
        responce.status(500).json({
            message: 'Статья не найдена',
        });
    }
};
export const remove = async (request, responce) => {
    try {
        const postId = request.params.id;
        const document = await PostModel.findOneAndDelete({ _id: postId });
        responce.json(document);
    } catch (error) {
        console.log(error);
        responce.status(500).json({
            message: 'Статья не найдена',
        });
    }
};
export const update = async (request, responce) => {
    try {
        const postId = request.params.id;
        await PostModel.updateOne(
            { _id: postId },
            {
                title: request.body.title,
                text: request.body.text,
                imageUrl: request.body.imageUrl,
                tag: request.body.tags.split(','),
                user: request.userId,
            }
        );
        responce.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        responce.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};
