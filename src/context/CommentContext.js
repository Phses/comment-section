import { createContext, useState, useEffect } from "react";

const CommentContext = createContext()

export const CommentProvider = ({children}) => {

  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  //fetch dados do servidor

  async function fetchFeedback() {
    const response = await fetch('https://glossy-veil-espadrille.glitch.me/comments')
    const data = await response.json()
    setComments(data)
    setIsLoading(false)
  }

  const currentUser =  {
    user: {
    image: { 
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp"
    },
    username: "juliusomo"
  }
}


  const [currentCommentEdit, setCurrentCommentEdit] = useState({
    item: {},
    edit: false
  })

  const [currentCommentDelete, setCurrentCommenDelete] = useState({
    item: {},
    isReply: false,
    delete: false
  })

  const [currentCommentReply, setCurrentCommentReply] = useState({
    item: {},
    reply: false
  })
  

  function editComment(item) {

    if (currentCommentEdit.item === item) {
      setCurrentCommentEdit({
        item: {},
        edit: false,
      })
    } else {
        setCurrentCommentEdit({
        item: item,
        edit: true,
      })
    }
  }
  
  function setDeleteComment(item, isReply, isDelete) {
    console.log(isDelete)
   setCurrentCommenDelete({
     item: item,
     isReply: isReply,
     delete: isDelete,
  })
}

  function setReply(item) {
    if(currentCommentReply.item !== item) {
      setCurrentCommentReply({
        item: item,
        reply: true
      }) 
    } else {
      setCurrentCommentReply({
        item: {},
        reply: false
      }) 
    }
  }

  async function addComment(newComment) {
    const response = await fetch('https://glossy-veil-espadrille.glitch.me/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComment)
    })

    const data = await response.json()

    setComments([...comments, data])
  }

  async function addReply(id, isReply, newReply) {
    if(!isReply) {
      let newComment = {} 
        comments.forEach((comment) =>{
        if(comment.id === id) {
          comment.replies.push(newReply)
          newComment = comment
        }
      })
      const response = await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment)
      })
      const data = await response.json()
      setComments(comments.map((item) => (item.id === id ? data : item)))
      setCurrentCommentReply({
        item: {},
        reply: false
      })
    } else {
      let newComment
      let idComment 
      comments.forEach((comment) => {
        if(comment.replies.length > 0) {
          let newReplies = []
          comment.replies.forEach((reply) => {
            if(reply.id === id){
              idComment = comment.id
              newReplies.push(reply)
              newReplies.push(newReply)
            } else {
              newReplies.push(reply)
            }
          })
          comment.replies = [...newReplies]
          newComment = comment
        } 
      })
      const response = await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${idComment}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment)
      })
      const data = await response.json()
      setComments(comments.map((item) => (item.id === idComment ? data : item)))
      setCurrentCommentReply({
        item: {},
        reply: false
      })
    }
  }

  async function updateComment(isReply, newContent) {
    if (isReply) {
      let newComment
      let commentId 
      comments.forEach((comment) => {
        if(comment.replies.length > 0) {
          for(let i = 0; i < comment.replies.length; i++) {
            if(comment.replies[i].id === newContent.id) {
              newComment = comment
              commentId = comment.id
              let newReplies = comment.replies.map((reply) => reply.id === newContent.id ? {...reply,...newContent} : reply) 
              newComment.replies = [...newReplies]   
            }
          }
          } 
        })

        const response = await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
        })

        const data = await response.json()

        setComments(comments.map((comment) => comment.id === commentId ? data : comment))
        setCurrentCommentEdit({
          item: {},
          edit: false,
        })
      
      } else {
        let newComment 
        comments.forEach((comment) => {
          if (comment.id === newContent.id) { 
            newComment = {...comment,...newContent}
          }
        }) 
        const response = await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${newContent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
        })

        const data = await response.json()

        setComments(comments.map((comment) => comment.id === newContent.id ? data : comment))
        setCurrentCommentEdit({
          item: {},
          edit: false,
        })
      }
    }

   async function removeComment(id, isReplie) {
      if (isReplie) {
        let newComment
        let idComment
        comments.forEach((comment) => { 
          if(comment.replies.length > 0) {
            for(let i = 0; i < comment.replies.length; i++) {
              if(comment.replies[i].id === id) {
                idComment = comment.id
                newComment = comment
                newComment.replies = comment.replies.filter((replie) => replie.id !== id)
              }
            }
          }
          })
          const response = await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${idComment}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment)
          })
          const data = await response.json()
          setComments(comments.map((comment) => comment.id === id ? data : comment))
        } else {
          await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${id}`,{
            method: 'DELETE'
          })
        setComments(comments.filter((comment) => comment.id !== id))
      }
    }

    async function updateVote(id, isReply, newScore) {
      if(!isReply) {
        let newComment
        comments.forEach((comment) => {
          if(comment.id === id) {
            comment.score = newScore
            newComment = comment
          } 
        })
        const response = await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
        })
        const data = await response.json()

        setComments(comments.map((comment)=> comment.id === id ? data : comment))
      } else {
        let newComment
        let commentId
        comments.forEach((comment) => {
          if(comment.replies.length > 0) {
            for(let i = 0; i < comment.replies.length; i++ ) {
                if(comment.replies[i].id === id) {
                  commentId = comment.id
                  comment.replies[i].score = newScore
                  newComment = comment
                } 
            }
          }
        })
        const response = await fetch(`https://glossy-veil-espadrille.glitch.me/comments/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
        })
        const data = await response.json()

        setComments(comments.map((comment)=> comment.id === commentId ? data : comment))
      }
    }

  return <CommentContext.Provider value={{
    comments,
    currentUser,
    currentCommentEdit,
    currentCommentDelete,
    currentCommentReply,
    isLoading,
    addComment,
    addReply,
    updateComment,
    removeComment,
    editComment,
    updateVote,
    setDeleteComment,
    setReply
  }}>
    {children}
  </CommentContext.Provider>
}

export default CommentContext