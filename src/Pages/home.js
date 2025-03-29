import React, { useState } from 'react';
import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/searchbar';
import '../Components/formulario.css';

const Home = () => {
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState({
    adults: 0,
    children: 0,
    seniors: 0
  });

  const handleSearch = () => {
    console.log({
      from,
      to,
      date,
      tripType,
      passengers
    });
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <SearchBar />

      <div className='form-container-home'>
        <form>
          <div className="row">
            <div className="col-md-5 mb-4">
              <div className="form-outline mb-2">
                <label>De:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Origen"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>
            
            <div className='col-md-5 mb-4'>
              <div className="form-outline mb-2">
                <label>Fechas:</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5 mb-4">
              <div className="form-outline mb-2">
                <label>Hacia:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Destino"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row passenger-row">
            <div className="col-md-3 mb-4 passenger-group">
              <label>Adultos (18 o más)</label>
              <input 
                type="number" 
                className="form-control"
                min="0"
                value={passengers.adults}
                onChange={(e) => setPassengers({...passengers, adults: parseInt(e.target.value) || 0})}
              />
            </div>

            <div className="col-md-3 mb-4 passenger-group">
              <label>Niños (5 o menos)</label>
              <input 
                type="number" 
                className="form-control"
                min="0"
                value={passengers.children}
                onChange={(e) => setPassengers({...passengers, children: parseInt(e.target.value) || 0})}
              />
            </div>

            <div className="col-md-3 mb-4 passenger-group">
              <label>Adultos Mayores (60 o más)</label>
              <input 
                type="number" 
                className="form-control"
                min="0"
                value={passengers.seniors}
                onChange={(e) => setPassengers({...passengers, seniors: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
        </form>
      </div>

      <div className='form-button-container'>
        <button 
          type="button" 
          className={`form-btn-i ${tripType === 'one-way' ? 'active' : ''}`}
          onClick={() => setTripType('one-way')}
        >
          Solo Ida
        </button>
        
        <button 
          type="button" 
          className={`form-btn-d ${tripType === 'round-trip' ? 'active' : ''}`}
          onClick={() => setTripType('round-trip')}
        >
          Ida y Vuelta
        </button>
      </div>

      <div className="search-button-container">
        <button 
          type="button" 
          className="search-btn"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>

      <div className="recommendations-section">
        <h3>Recomendaciones</h3>
        {/* Contenido de recomendaciones */}
      </div>
      </div>
      </div>    
  );
}
export default Home;


    {/*<div className='form-container-home'>
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
    </div>

  <div className='form-button-i'>
    <button type="button" className= "form-btn-i">Solo ída </button>
    </div>

  <div className='form-button-d'>
    <button type="button" className="form-btn-d">Ida y Vuelta </button>
    </div>
    
   </>  
  );
}
export default Home;*/}