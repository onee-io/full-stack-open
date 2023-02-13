import { useSelector } from "react-redux";

const Notice = () => {
    const notice = useSelector(state => state.notice);
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: notice.length > 0 ? '' : 'none'
    }
    return (
        <div style={style}>
            {notice}
        </div>
    )
}

export default Notice;