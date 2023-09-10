const Notification = ({ message, notificationType}) => {
    if (message === null) {
      return null
    }
    if (notificationType === 'success')
    return (
      <div className='success'>
      {message}
    </div>
    )
    else {
    return (
      <div className='failure'>
        {message}
      </div>
    )
    }}

  export default Notification