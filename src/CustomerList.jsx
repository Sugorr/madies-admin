import React, { useState } from 'react';
import { AnimatePresence, Reorder, motion } from 'framer-motion';

function CustomerList({ customer, onRemoveCustomer, onRemoveItem }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleRemoveCustomer = () => {
    onRemoveCustomer(customer.id);
  };

  const handleRemoveItem = (index) => {
    onRemoveItem(customer.id, index);
  };

  // Calculate the total
  const total = customer.itemList.reduce((acc, curr) => acc + Number(curr), 0).toLocaleString();

  return (
    <>
      <AnimatePresence>
        <motion.div 
          layout 
          layoutId={customer.id}
          className='w-full grid grid-flow-col grid-cols-4 gap-4 backdrop-blur-md bg-gray-800/50 text-white outline outline-1 outline-white/50 p-4'>
          <p className='text-xl font-bold text-left place-self-start w-full overflow-hidden text-wrap truncate ...'>{customer.name}</p>
            <div className='place-self-start'>
                {customer.itemList.map((item, index) => (
                  <div key={index} className='flex justify-between items-center'>
                    <div>
                      <span className='text-orange-300'>₱ </span>
                      {item}
                    </div>
                  </div>
                ))}
            </div>
          <div>
            Total: <span className='text-orange-300'>₱ {total}</span>
          </div>

          <button onClick={() => setSelectedId(customer.id)} className='px-6 py-3 bg-orange-300 place-self-center text-black font-semibold'>
            Edit
          </button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className='absolute top-0 h-screen inset-0 grid place-items-center z-50'>
            <motion.div layoutId={customer.id} className='z-30 text-white relative gap-4 flex flex-col justify-start items-center md:w-1/2 md:h-1/2 overflow-y-auto backdrop-blur-md bg-gray-800/50 outline outline-white outline-1 p-16'>
              <div onClick={() => setSelectedId(null)} className='absolute z-50 top-0 right-0 bg-red-500 md:p-4 p-4 md:text-xl text-md m-2 cursor-pointer'>
                Exit
              </div>
              <p className='text-4xl text-white font-bold text-center'>{customer.name}</p>
                      <motion.div className='place-self-start w-full flex flex-col justify-center items-center gap-2 overflow-y-visible'>
                        <AnimatePresence>
                            {customer.itemList.map((item, index) => (
                              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: {duration: 0.55} }} key={index} className='flex md:w-2/3 w-full h-full justify-between items-center border-b-2'>
                                  <div className='md:text-xl text-sm'>
                                    <span className='text-orange-300'>₱ </span>
                                    {item}
                                  </div>
                                  <motion.button
                                      onClick={() => handleRemoveItem(index)}
                                      className={`transition-all group relative p-2 m-2 md:text-xl text-sm font-semibold z-10 hover:text-white text-red-600`}
                                  >
                                  <motion.div
                                      className='transition-all absolute top-0 left-0 h-full scale-y-0 group-hover:scale-y-100 -z-10 w-full bg-red-600'
                                  ></motion.div>
                                  Remove
                                  </motion.button>
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </motion.div>

              <button onClick={handleRemoveCustomer} className='transition-all p-4 bg-transparent font-semibold outline outline-2 my-4 outline-red-500 hover:bg-red-500 hover:text-white text-red-500 md:hover:px-10'>
                Remove Customer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CustomerList;
