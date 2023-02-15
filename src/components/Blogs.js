import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Blog from "./Blog";
import CreateBlogForm from "./CreateBlogForm";
import Togglable from "./Togglable";

const Blogs = () => {
    const blogs = useSelector(state => state.blogs);
    if (!blogs || blogs.length === 0) {
        return null;
    }
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div>
            <Togglable buttonLabel='new blog'>
                <CreateBlogForm />
            </Togglable>
            {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                <div style={blogStyle} key={blog.id}>
                    <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
                </div>
            )}
        </div>
    );
}

export default Blogs;