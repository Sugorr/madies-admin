// App.js

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomerList from './CustomerList'; // Import the CustomerList component
import { SlNote } from "react-icons/sl";

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
      <motion.section
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
      className='flex flex-col justify-center items-center w-full gap-8 md:p-12 p-4 mt-32'>
        <form onSubmit={handleSubmit} className='relative flex md:flex-row flex-col justify-center items-center gap-4 p-12 bg-gray-800/50 outline outline-blue-300/50 outline-1 font-semibold'>
          {error && <p className="text-red-600/75 absolute md:-top-12 top-3 text-lg font-normal">{error}</p>}
          <div className='flex flex-col gap-4'>
            <div className="relative">
              <input type="text" name="name" id="name" maxLength={32} value={formData.name} onChange={handleInputChange} className='py-2 pt-4 px-5 text-xl focus:outline-none focus:ring-0 focus:border-orange-600 peer' placeholder=" " />
              <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-orange-600 peer-focus:dark:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Customer Name</label>
            </div>
            <div className="relative">
              <input type="number" name="itemList" id="itemList" max="100000" value={formData.itemList} onChange={handleInputChange} className='py-2 pt-4 px-5 text-xl focus:outline-none focus:ring-0 focus:border-orange-600 peer' placeholder=" " />
              <label htmlFor="itemList" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-orange-600 peer-focus:dark:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Item Cost</label>
            </div>
          </div>
          <button type="submit" className='p-4 bg-orange-300'>Add Customer</button>
            <motion.div
              layout
              onClick={toggleSorting} className={`transition-all w-32 text-center p-4 ${sortingEnabled ? "bg-red-500": "bg-green-300"} cursor-pointer`}>
                {sortingEnabled ? 'Disable' : 'Enable'}
            </motion.div>

          <div className='h-full w-full blur-xl bg-white/5 absolute -z-10 top-0 left-0'></div>

        </form>
      </motion.section>

      <section className='flex flex-col justify-center items-center place-content-center w-full gap-8 p-12'>
            <motion.div className='flex flex-col gap-2 md:w-1/2'>
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
