import logo from './logo.svg';
import './App.css';
import {Editor} from './Editor/Editor';
import { Toolbarnav } from './Toolbarnav/Toolbarnav';
import Nav from './Nav/Nav';
import Bottom from './Bottom/Bottom';


function App() {
  return (
  <div>
    <div>

    <Toolbarnav>
      
    </Toolbarnav>
    </div>
    <div>
    <Editor>
  
    </Editor>
    </div>
   
   <div>
     <Bottom>

     </Bottom>
   </div>

   

  </div>
    
  );
}

export default App;
