import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { FaDownload } from "react-icons/fa";
import Category from '../components/Category'; // Import the Category component
import '../App.css';

const Home = () => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isDownloadable, setIsDownloadable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // New state for upload success

  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      alert('Please select a file.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://135.181.19.83:5035/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        params: {
          userId,
        },
      });

      console.log('Response:', response.data);

      if (response.status === 200) {
        setIsDownloadable(true);
        setUploadSuccess(true); // Set upload success to true
      } else {
        setIsDownloadable(false);
        setUploadSuccess(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsDownloadable(false);
      setUploadSuccess(false);
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_PORTFOLIO_API_URL + '/export_to_docx', {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'filename.ext');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      <style>
        {`
        .form-row{
          display:flex;
          flex:coloumn;
          align-items:center;
          justify-content:center;
        }

        input{
        
        border:1px solid black;
        }
   
         
          }
        `}
      </style>
      <Navbar />
      <div className="home-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="file" className='label'>Upload file:</label>
            <input 
              type="file" 
              id="file" 
              className='input'
              onChange={handleFileChange} 
              required 
            />
          </div>
          <button className='button' type="submit">Submit</button>
        </form>
        {isDownloadable && (
          <>
            {loading && <div>Loading download...</div>}
            <button onClick={handleDownload} style={{ marginTop: '20px' }} className='button'>
              {!loading ? <>
              {/* <FaDownload /> Download */}
              </> : 'Loading...'}
            </button>
          </>
        )}
        {uploadSuccess && <Category />} 
        {/* // Render the Category component on successful upload */}
      </div>
    </>
  );
};

export default Home;
