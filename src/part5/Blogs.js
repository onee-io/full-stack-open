import { useEffect, useState } from "react";
import loginService from "../services/login";
import blogsService from "../services/blogs";
import Blog from "../components/Blog";
import Notification from "../components/Notification";

const Blogs = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(true);
    // 通知控制
    const showMessage = (_message, _isSuccess, _timeout = 3000) => {
        setIsSuccess(_isSuccess);
        setMessage(_message);
        setTimeout(() => {
            setMessage(null);
        }, _timeout);
    }
    const showSuccessMessage = _message => showMessage(_message, true);
    const showErrorMessage = _message => showMessage(_message, false);
    // 加载用户信息
    useEffect(() => {
        const loginedUserJSON = window.localStorage.getItem('blogsUser');
        if (loginedUserJSON) {
            const loginedUser = JSON.parse(loginedUserJSON);
            blogsService.setToken(loginedUser.token);
            setUser(loginedUser);
        }
    }, []);
    // 处理登录事件
    const handleLogin = async (username, password) => {
        try {
            const loginedUser = await loginService.login({ username, password });
            window.localStorage.setItem('blogsUser', JSON.stringify(loginedUser));
            blogsService.setToken(loginedUser.token);
            setUser(loginedUser);
        } catch (error) {
            showErrorMessage(error.response.data.error);
        }
    }
    // 处理登出事件
    const handleLogout = () => {
        window.localStorage.removeItem('blogsUser');
        blogsService.setToken(null);
        setUser(null);
    }
    // 处理博客创建事件
    const handleBlogCreated = createdBlog => {
        showSuccessMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`);
    }
    return (
        <div>
            <h1>{user === null ? 'log in to application ' : 'blogs'}</h1>
            <Notification message={message} isSuccess={isSuccess} />
            {user === null && <LoginForm handleLogin={handleLogin} />}
            {user !== null &&
                <div>
                    <p>
                        {user.name} logged in
                        <button onClick={handleLogout}>logout</button>
                    </p>
                    <BlogList onBlogCreated={handleBlogCreated} />
                </div>
            }
        </div>
    );
}

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin(username, password);
        setUsername('');
        setPassword('');
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
}

const BlogList = ({ onBlogCreated }) => {
    const [blogs, setBlogs] = useState([]);
    // 加载博客列表
    useEffect(() => {
        const fetchBlogs = async () => {
            const userBlogs = await blogsService.getAllBlogs();
            setBlogs(userBlogs);
        }
        fetchBlogs();
    }, []);
    // 处理博客创建事件
    const handleCreated = (createdBlog) => {
        setBlogs(blogs.concat(createdBlog));
        onBlogCreated(createdBlog);
    };
    return (
        <div>
            <CreateBlogForm handleCreated={handleCreated} />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
}

const CreateBlogForm = ({ handleCreated }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    // 处理创建事件
    const handleSubmit = async (event) => {
        event.preventDefault();
        const createdBlog = await blogsService.createBlog({ title, author, url });
        handleCreated(createdBlog);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
}

export default Blogs;