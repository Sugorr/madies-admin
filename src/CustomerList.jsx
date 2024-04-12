// CustomerList.js

import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

function CustomerList({ customer, onRemoveCustomer, onRemoveItem }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleRemoveCustomer = () => {
    onRemoveCustomer(customer.id);
  };

  const handleRemoveItem = (index) => {
    onRemoveItem(customer.id, index);
  };

  return (
    <>
      <motion.div 
      layout 
      layoutId={customer.id}
      className='w-full grid grid-flow-col grid-cols-3 gap-4 backdrop-blur-lg bg-black/50 text-white outline outline-2 outline-white/50 p-4'>
        <p className='text-xl font-bold text-left place-self-start w-full overflow-hidden truncate ...'>{customer.name}</p>
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

        <button onClick={() => setSelectedId(customer.id)} className='px-6 py-3 h-16 w-24 bg-blue-300 place-self-center text-black font-semibold'>
          Edit
        </button>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
          className='h-screen inset-0 absolute grid place-items-center'>
            <motion.div layoutId={customer.id} className='z-30 text-white relative gap-4 flex flex-col justify-start items-center w-1/3 h-1/2 overflow-y-auto backdrop-blur-lg bg-black/50 outline outline-white outline-2 p-16'>
              <div onClick={() => setSelectedId(null)} className='absolute z-50 top-0 right-0 bg-red-500 p-4 m-2'>
                Exit
              </div>
              <p className='text-4xl text-white font-bold text-center overflow-hidden truncate ...'>{customer.name}</p>
                    <motion.div className='place-self-start w-full flex flex-col gap-2'>
                        <AnimatePresence>
                            {customer.itemList.map((item, index) => (
                            <motion.div initial={{scaleY: 1, originX: 0.5,  originY: 0}} exit={{scaleY: 0}} layout='position' key={index} className='flex w-full h-full justify-between items-center border-b-2'>
                                <div>
                                <span className='text-orange-300'>₱ </span>
                                {item}
                                </div>
                                <motion.button
                                    onClick={() => handleRemoveItem(index)}
                                    className={`transition-all group relative p-2 m-2 text-sm font-semibold z-10 hover:text-white text-red-600`}
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
              <button onClick={handleRemoveCustomer} className='transition-all p-4 bg-transparent font-semibold outline outline-2 my-4 outline-red-500 hover:bg-red-500 hover:text-white text-red-500 hover:px-10'>
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
