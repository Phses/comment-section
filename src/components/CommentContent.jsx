import PropTypes from 'prop-types'

function CommentContent({isReply, item}) {
  return (
    <div className='comment-content'>
      {isReply ? <p><span>{`@${item.replyingTo}`}</span> {`${item.content}`}</p> : <p>{`${item.content}`}</p> }
    </div>
  )
}

CommentContent.propTypes = {
  content: PropTypes.string.isRequired
}


export default CommentContent