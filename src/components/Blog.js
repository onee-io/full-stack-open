import { useState } from "react";
import PropTypes from "prop-types";
import blogService from '../services/blogs';

const Blog = ({ blog, onUpadte, onDelete }) => {
    const [isView, setIsView] = useState(false);
    // 点赞功能
    const handleLike = async () => {
        const updatedBlog = await blogService.updateBlog({
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id
        });
        onUpadte(updatedBlog);
    }
    // 删除功能
    const handleDelete = async () => {
        const isConfirm = window.confirm(`Remove blog ${blog.title} bu ${blog.author}`);
        if (isConfirm) {
            await blogService.deleteBlog(blog.id);
            onDelete(blog.id);
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
    blog: PropTypes.object.isRequired,
    onUpadte: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Blog;