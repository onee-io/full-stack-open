import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlog } from "../reducers/blogReducer";

const BlogInfo = () => {
    const dispatch = useDispatch();
    const id = useParams().id;
    const blog = useSelector(state => state.blogs.find(blog => blog.id === id));
    if (!blog) {
        return null;
    }
    const handleLike = () => {
        dispatch(updateBlog({
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }));
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <div>
                {blog.likes} likes
                <button onClick={handleLike}>like</button>
            </div>
            <div>added by {blog.user.name}</div>
        </div>
    );
}

export default BlogInfo;