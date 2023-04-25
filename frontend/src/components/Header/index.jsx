import React from 'react';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthSelector, logout } from '../../redux/slices/auth';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    const onClickLogout =() => {
        if (window.confirm('Вы точно хотите выйти?')) {
            dispatch(logout());
            window.localStorage.removeItem('token');
        }
    };

    return (
        <div className={styles.root}>
            <Container maxWidth = "lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to = "/">
                        <div>Blog Full Stack</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to = "/add-post">
                                    <Button variant = "contained">Написать статью</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
