import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        let newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        Meteor.call("contacts.insert", name, email, (error) => {
            if (error) {
                alert(`Error: ${error.reason}`);
            } else {
                setName("");
                setEmail("");
                setErrors({});
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000); // Hide success message after 3 seconds
            }
        });
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4 text-primary fw-bold">Add Contact</h3>

                {success && (
                    <div className="alert alert-success text-center p-2">
                        Contact added successfully! 🎉
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person-fill"></i>
                            </span>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope-fill"></i>
                            </span>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-gradient w-100">Add Contact</button>
                </form>
            </div>

            {/* Custom Styles */}
            <style>
                {`
                .btn-gradient {
                    background: linear-gradient(135deg, #007bff, #6610f2);
                    border: none;
                    color: white;
                    transition: 0.3s;
                    border-radius: 8px;
                    padding: 10px;
                    font-size: 16px;
                }
                .btn-gradient:hover {
                    background: linear-gradient(135deg, #6610f2, #007bff);
                }
                .card {
                    border-radius: 12px;
                    border: none;
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .input-group-text {
                    background: #f8f9fa;
                    border-radius: 6px;
                }
                .form-control {
                    border-radius: 8px;
                    transition: 0.3s ease-in-out;
                }
                .form-control:focus {
                    border-color: #007bff;
                    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
                }
                `}
            </style>
        </div>
    );
};

export default ContactForm;
