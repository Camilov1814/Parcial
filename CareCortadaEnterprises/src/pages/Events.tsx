import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { fetchEvents, fetchModels, addEvent } from '../services/api'; // Importa la función addEvent

interface Event {
    id: number;
    date: string;
    location: string;
    models: string[];
    image: string;
}

interface Model {
    id: number;
    name: string;
}

const MakeupEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]); // Eventos cargados de la API
    const [newEvent, setNewEvent] = useState<Event>({
        id: 0,
        date: '',
        location: '',
        models: [],
        image: '',
    });
    const [selectedModel, setSelectedModel] = useState<string>(''); // Modelo seleccionado
    const [models, setModels] = useState<Model[]>([]); // Modelos cargados de la API
    const [showForm, setShowForm] = useState<boolean>(false); // Control de visibilidad del formulario

    // Obtener los modelos desde la API
    useEffect(() => {
        const getModels = async () => {
            const modelsData = await fetchModels(); // Usamos la función fetchModels
            setModels(modelsData); // Actualiza el estado con los modelos obtenidos
        };
        getModels();
    }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

    // Obtener los eventos desde la API
    useEffect(() => {
        const getEvents = async () => {
            const eventsData = await fetchEvents(); // Usamos la función fetchEvents
            setEvents(eventsData); // Actualiza el estado con los eventos obtenidos
        };
        getEvents();
    }, []); // Este efecto se ejecuta solo una vez cuando el componente se monta

    const handleAddEvent = async () => {
        if (newEvent.date && newEvent.location && newEvent.models.length > 0 && newEvent.image) {
            const addedEvent = await addEvent(newEvent); // Usamos la función addEvent para enviar el nuevo evento

            if (addedEvent) {
                // Si el evento fue agregado correctamente, lo agregamos al estado
                setEvents([...events, addedEvent]);
                setNewEvent({ id: events.length + 2, date: '', location: '', models: [], image: '' });
                setSelectedModel('');
                setShowForm(false); // Oculta el formulario después de agregar el evento
            }
        }
    };

    const handleModelAdd = () => {
        if (selectedModel && !newEvent.models.includes(selectedModel)) { // Evitar duplicados
            setNewEvent({ ...newEvent, models: [...newEvent.models, selectedModel] });
            setSelectedModel(''); // Limpiar la selección de modelo
        }
    };

    return (
        <div className="bg-complement2 rounded-xl shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
            <Navbar />
            <div className='ml-4 mr-4'>
                <h2 className="text-3xl font-extrabold text-pink-800 mb-6 mt-4">
                    Upcoming Fashion Events & Makeup Shows
                </h2>

                {/* Botón para mostrar/ocultar el formulario */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary text-sm p-2 mb-4 rounded-md hover:bg-secondary"
                >
                    {showForm ? 'Hide Event Form' : 'Add New Event'}
                </button>

                {/* Formulario para agregar eventos */}
                {showForm && (
                    <div className="mb-10 p-4 bg-white shadow rounded-lg max-w-md">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Add New Event</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Enter location"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                value={newEvent.image}
                                onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Enter image URL"
                            />
                        </div>

                        {/* Selección de modelos */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Add Model</label>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="">Select a model</option>
                                {models.map((model) => (
                                    <option key={model.id} value={model.name}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleModelAdd}
                                className="bg-primary text-sm p-2 rounded-md hover:bg-secondary flex gap-2 mt-4"
                            >
                                Add Model
                            </button>

                            <div className="mt-2">
                                <strong>Models: </strong>{newEvent.models.join(', ')}
                            </div>
                        </div>

                        <button
                            onClick={handleAddEvent}
                            className="bg-primary text-sm p-2 rounded-md hover:bg-secondary flex gap-2"
                        >
                            Add Event
                        </button>
                    </div>
                )}

                {/* Lista de eventos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={event.image} alt={event.location} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{event.location}</h3>
                                <p className="text-gray-600">{event.date}</p>
                                <p className="text-gray-700 mt-2">Models: {event.models.join(', ')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MakeupEvents;
