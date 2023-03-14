import jwt from 'jsonwebtoken';

export default (request, responce, next) => {
    const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            request.userId = decoded._id;
            next();
        } catch (error) {
            responce.status(403).json({
                message: 'Нет доступа',
            });
        }
    } else {
        responce.status(403).json({
            message: 'Нет доступа',
        });
    }
};
