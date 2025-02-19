import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { ContactsCollection } from "../api/Contacts";

const ContactList = () => {
    // Subscribe to the 'contacts' publication
    const { contacts, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe("contacts"); // Ensure subscription is active
        if (!handler.ready()) {
            return { contacts: [], isLoading: true };
        }
        return {
            contacts: ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
            isLoading: false,
        };
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            Meteor.call("contacts.remove", id, (error) => {
                if (error) {
                    alert(`Error: ${error.reason}`);
                }
            });
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h3 className="text-center mb-4 text-primary fw-bold">📋 Contact List</h3>

                {isLoading ? (
                    <div className="text-center py-3">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2">Loading contacts...</p>
                    </div>
                ) : contacts.length === 0 ? (
                    <p className="text-center text-muted">No contacts found.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contacts.map((contact, index) => (
                                <tr key={contact._id}>
                                    <td>{index + 1}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(contact._id)}
                                        >
                                            <i className="bi bi-trash-fill"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Custom Styles */}
            <style>
                {`
                .card {
                    border-radius: 12px;
                    border: none;
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .table {
                    border-radius: 8px;
                    overflow: hidden;
                }
                .table-hover tbody tr:hover {
                    background-color: rgba(0, 123, 255, 0.1);
                }
                .btn-danger {
                    border-radius: 6px;
                    transition: 0.3s ease-in-out;
                }
                .btn-danger:hover {
                    background-color: #c82333;
                }
                `}
            </style>
        </div>
    );
};

export default ContactList;
