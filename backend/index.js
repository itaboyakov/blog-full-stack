import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import { UserController, PostController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

mongoose
    .connect('mongodb+srv://admin:wwwwww@cluster0.mvhgp07.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch(error => console.log('DB error', error));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, callBack) => {
        callBack(null, 'uploads');
    },
    filename: (_, file, callBack) => {
        callBack(null, file.originalname);
    },
});
const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (request, responce) => {
    responce.json({
        url: `/uploads/${request.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.listen(4444, error => {
    if (error) {
        return console.log(error);
    }
    console.log('Server Ok');
});
