import React, {useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card.jsx'




function App() {
 const [userData, setUserData] = useState([])
 const [index, setIndex] = useState(1)

 const getData = async() => {
  const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=18`)
  setUserData(response.data)
  }

  useEffect(function () {
    getData()
  }, [index])

  let  displayData = <h3 className='text-shadow-black text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>

  if(userData.length > 0) {
    displayData = userData.map( function (elem,index) {
      return <div key={index}>
        <Card elem={elem} />
      </div>
    })
    
  }

  return (
   <div className= ' bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600 overflow-hidden h-screen p-4 text-black'>
    <div className='flex h-[90%] flex-wrap gap-4 p-2 overflow-auto
    justify-center items-center relative'
    >
        {displayData}
    </div>
    <div className='flex justify-center gap-6 p-4 items-center'>
      <button style={{opacity: index == 1 ? 0.6 : 1}}
      className='rounded bg-indigo-600 px-4 py-2 font-semibold text-sm text-black cursor-pointer'
      onClick={() => {
        if(index > 1){
          setIndex(index - 1)
          setUserData([])
        }
      }}
      >
        Prev
      </button>
      <h4 className='inline'>Page {index}</h4>
      <button 
      className='rounded bg-indigo-600 px-4 py-2 font-semibold text-sm text-black cursor-pointer'
       onClick={() => {
          setUserData([])
          setIndex(index + 1)
      }}
      >
        Next
      </button>
    </div>
   </div>
  )
}

export default App
