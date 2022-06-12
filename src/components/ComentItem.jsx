import React from 'react'
import { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import CommentContent from './CommentContent'
import CommentVote from './CommentVote'
import HeaderComment from './HeaderComment'
import CommentForm from './shered/CommentForm'
import CommentContext from '../context/CommentContext'

function ComentItem({item, isReply, userOwner}) {
  
  const {currentCommentEdit, currentCommentReply} = useContext(CommentContext)

  const[displayType, setDisplayType] = useState('hidden')

  useEffect(()=> {
    if(currentCommentEdit.item.id === item.id){
      if(displayType === 'hidden') {
        setDisplayType('visible')
      } else{
        setDisplayType('hidden')
      }
    }
  },[currentCommentEdit, item.id, displayType])


  //Eu preciso verificar se o id do comentário possui o mesmo id do currentCommentReply para fazer as moficações se não a modificação do estado é aplicada em todos os comments. Aparece uma menssagem missin dependencies que só resolve se eu colocar item.id como dependencia

  useEffect(() => {
    if(currentCommentReply.item.id === item.id) {
      if(displayType === 'hidden') {
        setDisplayType('visible')
      } else{
        setDisplayType('hidden')
      }
    }
  },[currentCommentReply, item.id, displayType])

  // function showTextField() {
  //   if(displayType === 'hidden') {
  //     setDisplayType('visible')
  //   } else {
  //     setDisplayType('hidden')
  //   }

  // }

  return (
    <Card className={isReply ? 'replie' : 'comment'}>
      <HeaderComment item={item} isReply={isReply} userOwner={userOwner} />
      <CommentVote item={item} isReply={isReply}/>
      <CommentContent content={item.content}/>
      <CommentForm item={item} displayType={displayType} isReply={isReply} userOwner={userOwner} btnType={userOwner ? 'update' : 'reply'}/>
    </Card>
  )
}

ComentItem.propTypes = {
  item: PropTypes.object,
  isReply: PropTypes.bool,
  userOwner: PropTypes.bool
}

export default ComentItem