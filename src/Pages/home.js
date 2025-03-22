import React from 'react';
import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/searchbar';
import Formulario from '../Components/formulario';

const Home = () => {
  return (
    <>
   <div className="flex">
    <Sidebar />
   </div>

   <div className="flex-grow-1">
    <SearchBar />
   </div>

   <div className="flex">
    <Formulario />
    </div>
   </>  
  );
}
export default Home;