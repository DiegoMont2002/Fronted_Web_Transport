import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Rutas from './Routes/rutas';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Rutas />
      </AuthProvider>
    </BrowserRouter>
  );
}
  

export default App;
