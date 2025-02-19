# Meteor Contacts App

A simple contact management application built with Meteor, React, and MongoDB.

## 🚀 Features
- Add new contacts with name and email.
- View a list of all saved contacts.
- Delete contacts from the list.
- Uses Meteor's methods and publications for data management.

## 🛠 Setup Instructions

### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Meteor.js](https://www.meteor.com/)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/basharatmuhd/contacts-app.git
cd meteor-contacts-app
```

### 3️⃣ Install Dependencies
```sh
meteor npm install
```

### 4️⃣ Run the Application
```sh
meteor
```
The app will be available at `http://localhost:3000`

## 📂 Project Structure
```
📁 meteor-contacts-app
│-- 📁 imports
│   │-- 📁 api
│   │   ├── Contacts.js       # MongoDB Collection
│-- 📁 client
│   │-- 📁 ui
│   │   ├── ContactForm.js    # Form to add contacts
│   │   ├── ContactList.js    # Display contacts with delete button
│-- 📁 server
│   ├── main.js               # Meteor methods & publications
├── package.json
├── README.md
```

## 📝 API Methods
| Method Name        | Description |
|--------------------|-------------|
| `contacts.insert` | Adds a new contact |
| `contacts.remove` | Deletes a contact by ID |

## ✨ How to Use
### Add a Contact
1. Enter a name and email in the form.
2. Click "Add Contact" to save it to the database.

### Delete a Contact
1. Click the "Delete" button next to a contact.
2. The contact will be removed from the list.

## 🏗️ Future Enhancements
- Add contact editing functionality.
- Implement authentication for secure access.

## 📜 License
This project is licensed under the MIT License.

---
💡 **Happy Coding!** 🚀

