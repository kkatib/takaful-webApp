import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import photos from '../images/photos.png';
import { FaUser, FaEnvelope, FaLock, FaMoneyCheck, FaDollarSign, FaPiggyBank, FaArrowRight, FaPencilAlt, FaFolderPlus } from 'react-icons/fa'; 

function SignUp() {
  const [formData, setFormData] = useState({
    user: '',
    Email: '',
    Password: '',
    Password2: '',
    Title: '',
    selectedCategory: '',
    nCCP: '',
    amount: '',
    description: '',
    image: null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setErrors({ ...errors, image: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      } else if (key === 'Email' && !formData[key].endsWith('@gmail.com')) {
        newErrors[key] = 'This is not an email enter ******@gmail.com';
      }
    });
    if (formData.Password !== formData.Password2) {
      newErrors.Password2 = 'New password and confirm new password must match';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {//hna link
        const response = await axios.post("https://your-api-url.com/signup", formData);
        console.log("Submission successful:", response.data);
       
        setFormData({
          user: '',
          Email: '',
          Password: '',
          Password2: '',
          Title: '',
          selectedCategory: '',
          nCCP: '',
          amount: '',
          description: '',
          image: null
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="container">
     
      <div className="photo">
        <img className='photosi' src={photos} alt="Photos" />
      </div>
      <div className="signform">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="user" className="input-label">
              <FaUser className="input-icon" />
            </label>
            <input type="text" placeholder="Enter your username" id="user" name="user" value={formData.user} onChange={handleChange} />
            {errors.user && <span className="error">{errors.user}</span>}
          </div>
          <div className="input">
            <label htmlFor="Email" className="input-label">
              <FaEnvelope className="input-icon" />
            </label>
            <input type="text" placeholder="Email Address" id="Email" name="Email" value={formData.Email} onChange={handleChange} />
            {errors.Email && <span className="error">{errors.Email}</span>}
          </div>
          <div className="input">
            <label htmlFor="Password" className="input-label">
              <FaLock className="input-icon" />
            </label>
            <input type="password" placeholder="Password" id="Password" name="Password" value={formData.Password} onChange={handleChange} />
            {errors.Password && <span className="error">{errors.Password}</span>}
          </div>
          <div className="input">
            <label htmlFor="Password2" className="input-label">
              <FaLock className="input-icon" />
            </label>
            <input type="password" placeholder="Confirm password" id="Password2" name="Password2" value={formData.Password2} onChange={handleChange} />
            {errors.Password2 && <span className="error">{errors.Password2}</span>}
          </div>
          <div className="input">
            <label htmlFor="Title" className="input-label">
              <FaPiggyBank className="input-icon" />
            </label>
            <input type="text" placeholder="Title for the pot..." id="Title" name="Title" value={formData.Title} onChange={handleChange} />
            {errors.Title && <span className="error">{errors.Title}</span>}
          </div>
          <p className='ppp'> Select category:</p>
          <div className="input">
            <label htmlFor="selectedCategory" className="input-label">
              <FaArrowRight className="input-icon" />
            </label>
            <input list="category" name="selectedCategory" id="selectedCategory" value={formData.selectedCategory} onChange={handleChange} />
            <datalist id="category">
              <option value="Disease research and treatment" />
              <option value="Providing aid to the impoverished" />
              <option value="Supporting victims of natural disasters" />
              <option value="Funding scientific research" />
              <option value="Providing education for underprivileged groups" />
              <option value="Supporting social programs for disadvantaged children" />
              <option value="Other causes" />
            </datalist>
            {errors.selectedCategory && <span className="error">{errors.selectedCategory}</span>}
          </div>
          <div className="input">
            <label htmlFor="nCCP" className="input-label">
              <FaMoneyCheck className="input-icon" />
            </label>
            <input type="number" placeholder="CCP number" id="nCCP" name="nCCP" value={formData.nCCP} onChange={handleChange} />
            {errors.nCCP && <span className="error">{errors.nCCP}</span>}
          </div>
          <div className="input">
            <label htmlFor="amount" className="input-label">
              <FaDollarSign className="input-icon" />
            </label>
            <input type="number" placeholder="the amount" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
            {errors.amount && <span className="error">{errors.amount}</span>}
          </div>
          <div className="input">
            <label htmlFor="description" className="input-label">
              <FaPencilAlt className="input-icon" />
            </label>
            <input className="Describtion" type="text" placeholder="Description.." id="description" name="description" value={formData.description} onChange={handleChange} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>
          <p className='li9bal ppp'>Please attach an image of a document justifying your request for collecting donations:</p>
          <div className="input file-upload">
            <label htmlFor="image" className="input-label">
              <FaFolderPlus className='file-upload-icon' />
            </label>
            <div className="file-upload-input">
              <input type="file" id="image" name="image" onChange={handleFileChange} />
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
          </div>
          <div className="bottom">
            <input type="submit" value="Sign up" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
