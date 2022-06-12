import PropTypes from 'prop-types'

function CommentContent({content}) {
  return (
    <div className='comment-content'>
      <p>{`${content}`}</p>
    </div>
  )
}

CommentContent.propTypes = {
  content: PropTypes.string.isRequired
}

CommentContent.defaultProps = {
  item: 
  {
    "id": 1,
    "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    "createdAt": "1 month ago",
    "score": 12,
    "user": {
      "image": { 
        "png": "./images/avatars/image-amyrobson.png",
        "webp": "./images/avatars/image-amyrobson.webp"
      },
      "username": "amyrobson"
    },
    "replies": []
  },
}

export default CommentContent