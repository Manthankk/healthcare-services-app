import React from 'react';
import './ServiceList.css';

function ServiceList({ services, onEdit, onDelete }) {
  return (
    <div className="service-list">
      <h2>Services</h2>
      {services.length === 0 ? (
        <p>No services available. Add a new service to get started.</p>
      ) : (
        services.map(service => (
          <div key={service.id} className="service-item">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p className="price">${service.price.toFixed(2)}</p>
            <div className="actions">
              <button onClick={() => onEdit(service)} className="edit-btn">Edit</button>
              <button onClick={() => onDelete(service.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ServiceList;