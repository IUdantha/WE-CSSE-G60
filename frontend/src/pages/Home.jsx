import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white rounded-2xl m-20 grid grid-cols-2 gap-5 p-16">
      <div className="flex flex-col gap-5 p-8">
        {/* <Link to="/staff-management" className="p-4 bg-accent rounded-xl w-full text-white">
          Staff Management
        </Link> */}
        <Link to="/transport-management" className="p-4 bg-accent rounded-xl w-full text-white">
          Public Transport Management
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <img className="h-35 pl-8 py-auto" src="../../../logo.png" alt="logo"></img>
      </div>
    </div>
  );
};

export default Home;
