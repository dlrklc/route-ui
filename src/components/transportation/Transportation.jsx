import React, { useState, useEffect } from 'react';

import ListTransportations from './ListTransportations';
import AddTransportation from './AddTransportation';
import UpdateTransportation from './UpdateTransportation';
import DeleteTransportation from './DeleteTransportation.jsx';
  
  const Transportation = () => {
    const [activeTab, setActiveTab] = useState('');
  
    const renderContent = () => {
      switch (activeTab) {
        case 'ListTransportations':
          return <ListTransportations />;
        case 'AddTransportation':
          return <AddTransportation />;
        case 'UpdateTransportation':
          return <UpdateTransportation />;
        case 'DeleteTransportation':
          return <DeleteTransportation />;
        default:
          return <div>Please select an option.</div>;
      }
    };
  
    return (
      <div>
        <div className="buttons">
          <button onClick={() => setActiveTab('ListTransportations')}>List</button>
          <button onClick={() => setActiveTab('AddTransportation')}>Add</button>
          <button onClick={() => setActiveTab('UpdateTransportation')}>Update</button>
          <button onClick={() => setActiveTab('DeleteTransportation')}>Delete</button>
        </div>
  
        <div className="content">{renderContent()}</div>
      </div>
    );
  };


export default Transportation;
