import React, { useState } from 'react';
import "./App.css"

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Success:', data);
      alert('Message sent successfully!');
    } else {
      console.error('Error submitting form');
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('Network error. Please check your connection.');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label><br />
        <input 
          type="text"
          name="name"
          placeholder='enter your name'
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label>Email:</label><br />
        <input 
          type="email"
          name="email"
          placeholder='enter your email'
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;