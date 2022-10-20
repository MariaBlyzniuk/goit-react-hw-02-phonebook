import { nanoid } from "nanoid";
import React, { Component } from "react"
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import Notiflix from 'notiflix';

export class App extends Component {
state = {
  contacts: [
    {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
    {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
    {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
    {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: ''
  }
  
  handleAddContact = contact => {
    const addContact = { id: nanoid(4), ...contact }
  
    if (addContact) {
      Notiflix.Confirm.show(`${contact.name} is already in contacts.`);
    } else {
      this.setState(
      prev => ({ contacts: [...prev.contacts, addContact] }),
      () => console.log(this.state)
    )
    }
  };
  
  handleDeleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }))
  };
    handleVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  handleFilterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter } = this.state;
      return <div>
      <h2>Phonebook</h2>
        <ContactForm
          onSubmit={this.handleAddContact} />
        
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterContacts}/>
        <ContactList contacts={this.handleVisibleContacts()}     onDeleteContact={this.handleDeleteContact}
          />
    </div>
  }
};
