import React from 'react'

const TopButtons = ({setQuery}) => {

    const cities = [
        {
            id:1,
            name:"Hyderabad"
        },
        {
            id:2,
            name:"Sydney"
        },
        {
            id:3,
            name:"Las Vegas"
        },
    ]

  return (
    <div className="flex flex-wrap items-center justify-center my-6 space-x-2">
    {cities.map((city) => (
        <button 
            key={city.id} 
            className='text-base sm:text-lg font-medium hover:bg-gray-700/20 px-3 py-2 rounded-md transition ease-in'
            onClick={() => setQuery({ q: city.name })}
        >
            {city.name}
        </button>
    ))}
</div>
  )
}

export default TopButtons