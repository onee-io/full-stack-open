import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";

const Blog = ({ blog }) => {
    const dispatch = useDispatch();
    const [isView, setIsView] = useState(false);
    // 点赞功能
    const handleLike = async () => {
        dispatch(updateBlog({
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        }));
    }
    // 删除功能
    const handleDelete = async () => {
        const isConfirm = window.confirm(`Remove blog ${blog.title} bu ${blog.author}`);
        if (isConfirm) {
            dispatch(deleteBlog(blog.id));
        }
    }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div className="blog" style={blogStyle}>
            {blog.title} by {blog.author}
            <button onClick={() => setIsView(!isView)}>
                {isView ? 'hide' : 'view'}
            </button>
            {isView &&
                <div>
                    <div>{blog.url}</div>
                    <div>
                        likes {blog.likes}
                        <button onClick={handleLike}>like</button>
                    </div>
                    <div>{blog.user.name}</div>
                    <button type="" onClick={handleDelete}>delete</button>
                </div>
            }
        </div>
    );
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog;