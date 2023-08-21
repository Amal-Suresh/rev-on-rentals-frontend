import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Admin from './Routes/AdminRoute.js';
import User from './Routes/UserRoute.js'
import Partner from './Routes/PartnerRoute.js'
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <>
   <Toaster
  position="top-right"
  reverseOrder={false}
/>
   <Router>
    
      <Routes>
        <Route path='/*' element={<User/>}/>
        <Route path='admin/*' element={<Admin/>}/>
        <Route path='partner/*' element={<Partner/>} />
      </Routes> 
   </Router>
    </>
  );
}

export default App;
