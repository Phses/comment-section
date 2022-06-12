import PropTypes from 'prop-types'
import {useState, useContext} from 'react'
import CommentContext from '../context/CommentContext'

function CommentVote({item, isReply}) {

  const [score, setScore] = useState(item.score)
  
  const{updateVote} = useContext(CommentContext)
  

  function handleUpVote() {
      let newScore = score + 1
      setScore(newScore)
      updateVote(item.id, isReply, newScore)
  }

  function handleDownVote() {
    console.log(score)
    if(score >= 1){
      let newScore = score - 1
      setScore(newScore)
      updateVote(item.id, isReply, newScore)
      console.log(score)
    }
  }

  return (
    <div className="comment-vote">
      <button onClick={handleUpVote}  
        className='btn icon-vote'>
        <img src="./images/icon-plus.svg" alt=""></img>
      </button>
      <span>{score}</span>
      <button 
        onClick={handleDownVote} 
        className='btn icon-vote'>
        <img src="./images/icon-minus.svg" alt=""></img>
        </button>
    </div>
  )
}

CommentVote.propTypes = {
  item: PropTypes.object.isRequired,
  isReply: PropTypes.bool
}


export default CommentVote