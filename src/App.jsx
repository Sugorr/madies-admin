// App.js

import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import CustomerList from './CustomerList'; // Import the CustomerList component

function App() {
  const [customerList, setCustomerList] = useState([]);
  const [formData, setFormData] = useState({ name: '', itemList: '' });
  const [error, setError] = useState('');
  const [sortingEnabled, setSortingEnabled] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === '' || formData.itemList.trim() === '') {
      setError('Please fill out both fields.');
      return;
    }

    const existingCustomer = customerList.find(customer => customer.name.toLowerCase() === formData.name.toLowerCase());
    if (existingCustomer) {
      const updatedCustomerList = customerList.map(customer => {
        if (customer.name.toLowerCase() === formData.name.toLowerCase()) {
          return {
            ...customer,
            itemList: [formData.itemList, ...customer.itemList]
          };
        } else {
          return customer;
        }
      });
      setCustomerList(updatedCustomerList);
    } else {
      const newCustomer = {
        id: (customerList.length + 1).toString(),
        name: formData.name,
        itemList: [formData.itemList]
      };
      setCustomerList([newCustomer, ...customerList]);
    }
    setFormData({ name: '', itemList: '' });
    setError('');
  };

  const toggleSorting = () => {
    setSortingEnabled(!sortingEnabled);
  };

  const removeCustomer = (customerId) => {
    const updatedCustomerList = customerList.filter(customer => customer.id !== customerId);
    setCustomerList(updatedCustomerList);
  };

  const removeItemFromCustomer = (customerId, itemIndex) => {
    const updatedCustomerList = customerList.map(customer => {
      if (customer.id === customerId) {
        return {
          ...customer,
          itemList: customer.itemList.filter((_, index) => index !== itemIndex)
        };
      } else {
        return customer;
      }
    });
    setCustomerList(updatedCustomerList);
  };

  const getFilteredAndSortedCustomers = () => {
    let filteredCustomers = customerList;

    if (formData.name.trim() !== '') {
      const typedNameLower = formData.name.toLowerCase();
      filteredCustomers = customerList.filter(customer =>
        customer.name.toLowerCase().includes(typedNameLower)
      );
    }

    if (sortingEnabled) {
      return filteredCustomers.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return customerList;
    }
  };

  return (
    <>
      <section className='flex flex-col justify-center items-center w-full gap-8 p-12 mt-32'>
        <form onSubmit={handleSubmit} className='relative flex flex-row justify-center items-center gap-4 p-12 bg-white/10 font-semibold'>
          {error && <p className="text-red-500/50 absolute -top-12 text-lg font-normal">{error}</p>}
          <div className='flex flex-col gap-4'>
            <input type="text" name="name" id="name" placeholder='Customer Name' value={formData.name} onChange={handleInputChange} className='py-3 px-5'/>
            <input type="number" name="itemList" id="itemList" placeholder='₱' value={formData.itemList} onChange={handleInputChange} className='py-3 px-5'/>
          </div>
          <div className='flex flex-col gap-4'>
            <button type="submit" className='p-4 bg-orange-300'>Add Customer</button>
          </div>
          <div onClick={toggleSorting} className={`p-4 ${sortingEnabled ? "bg-red-300": "bg-green-300"}`}>
            {sortingEnabled ? 'Disable Sorting' : 'Enable Sorting'}
          </div>
        </form>
      </section>

      <section className='flex flex-col justify-center items-center place-content-center w-full gap-8 p-12'>
            <motion.div className='flex flex-col gap-2 w-1/2'>
                {getFilteredAndSortedCustomers().map((customer) => (
                  <CustomerList 
                    key={customer.id} 
                    customer={customer} 
                    onRemoveCustomer={removeCustomer} 
                    onRemoveItem={removeItemFromCustomer} // Pass onRemoveItem function
                  />
                ))}
            </motion.div>
      
      </section>

    </>
  );
}

export default App;
