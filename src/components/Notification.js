const Notification = ({ message, isSuccess }) => {
    if (message) {
        return (
            <div className={`notification ${isSuccess ? 'success' : 'error'}`}>
                {message}
            </div>
        )
    }
}

export default Notification;