import { Meteor } from 'meteor/meteor';
import { ContactsCollection } from '../imports/api/Contacts';

Meteor.publish('contacts', function publishContacts() {
  return ContactsCollection.find();
});

Meteor.methods({
  async 'contacts.insert'(name, email) {
    console.log('contacts.insert called with:', name, email);

    if (!name || !email) {
      throw new Meteor.Error('400', 'Name and Email are required.');
    }

    try {
      const result = await ContactsCollection.insertAsync({
        name,
        email,
        createdAt: new Date(),
      });
      return result;
    } catch (error) {
      console.error('Error inserting contact:', error);
      throw new Meteor.Error('500', 'Internal Server Error');
    }
  },

  // 🚀 New Delete Method
  async 'contacts.remove'(contactId) {
    console.log('contacts.remove called with:', contactId);

    if (!contactId) {
      throw new Meteor.Error('400', 'Contact ID is required.');
    }

    try {
      const result = await ContactsCollection.removeAsync(contactId);
      return result;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw new Meteor.Error('500', 'Internal Server Error');
    }
  }
});

Meteor.startup(() => {
  console.log('Server started');
});
