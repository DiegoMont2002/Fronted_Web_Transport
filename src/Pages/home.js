import React from 'react';
import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/searchbar';
import '../Components/formulario.css';

const Home = () => {
  return (
    <>
   <div className="flex">
    <Sidebar />
   </div>

   <div className="flex-grow-1">
    <SearchBar />
   </div>


    <div className='form-container-home'>
      <form> 
      <div className="row">
                     <div className="col-md-5 mb-4">
                      <div className="form-outline mb-2">
                        <label>Origen:</label>
                        <input type="text" className="form-control" placeholder="" />
                      </div>
                      </div>
                    
                    <div className='col-md-5 mb-4'>
                      <div className="form-outline mb-2">
                        <label>Fechas</label>
                        <input type="date" className="form-control" placeholder="" />
                      </div>
                      </div>
                      </div>

                    <div className="row">
                      <div className="col-md-5 mb-4">
                      <div className="form-outline mb-2">
                        <label>Destino:</label>
                        <input type="text" className="form-control" placeholder="" />
                      </div>
                      </div> 
                      </div>
                  
      </form>
      <hr />
    </div>
    
   </>  
  );
}
export default Home;