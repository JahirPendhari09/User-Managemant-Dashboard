import React from 'react'

const Button = ({onClick, text,disabled}) => {
  return ( 
    <button disabled={disabled} onClick={onClick}
       className={`text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${disabled? "cursor-not-allowed":"cursor-pointe"}`} 
    >
        {text}
    </button>
  )
  
}

export default Button
