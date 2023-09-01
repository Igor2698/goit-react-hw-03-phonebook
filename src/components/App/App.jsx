import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';
import MyForm from 'components/Form/Form';
import Section from '../Section';
import ContactsList from '../ContactsList';
import Filter from '../Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Harry Potter', number: '+380984834857' },
      { id: 'id-2', name: 'Hermione Granger', number: '+380678246954' },
      { id: 'id-3', name: 'Ronald Weasley', number: '+380675654900' },
      { id: 'id-4', name: 'Drako Malfoy', number: '+380985236955' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }
  addContact = ({ name, number }) => {
    const nameInLowerCase = name.toLowerCase();
    const existingContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === nameInLowerCase
    );

    if (existingContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <Section title="Phonebook">
          <MyForm onSubmit={this.addContact} />
        </Section>
        <Section>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactsList
            filtered={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
          {visibleContacts.length === 0 && contacts.length > 0 && (
            <p className={css.warningText}>No one found with that name</p>
          )}
          {contacts.length === 0 && (
            <p className={css.warningText}>
              Please add contact by click on "Add conctact" button
            </p>
          )}
        </Section>
      </div>
    );
  }
}
