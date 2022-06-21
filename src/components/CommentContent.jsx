import PropTypes from 'prop-types'

function CommentContent({isReply, item}) {
  return (
    <div className='comment-content'>
      {isReply ? <p><span>{`@${item.replyingTo}`}</span> {`${item.content}`}</p> : <p>{`${item.content}`}</p> }
    </div>
  )
}

CommentContent.propTypes = {
  isReply: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}


export default CommentContent