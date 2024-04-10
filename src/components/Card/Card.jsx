import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSelectedPost, removeSelectedPost, fetchData } from '../../store/dataSlice';
import CardComponent from './CardComponent';
import './card.scss'


function Card() {

    const posts = useSelector(state => state.data.posts);
    const selectedPosts = useSelector(state => state.data.selectedPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    
    

    const handlePostClick = (id) => { 
        if (!selectedPosts.includes(id)) {
            dispatch(addSelectedPost(id)); 
        } else {dispatch(removeSelectedPost(id)); }
    };

    return (
        <div className='card_container'>
            {posts ? (
                posts.slice(0,12).map(post => (
                    <CardComponent
                        id={post.id}
                        key={post.id}
                        title={post.title}
                        body={post.body}
                        handlePostClick={handlePostClick}
                        isSelected={selectedPosts.includes(post.id)}
                    />
                ))
            ) : (
            <p>No data available</p>
            )}
        </div>
    );

}

export default Card;
