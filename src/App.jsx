import React from 'react';
import Navbar from './Components/Layouts/Navbar';
import { Outlet } from 'react-router';
import Footer from './Components/Layouts/Footer';

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default App;