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
                    <section>
                        {posts.posts.map((post, index) => {
                            return (
                                <div className="postList" key = { index }>
                                    <h3> { post.author.username } </h3>
                                    <h4> { post.title } </h4>
                                    <ul>
                                        <li> { post.description} </li>
                                        <li> { post.price } </li>
                                    </ul>
                                    <button> Make An Offer/ Send Message </button>
                                    <button> View Messages </button>
                                </div>
                            )
                        })}
                    </section>
                </section>
                <button> Create a New Post </button>
                <button> See All Posts </button>
                <section className="messages">
                    <h2> My Messages </h2>
                    <section className="messageList"></section>
                </section>
            </div>
        </div>
    )
}




export default Profile;