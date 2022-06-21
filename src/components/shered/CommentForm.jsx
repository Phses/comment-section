import { useContext, useState, useEffect } from 'react'
import CommentContext from '../../context/CommentContext'
import PropTypes from 'prop-types'
import SubmitBtn from './SubmitBtn'
import {v4 as uuidv4} from 'uuid'

function CommentForm({item, displayType, isReply, userOwner, btnType}) {

  const {addComment, addReply, updateComment, currentCommentEdit, currentCommentReply} = useContext(CommentContext)

  const [value, setValue] = useState('')
  
  //Eu preciso comparar o ID CurrentCommentReply com o item formulário que eu desejo modificar, se eu não fizer isso a função irá setar o valor do currentComment em todos os intens 
  useEffect(() => {
    if(currentCommentReply.item.id === item.id) {
      setValue(`@${currentCommentReply.item.user.username}`)
    }
  },[currentCommentReply, item.id])

  useEffect(() => {
    if(currentCommentEdit.item.id === item.id) {
      setValue(currentCommentEdit.item.content)
    }
  },[currentCommentEdit, item.id])

  // Se existe um item com id vinculado ao form é reply ou update
  // Se o item vinculado pertence ao userOwner é update
  // Existem 4 possibilidades de submit
  // - Atualizar um comentário
  // - Atualizar uma resposta
  // - Adicionar um novo comentário
  // - Adicionar uma nova resposta
  const handleSubmit = (e) => {
    if(item.id) {
      if(userOwner) {
        if(isReply) {
          updateComment(isReply, {
            id: item.id,
            content: value,
            replyingTo: item.replyingTo,
            replyingToId: item.replyingToId,
          })
        } else {
          updateComment(isReply, {
            id: item.id,
            content: value,
          })
        }
      } else {
        const content = value.split(/(\W+)/).slice(3).join('')
        console.log(content)
        addReply(item.id, isReply,{
          id: uuidv4(),
          content: content,
          createdAt: "today",
          score: 4,
          replyingTo: item.user.username,
          replyingToId: item.id,
          user: {
            image: { 
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
          }
        })
        setValue('');
      }
      
    } else {
      addComment({
        id: uuidv4(),
        content: value,
        createdAt: "today",
        replies: [],
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp"
          },
          username: "juliusomo"
          }
        })
      }
    setValue('');
    e.preventDefault()
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <>
      <form className={displayType} onSubmit={handleSubmit}>
        <img className="img-form" src={"./images/avatars/image-juliusomo.png"} alt="img-profile"></img>
        <textarea rows={4} cols={50} value={value} onChange={handleChange} placeholder="Add a comment"></textarea>
        <SubmitBtn>{btnType}</SubmitBtn>
      </form>
    </>
  )
}

CommentForm.propTypes = {
  item: PropTypes.object.isRequired,
  displayType: PropTypes.string.isRequired,
  isReply: PropTypes.bool.isRequired,
  userOwner: PropTypes.bool.isRequired,
  btnType: PropTypes.string.isRequired
}

export default CommentForm