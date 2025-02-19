import React from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const App = () => {
    return (
        <div className="container mt-5">
            <ContactForm />
            <ContactList />
        </div>
    );
};

export default App;
