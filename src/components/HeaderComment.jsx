import PropTypes from 'prop-types'
import { useContext } from 'react'
import CommentContext from '../context/CommentContext'


function HeaderComment({item, isReply, userOwner}) {

  const {editComment, setDeleteComment, setReply} = useContext(CommentContext)
  
  function handleDelete() {
    // Marca o comment que queremos exluir e fazemos aparecer o modal com o useEffect 
    setDeleteComment(item, isReply)
  }

  //Além de mostrar o form eu preciso setar o value do form com o nome do userowner do comment a quem se destina o reply
  function handleClickReply() {
      setReply(item)
  }

  function handleClickEdit() {
    editComment(item)
  }


  return (
    <div className='header-comment'>

      <img className="img-profile-comment" src={item.user.image.png} alt='img-profile-comment'></img>

      <span className='username'>{item.user.username}</span>

      <span className="currentUser-id" style={{
      display: userOwner ? 'inline-block' : 'none'
      }}>you</span>

      <small className="comment-createdAt">{item.createdAt}</small>

      {userOwner && <button onClick={handleDelete}  className='btn btn-icon' style={{color: 'hsl(358, 79%, 66%)'}}><img className='icon-delete' src="./images/icon-delete.svg" alt='icon-delete'></img>Delete</button>}

      {userOwner ? <button onClick={handleClickEdit} className='btn btn-icon'><img className='icon-edit' src="./images/icon-edit.svg" alt=''></img>Edit</button> : <button className='btn btn-icon' onClick={handleClickReply}><img className='icon-reply' src="./images/icon-reply.svg" alt=''></img>Reply</button>}

    </div>
  )
}

HeaderComment.propTypes = {
  userOwner: PropTypes.bool.isRequired
}

HeaderComment.defaultProps = {
    currentUser: false,
}

export default HeaderComment