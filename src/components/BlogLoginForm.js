import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { initUser, login } from "../reducers/userReducer";

const BlogLoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const username = useField('text');
    const password = useField('password');
    // 加载用户信息
    useEffect(() => { dispatch(initUser()) }, []);
    // 处理登录事件
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(login(username.value, password.value));
        username.reset();
        password.reset();
        navigate('/');
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username <input id='username' type={username.type} value={username.value} onChange={username.onChange} />
                </div>
                <div>
                    password <input id='password' type={password.type} value={password.value} onChange={password.onChange} />
                </div>
                <button id="login-button" type="submit">login</button>
            </form>
        </div>
    );
}

export default BlogLoginForm;