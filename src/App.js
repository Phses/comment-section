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
  
  return (
    <CommentProvider>
      <div className="container">
        <CommentList/>
        <Card className={'form-container'}>
        <CommentForm item={user} value={''} isReply={false} displayType={'visible'} userOwner={true} btnType={'send'}/>
        </Card>
        <ModalDelete/>
      </div>
    </CommentProvider>
  );
}

export default App;
