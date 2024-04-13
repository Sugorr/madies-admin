import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlUserUnfollow, SlSizeActual  } from "react-icons/sl";


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
          layout='position'
          layoutId={customer.id}
          initial={{
            scaleY: 0,
            opacity: 0,
          }}
          animate={{
            scaleY: 1,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            duration: 2,
          }}
          className='w-full grid grid-flow-col grid-cols-4 gap-4 backdrop-blur-md bg-gray-800/50 text-white outline outline-1 outline-blue-300/50 p-4'>
          <p className='text-xl font-bold text-left place-self-start w-full overflow-hidden text-wrap truncate ...'>{customer.name}</p>
            <div className='place-self-start'>
                {customer.itemList.map((item, index) => (
                  <motion.div
                  initial={{
                    scaleY: 0,
                  }}
                  animate={{
                    scaleY: 1,
                  }}
                  key={index} className='flex justify-between items-center'>
                    <div>
                      <span className='text-orange-300'>₱ </span>
                      {item}
                    </div>
                  </motion.div>
                ))}
            </div>
          <div>
            Total: <span className='text-orange-300'>₱ {total}</span>
          </div>

          <button onClick={() => setSelectedId(customer.id)} className='px-6 py-3 bg-orange-300 place-self-center text-black font-semibold'>
            Edit
          </button>
        </motion.div>
        
        {selectedId && (
          <motion.div
            className='md:absolute sticky top-0 h-screen inset-0 grid place-items-center z-50'>
            <motion.div layoutId={customer.id} className='z-30 text-white gap-4 flex flex-col justify-start items-center md:w-1/2 w-full md:h-1/2 overflow-y-auto backdrop-blur-md bg-gray-800/50 outline outline-blue-300/50 outline-1 p-16'>
              <div onClick={() => setSelectedId(null)} className='absolute self-end z-50 top-0 right-0 p-4 rounded-full bg-orange-300/50 hover:bg-orange-300 text-black md:text-xl text-md m-2 cursor-pointer'>
                <SlSizeActual />
              </div>
              <p className='md:text-4xl text-white font-bold text-center'>{customer.name}</p>
                      <motion.div className='place-self-start w-full flex flex-col justify-center items-center gap-2 overflow-y-visible'>
                        <AnimatePresence>
                            {customer.itemList.map((item, index) => (
                              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, transition: {duration: 0.55} }} key={index} className='flex md:w-2/3 w-full h-full justify-between items-center border-b-2 border-blue-300/50'>
                                  <div className='md:text-xl text-sm'>
                                    <span className='text-orange-300 text-2xl'>₱ </span>
                                    {item}
                                  </div>
                                  <motion.button
                                      onClick={() => handleRemoveItem(index)}
                                      className={`transition-all group relative p-2 m-2 text-sm font-semibold z-10 hover:text-white text-red-600`}
                                  >
                                  <motion.div
                                      className='transition-all absolute top-0 left-0 h-full scale-y-0 group-hover:scale-y-100 -z-10 w-full bg-red-600/50'
                                  ></motion.div>
                                  Remove
                                  </motion.button>
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </motion.div>

              <button onClick={handleRemoveCustomer} className='transition-all flex items-center gap-2 p-4 bg-transparent font-semibold outline outline-2 my-4 outline-red-600 hover:bg-red-600/50 hover:outline-red-600/50 hover:text-white text-red-600 md:hover:px-10'>
                <SlUserUnfollow size={'2em'}/>
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
