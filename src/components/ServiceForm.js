import React, { useState, useEffect } from 'react';
import './ServiceForm.css';

function ServiceForm({ onSubmit, initialService }) {
  const [service, setService] = useState({ name: '', description: '', price: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    } else {
      setService({ name: '', description: '', price: '' });
    }
  }, [initialService]);

  const validateForm = () => {
    let formErrors = {};
    if (!service.name) formErrors.name = 'Name is required';
    if (!service.description) formErrors.description = 'Description is required';
    if (!service.price) formErrors.price = 'Price is required';
    else if (isNaN(service.price)) formErrors.price = 'Price must be a number';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...service, price: parseFloat(service.price) });
      setService({ name: '', description: '', price: '' });
    }
  };

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <h2>{initialService ? 'Edit Service' : 'Add New Service'}</h2>
      <div className="form-group">
        <label htmlFor="name">Service Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={service.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={service.description}
          onChange={handleChange}
          required
        ></textarea>
        {errors.description && <span className="error">{errors.description}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={service.price}
          onChange={handleChange}
          step="0.01"
          required
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>
      <button type="submit">{initialService ? 'Update' : 'Add'} Service</button>
    </form>
  );
}

export default ServiceForm;