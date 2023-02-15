import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogUser = () => {
    const id = useParams().id;
    const blogs = useSelector(state => state.blogs.filter(blog => blog.user.id === id));
    if (!blogs || blogs.length === 0) {
        return null;
    }
    return (
        <div>
            <h1>{blogs[0].user.name}</h1>
            <h3>added blogs</h3>
            <ul>
                {blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    );
}

export default BlogUser;