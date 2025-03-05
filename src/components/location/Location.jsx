import React, { useState, useEffect } from 'react';

import ListLocations from './ListLocations';
import AddLocation from './AddLocation';
import UpdateLocation from './UpdateLocation';
import DeleteLocation from './DeleteLocation';
  
  const Location = () => {
    const [activeTab, setActiveTab] = useState('');
  
    const renderContent = () => {
      switch (activeTab) {
        case 'ListLocations':
          return <ListLocations />;
        case 'AddLocation':
          return <AddLocation />;
        case 'UpdateLocation':
          return <UpdateLocation />;
        case 'DeleteLocation':
          return <DeleteLocation />;
        default:
          return <div>Please select an option.</div>;
      }
    };
  
    return (
      <div>
        <div className="buttons">
          <button onClick={() => setActiveTab('ListLocations')}>List</button>
          <button onClick={() => setActiveTab('AddLocation')}>Add</button>
          <button onClick={() => setActiveTab('UpdateLocation')}>Update</button>
          <button onClick={() => setActiveTab('DeleteLocation')}>Delete</button>
        </div>
  
        <div className="content">{renderContent()}</div>
      </div>
    );
  };


export default Location;
