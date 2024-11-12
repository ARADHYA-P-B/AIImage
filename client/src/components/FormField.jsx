import React from 'react'

const FormField = ({LabelName, type="text", name, placeholder, value, handleChange, isSurpiseMe=false, handleSurpise}) => {
  return (
    <div>
      <div className='flex item-center gap-2 mb-2'>
       <label htmlFor={name}
       className='block font-medium text-sm text-black-900'>{LabelName} </label>
       {isSurpiseMe && (
        <button 
        type="button"
        onClick={handleSurpise}
        className='font-semibold text-xs bg-blue-200 py-1 px-2 rounded-[5px] text-black'>
          Surpise me
        </button>
      )}
      </div>

      <input 
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required 
      className='bg-gray-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outlined-none block w-full p-3'/>

    </div>
  )
}

export default FormField;