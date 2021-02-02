import { useState, useEffect } from 'react';
import './Profile.css'


const Profile = () => {
    const [messages, setMessages] = useState([])
    const [posts, setPosts] = useState({ posts: [] });
    
    useEffect( () => {
        fetch('https://strangers-things.herokuapp.com/api/2010-LSU-RM-WEB-PT/posts')
            .then(response => response.json())
            .then(result => {
            console.log(result);
            setPosts(result.data)
            })
            .catch(console.error);
    }, [])

    return (
        <div>
            <h1> Welcome username </h1>
            <div className="profileSections">
                <section className="myPosts">
                    <h2> My Posts </h2>
                    <section className="postList">
                        {posts.posts.map((post, index) => {
                            return (
                                <div key = { index }>
                                    <ul>
                                        <li> { post.author.username } </li>
                                        <li> { post.title } </li>
                                        <li> { post.description} </li>
                                        <li> { post.price } </li>
                                    </ul>
                                </div>
                            )
                        })}
                    </section>
                    <button> Create a New Post </button>
                    <button> See All Posts </button>
                </section>
                <section className="messages">
                    <h2> My Messages </h2>
                    <section className="messageList"></section>
                </section>
            </div>
        </div>
    )
}




export default Profile;