import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";
import Blog from "./Blog";
import CreateBlogForm from "./CreateBlogForm";
import Togglable from "./Togglable";

const BlogList = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs);
    // 加载博客列表
    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);
    return (
        <div>
            <Togglable buttonLabel='new blog'>
                <CreateBlogForm />
            </Togglable>
            {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
}

export default BlogList;