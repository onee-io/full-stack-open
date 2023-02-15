import { useSelector } from "react-redux";
import _ from 'lodash';
import { Link } from "react-router-dom";

const BlogUsers = () => {
    const blogs = useSelector(state => state.blogs);
    // 将博客按用户分组
    const group = {};
    blogs.forEach(blog => {
        if (group[blog.user.id]) {
            group[blog.user.id].push(blog);
        } else {
            group[blog.user.id] = [blog];
        }
    });
    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(group).sort((a, b) => b.length - a.length).map(item =>
                        <tr key={item[0].user.id}>
                            <td>
                                <Link to={`/users/${item[0].user.id}`}>{item[0].user.name}</Link>
                            </td>
                            <td>{item.length}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BlogUsers;