import { useHistory } from 'react-router-dom'
import './Posts.css'

const Posts = () => {
    return (
        <div className="postPage">
            <section className="allPosts"> 
                <h2> All Posts </h2>
                <section className="post">

                </section>
            </section>
            <section className="makePost">
                <h3> Make a New Post </h3>
                <button className="makePostButton"> Make a New Post </button>
            </section>
        </div>
    )
}

export default Posts;