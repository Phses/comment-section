import { useState, useEffect, useContext } from "react"
import CommentContext from "../context/CommentContext"
import Card from "./Card"

function ModalDelete() {

  const {currentCommentDelete, setDeleteComment, removeComment} = useContext(CommentContext)
  const [displayType, setDisplayType] = useState('none')

  function handleDelete() {
    removeComment(currentCommentDelete.item.id, currentCommentDelete.isReply)
    setDisplayType('none')
    setDeleteComment({}, false, false)
  }

  function handleDisplay() {
    setDisplayType('none')
    setDeleteComment({}, false, false)
  }

  useEffect(()=> {
    console.log('chama a função do modal')
    console.log(currentCommentDelete.delete)
    if(currentCommentDelete.delete) {
      setDisplayType('')
      
    } else {
      setDisplayType('none')
    }
  }, [currentCommentDelete])

  return (
    <Card className={'modalDelete-container'} display={`${displayType}`}>
      <h3>Delete Comment</h3>
      <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
      <div>
        <button onClick={handleDisplay} className="btn btn-delete">No, cancel</button>
        <button onClick={handleDelete} className="btn btn-delete" style={{background: 'hsl(358, 79%, 66%)'}}>Yes, Delete</button>
      </div>
    </Card>
  )
}

export default ModalDelete