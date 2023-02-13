import { useDispatch } from "react-redux";

const TextFilter = () => {
    const dispatch = useDispatch();
    const handleChange = (event) => {
        console.log(event.target.value);
        dispatch({
            type: 'textFilter/filterChange',
            filter: event.target.value
        });
    }
    const style = {
        marginBottom: 10
    }
    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default TextFilter