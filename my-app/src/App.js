import { Toolbar } from '@material-ui/core';
import { Editor1, Layout, Nav } from './components';
import { Toolbarnav } from './components/toolbarnav';

function App() {
  return (
    <div>
      <div>
        <Toolbarnav>
          </Toolbarnav>
      </div>
     <Editor1>
       </Editor1>
       <div>
         <Nav>
           
         </Nav>
       </div>
    </div>
  );
}

export default App;