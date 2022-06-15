import { useState } from 'react'
import CommentForm from "./components/shered/CommentForm";
import CommentList from "./components/CommentList"
import Card from './components/Card';
import { CommentProvider } from './context/CommentContext';
import ModalDelete from './components/ModalDelete';

function App() {
 
  const user = {
      id: 0,
      user: {
        image: { 
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp"
        },
        username: "juliusomo"
      }
  }
  
  const [showOverlay, setShowOverlay] = useState(false)

  function showOverlayScreen() {
    setShowOverlay(true)
    console.log('funciona')
  }

  function hiddeOverlay() {
    setShowOverlay(false)
  }
  
  return (
    <CommentProvider>
      {showOverlay && <div className='overlay'></div>} 
      <div className="container">
        <CommentList showOverlayScreen={showOverlayScreen}/>
        <Card className={'form-container'}>
          <CommentForm item={user} value={''} isReply={false} displayType={'visible'} userOwner={true} btnType={'send'}/>
        </Card>
        <ModalDelete hiddeOverlay={hiddeOverlay}/>
      </div>
    </CommentProvider>
  );
}

export default App;
