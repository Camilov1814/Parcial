import React, { useState } from 'react';
import Navbar from '../components/Navbar';


interface Event {
    id: number;
    date: string;
    location: string;
    models: string[];
    image: string;
}

const initialEvents: Event[] = [
    {
        id: 1,
        date: '2024-09-20',
        location: 'New York, USA',
        models: ['Model 1', 'Model 2'],
        image: 'https://mbmarcobeteta.com/wp-content/uploads/2021/02/shutterstock_248799484-scaled.jpg',
    },
    {
        id: 2,
        date: '2024-10-05',
        location: 'Paris, France',
        models: ['Model 3', 'Model 4'],
        image: 'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900',
    },
];

const MakeupEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [newEvent, setNewEvent] = useState<Event>({
        id: events.length + 1,
        date: '',
        location: '',
        models: [],
        image: '',
    });
    const [modelInput, setModelInput] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false); // Estado para controlar visibilidad del formulario

    const handleAddEvent = () => {
        if (newEvent.date && newEvent.location && newEvent.models.length > 0 && newEvent.image) {
            setEvents([...events, { ...newEvent, id: events.length + 1 }]);
            setNewEvent({ id: events.length + 2, date: '', location: '', models: [], image: '' });
            setModelInput('');
            setShowForm(false); // Oculta el formulario después de agregar el evento
        }
    };

    const handleModelAdd = () => {
        if (modelInput) {
            setNewEvent({ ...newEvent, models: [...newEvent.models, modelInput] });
            setModelInput('');
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

                {/* Formulario para agregar eventos, solo visible si showForm es true */}
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Add Model</label>
                            <input
                                type="text"
                                value={modelInput}
                                onChange={(e) => setModelInput(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                placeholder="Enter model name"
                            />

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
                            <img
                                src={event.image}
                                alt={`Event at ${event.location}`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <p className="text-lg font-semibold text-gray-700 mb-2">{event.date}</p>
                                <p className="text-pink-600 text-md font-bold">{event.location}</p>
                                <p className="text-gray-600 text-sm mt-2">
                                    <strong>Participating Models:</strong> {event.models.join(', ')}
                                </p>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MakeupEvents;
