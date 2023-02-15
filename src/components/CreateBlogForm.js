import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { createBlog } from "../reducers/blogReducer";

const CreateBlogForm = () => {
    const dispatch = useDispatch();
    const title = useField('text');
    const author = useField('text');
    const url = useField('text');
    // 处理创建事件
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(createBlog({
            title: title.value,
            author: author.value,
            url: url.value
        }));
        title.reset();
        author.reset();
        url.reset();
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input id='title' value={title.value} onChange={title.onChange} />
                </div>
                <div>
                    author: <input id='author' value={author.value} onChange={author.onChange} />
                </div>
                <div>
                    url: <input id='url' value={url.value} onChange={url.onChange} />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
}

export default CreateBlogForm;