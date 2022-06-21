import React from 'react'
import { useContext } from 'react'
import Spinner from './shered/Spinner'
import ComentItem from './ComentItem'
import {v4 as uuidv4} from 'uuid' 
import CommentContext from '../context/CommentContext'


//Recebe os dados salvos em um array e forma uma lista de componentes para cada comentario.

function CommentList() {

  const {comments, currentUser, isLoading} = useContext(CommentContext)

  if (!isLoading && (!comments || comments.length === 0)) {
    return <p>No comments yet</p>
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='comment-list'>
      {comments.map((item) => {
        let commentOwner = item.user.username
        let user = false
        let isReply = false
        //Verifica se o corrente comentário pertence ao usuário.
        if (commentOwner === currentUser.user.username) {
          user = true
        } 
        //Verifica se há respostas para o corrente comentário para iterar sobre elas e retorna-las.
        if (item.replies.length > 0) {
          return (
            <div key={uuidv4()}>
              {/* Componete do corrente comentário */}
                <ComentItem key={item.id} item={item} isReply={isReply} userOwner={user}/>
              {item.replies.map((item) => {
                //Faz as verificações se a resposta é do corrente usuário e passa isReply como true
                 let commentOwner = item.user.username
                 let user = false
                 let isReply = true
                 if (commentOwner === currentUser.user.username) {
                   user = true
                  } 
                return (
                  // Retorna a resposta do comentário como um componente
                  <ComentItem key={item.id} item={item} isReply={isReply} userOwner={user}/>
                )
              })}
            </div>
          )
        }
        //Se não há respostas para o comentário o componente do corrente item é simplesmente retornado
        else return (
          <ComentItem key={item.id} item={item} isReply={isReply} userOwner={user} />
        )
      })}
    </div>
  )
}

export default CommentList