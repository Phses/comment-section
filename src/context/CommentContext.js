import { createContext, useState } from "react";

const CommentContext = createContext()

export const CommentProvider = ({children}) => {

  const [comments, setComments] = useState([
    {
      id: 1,
      content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: { 
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp"
        },
        username: "amyrobson"
      },
      replies: []
    },
    {
      id: 2,
      content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: { 
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp"
        },
        username: "maxblagun"
      },
      replies: [
        {
          id: 3,
          content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          replyingToId: 2,
          user: {
            image: { 
              "png": "./images/avatars/image-ramsesmiron.png",
              "webp": "./images/avatars/image-ramsesmiron.webp"
            },
            username: "ramsesmiron"
          }
        },
        {
          id: 4,
          content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          replyingToId: 2,
          user: {
            "image": { 
              "png": "./images/avatars/image-juliusomo.png",
              "webp": "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
          }
        }
      ]
    }     
  ]
  )

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
    console.log(item)
    setCurrentCommentEdit({
      item: item,
      edit: true,
      displayForm: 'visible'
    })
  }
  
  function setDeleteComment(item, isReply) {
    console.log(item)
   setCurrentCommenDelete({
     item: item,
     isReply: isReply,
     delete: true,
  })
}

  function setReply(item) {
    console.log(item)
    setCurrentCommentReply({
      item: item,
      reply: true
    }) 
  }

  function addComment(newComment) {
    setComments([newComment,...comments]);
  }

  function addReply(id, isReply, newReply) {
    if(!isReply) {
      let newComments = []
      comments.forEach((comment) => {
        if (comment.id === id) {
          comment.replies.push(newReply)
          newComments.push(comment)
        } else {
          newComments.push(comment)
        }
      })
      setComments(newComments)
    } else {
      let newComments = [] 
      comments.forEach((comment) => {
        if(comment.replies.length > 0) {
          let newReplies = []
          comment.replies.forEach((reply) => {
            if(reply.id === id){
              newReplies.push(reply)
              newReplies.push(newReply)
            } else {
              newReplies.push(reply)
            }
          })
          comment.replies = [...newReplies]
          newComments.push(comment) 
        } else {
          newComments.push(comment)
        }
      })
      setComments(newComments)
    }
  }

  function updateComment(isReply, newContent) {
    if (isReply) {
      console.log('teste 1', newContent)
      let newComments = comments.map((comment) => {
        if(comment.replies.length > 0) {
            let newReplies = comment.replies.map((reply) => reply.id === newContent.id ? {...reply,...newContent} : reply) 
            comment.replies = [...newReplies]
            return comment        
        } else {
          return comment
        }
      })
      setComments(newComments)
      } else {
        console.log('teste 2', newContent)
        setComments(comments.map((comment) => comment.id === newContent.id ? {...comment,...newContent} : comment))
      }
    }

    function removeComment(id, isReplie) {
      if (isReplie) {
        let newComments = []
        comments.forEach((comment) => { 
          if(comment.replies.length === 0) {
            newComments.push(comment)
          } else {
            for(let i = 0; i < comment.replies.length; i++) {
              if(comment.replies[i].id === id) {
                comment.replies.pop(comment.replies[i])
              }
            }
            newComments.push(comment)
          }
          setComments(newComments)
        })
        } else {
        setComments(comments.filter((comment) => comment.id !== id))
      }
    }

    function updateVote(id, isReply, newScore) {
      if(!isReply) {
        setComments(comments.map((comment) => {
          if(comment.id === id) {
            comment.score = newScore
            return comment
          } else {
            return comment
          }
        }))
      } else {
        setComments(comments.map((comment) => {
          if(comment.replies.length > 0) {
            let newReplies = comment.replies.map((reply) => {
              if(reply.id === id) {
                reply.score = newScore
                return reply
              } else {
                return reply
              }
            })
            comment.replies = newReplies
            return comment
          } else {
            return comment
          }
        }))
      }
    }

  return <CommentContext.Provider value={{
    comments,
    currentUser,
    currentCommentEdit,
    currentCommentDelete,
    currentCommentReply,
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