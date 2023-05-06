import React, { useState } from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios';

export const Index = ({ postId }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const userData = useSelector((state) => state.auth.data);
    const saveComment = async () => {
        const userId = userData?._id;

        await axios.patch('/comment',
            {
                userId,
                text: comment,
                postId,
            }
        );
    };
    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src="https://mui.com/static/images/avatar/5.jpg"
                />
                <div className={styles.form}>
                    <TextField
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                        value = {comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button variant="contained" onClick={saveComment}>Отправить</Button>
                </div>
            </div>
        </>
    );
};
