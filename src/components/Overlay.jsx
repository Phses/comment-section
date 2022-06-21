import { useState, useEffect, useContext } from 'react'
import CommentContext from '../context/CommentContext'


function Overlay() {

const {currentCommentDelete} = useContext(CommentContext)

const [displayType, setDisplayType] = useState('none')

useEffect(() => {
  console.log('chama a função do overlay')
  if(currentCommentDelete.delete) {
    setDisplayType('')
  } else {
    setDisplayType('none')
  }
}, [currentCommentDelete])

  return (
    <div className='overlay' style={{display: displayType}}></div>
  )
}

export default Overlay