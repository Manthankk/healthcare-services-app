import React, { useState, useEffect } from 'react';
import ServiceList from './components/ServiceList';
import ServiceForm from './components/ServiceForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedServices = localStorage.getItem('healthcareServices');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('healthcareServices', JSON.stringify(services));
  }, [services]);

  const addService = (service) => {
    setServices([...services, { ...service, id: Date.now() }]);
  };

  const updateService = (updatedService) => {
    setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
    setEditingService(null);
  };

  const deleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const editService = (service) => {
    setEditingService(service);
    setCurrentView('form');
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar setCurrentView={setCurrentView} setSearchTerm={setSearchTerm} />
      <main>
        <TransitionGroup>
          <CSSTransition
            key={currentView}
            classNames="fade"
            timeout={300}
          >
            <div className="view-container">
              {currentView === 'dashboard' && (
                <Dashboard services={services} onEdit={editService} onDelete={deleteService} />
              )}
              {currentView === 'services' && (
                <ServiceList
                  services={filteredServices}
                  onEdit={editService}
                  onDelete={deleteService}
                />
              )}
              {currentView === 'form' && (
                <ServiceForm
                  onSubmit={editingService ? updateService : addService}
                  initialService={editingService}
                  key={editingService ? editingService.id : 'new'}
                  onCancel={() => setCurrentView('services')}
                />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>
    </div>
  );
}

export default App;