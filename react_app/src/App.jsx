import { useState } from 'react'
import avatar from './assets/profile.png'
import './App.css'

import axios from 'axios';
import { Buffer } from 'buffer';  

const url = "http://localhost:8080/uploads"

function App() {
  
  const [postImage, setPostImage] = useState( { name: "product discount 3", photo : ""})
  const [data, setDta] = useState("");

  const createPost = async (newImage) => {
    try{
      console.log(newImage)
      await axios.post(url, newImage)
    }catch(error){
      console.log("herereh----  ",error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage)
   
    console.log("Uploaded")
  }

  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log("size is ---->" + base64.length)
    setPostImage({ ...postImage, photo : base64 })
    console.log(base64);
    // decodeBase64(base64);
    setDta(base64);
  }

  const decodeBase64 = (base64data) => {
    console.log(base64data);
    let base64ToString = Buffer.from(base64data, "base64").toString();
    setDta(base64ToString);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>

        <label htmlFor="file-upload" className='custom-file-upload'>
          <img src={postImage.photo || avatar} alt="" />
        </label>

        <input 
          type="file"
          lable="Image"
          name="photo"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
         />

         <h3>Doris Wilder</h3>
         <span>Designer</span>

         <button type='submit'>Submit</button>
      </form>

      <div>
        <img width='500' height='200' src={data} />
      </div>
    </div>
  )
}

export default App


function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}