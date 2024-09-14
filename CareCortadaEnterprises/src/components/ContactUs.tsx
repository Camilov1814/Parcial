import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario (API call, etc.)
        console.log('Form submitted', formData);
        // Limpiar el formulario
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-complement2 rounded-xl shadow-sm">
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
                <p className="mb-6">We'd love to hear from you! For inquiries or bookings, please fill out the form below or contact us using the information provided.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Your Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                rows={5}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Details */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">CCEnterprise</h2>
                        <p className="mb-4"><strong>Email:</strong> contact@CCEnterprise.com</p>
                        <p className="mb-4"><strong>Phone:</strong> +57 234 567 8900</p>
                        <h3 className="text-lg font-semibold mb-2">Follow Us on Social Media</h3>
                        <ul className="space-y-2">
                            <li><a href="https://www.instagram.com/fashion" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a href="https://www.twitter.com/fashion" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                            <li><a href="https://www.facebook.com/fashion" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
