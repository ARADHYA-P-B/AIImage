import React, { useState } from 'react'
import { preview } from '../assets';
import {getRandomPrompt} from '../utils';
import { Form, useNavigate } from 'react-router-dom';
import { Formfield, Loader } from '../components';



const CreatePost = () => {
  const navigate = useNavigate();
  const [formData ,setFormData] = useState({name:'',prompt:'',photo:''});

  const[generatingIng ,setGeneratingIng] = useState(false);
  const[loding,setLoading] = useState(false);

  
  const handlsubmit = async() =>{
          e.preventDefault();
          if(formData.prompt && formData.photo){
              setLoading(true);

              try {
                   const response = await fetch('http://localhost:8080/api/v1/post',{
                    method:"POST",
                    headers:{
                      'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(formData)
                   }) 
                  
                   await response.json();
                   navigate('/');

              } catch (error) {
                  alert(err);
              }finally{
                setLoading(false);
              }
          }else{
            alert('please enter the community button');
          }
  }

  const handleChange =(e) =>{
    const {name,value} = e.target;
    setFormData((...form) =>({
      ...form,[name]:value,
    }));
  };

  const handleSurpise =() =>{
           const randomPromt = getRandomPrompt(Form.prompt);
           setFormData({...formData,prompt:randomPromt})
  } 

  const generateImages = async () =>{
    if (formData.prompt) {
      try {
          setGeneratingIng(true);
          const response = await fetch('http://localhost:8080/api/v1/openai', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt: formData.prompt }),
          });
  
          if (!response.ok) {
             
              console.error("Server responded with an error:", response.status, response.statusText);
              throw new Error("Failed to generate image");
          }
  
          const data = await response.json();
          if (data.photo) {
              setFormData({ ...formData, photo: `data:image/jpeg;base64,${data.photo}` });
          } else {
              console.error("Unexpected response format:", data);
              alert("No image data received.");
          }
      } catch (error) {
          console.error("Error during image generation:", error);
          alert(`An error occurred: ${error.message}`);
      } finally {
          setGeneratingIng(false);
      }
  } else {
      alert('Please enter a prompt');
  }
  
  }

  return (
      <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className='font-extrabold text-[#222328] text-[32px]'>
              Create</h1>
              <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>
                Create imaginative and visually stunning images through DALL_E AI and share them with the  community</p>
        </div>
        <form className='mt-16 max-w-3xl' onSubmit={handlsubmit}>
          <div className='flex flex-col gap-5'>
          <Formfield 
           LabelName="Name"
           type="text"
           name="name"
           placeholder="Enter your name"
           value={formData.name}
           handleChange={handleChange}
            />
            <Formfield 
            LabelName="prompt"
            type="text"
            name="prompt"
            placeholder="enter some prompts"
            value={formData.prompt}
            handlechange={handleChange}
            isSurpiseMe={true}
            handleSurpise ={handleSurpise}
            />
 
            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
                {formData.photo ? (
                  <img src={formData.photo} alt={formData.prompt} className='w-full h-full object-contain'/>
                ) : (
                    <img
                      src={preview}
                      alt='preview'
                      className='w-9/12 h-9/12 onject-contain opacity-40'/>
                )}

                {generatingIng && (
                  <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]
                  rounded-lg'>
                    <Loader/>
                  </div>
                )}
            </div>
          </div>
          <div className='mt-5 flex gap-5'>
              <button 
              type="button"
              onClick={generateImages}
               className='text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              >

                {generatingIng ? 'Generating...' : 'Genarate'}
              </button>
          </div>
          <div className='mt-10'>
                  <p className='mt-2 text-bold text-14'>Once have to create the images you want ,you can share it with the community</p>
                  <button type="submit"
                  className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                  >
                    {loding ? 'Sharing...'  : 'share with the community'}
                  </button>
          </div>
        </form>
      </section>
  )
}

export default CreatePost;