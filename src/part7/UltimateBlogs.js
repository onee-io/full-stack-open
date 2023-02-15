import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import BlogInfo from "../components/BlogInfo";
import BlogLoginForm from "../components/BlogLoginForm";
import Blogs from "../components/Blogs";
import BlogUser from "../components/BlogUser";
import BlogUsers from "../components/BlogUsers";
import Notice from "../components/Notice";
import { logout } from "../reducers/userReducer";

const UltimateBlogs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    // 处理登出事件
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <div>
            <Notice />
            {user === null &&
                <div>
                    <h1>log in to application</h1>
                    <BlogLoginForm />
                </div>
            }
            {user !== null &&
                <div>
                    <div>
                        <Link to="/">blogs</Link>
                        <Link to="/users">users</Link>
                        <span>{user.name} logged in</span>
                        <button onClick={handleLogout}>logout</button>
                    </div>
                    <h1>blog app</h1>
                    <Routes>
                        <Route path="/" element={<Blogs />} />
                        <Route path="/blogs/:id" element={<BlogInfo />} />
                        <Route path="/users" element={<BlogUsers />} />
                        <Route path="/users/:id" element={<BlogUser />} />
                    </Routes>
                </div>
            }
        </div>
    );
}

export default UltimateBlogs;