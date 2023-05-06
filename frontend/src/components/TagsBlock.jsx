import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import { useSelector, useDispatch } from 'react-redux';
import { tagFilter } from '../redux/slices/posts';
export const TagsBlock = ({ items, isLoading = true }) => {
    const { posts, tags } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const tagsChangeHandler = (data) => {

    };
    return (
        <SideBlock title="Тэги">
            <List>
                {(isLoading ? [...Array(5)] : items).map((name, index) => (
                    <a
                        style={{ textDecoration: 'none', color: 'black' }}
                        key = {index}
                    >
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                {isLoading ? (
                                    <Skeleton width={100} />
                                ) : (
                                    <ListItemText primary={name} onClick = {tagsChangeHandler}/>
                                )}
                            </ListItemButton>
                        </ListItem>
                    </a>
                ))}
            </List>
        </SideBlock>
    );
};
