import React from 'react'
import {BrowserRouter ,Link,Routes,Route} from 'react-router-dom';
import {logo} from './assets';
 import {Home,CreatePost} from './pages'


const App = () => {
  return (
      <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 py-4 border-b border-b-[#e6ebf4]'>
        <Link to='/'>
          <img src={logo} alt='logo' className='w-28 object-contain'/>
        </Link>
        <Link to='/create-Post' className='font-inter font-media bg-[#6469ff] text-white px-4 py-2 rounded-md'>CreatePost</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-fullwidth bg-[#f9fafe] min-h-[calc(100vh-73px)'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-Post" element={<CreatePost/>}/>
      </Routes>
      </main>
      </BrowserRouter> 
  )
}

export default App;