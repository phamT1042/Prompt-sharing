'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {
                data.map(post => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                )
                )
            }
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSearchChange = (e) => {

    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type="text"
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    className='search_input peer'
                    required
                >
                </input>
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed