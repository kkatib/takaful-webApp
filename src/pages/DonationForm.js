import React, { useState, useEffect, useCallback } from "react";
import { FaDollarSign } from "react-icons/fa6";
import "./DonationForm.css";
import axios from "axios";
import hand from "./Donation.jpg";
import { CgProfile } from "react-icons/cg";

const InputField = ({ name, placeholder, value, onChange, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
  />
);

const RecipientProfile = ({ photoSrc, userName }) => (
  <div className="recipient-profile">
    <img src={photoSrc} alt="Recipient Profile" />
    <text>{userName}</text>
  </div>
);

const DonationForm = () => {
  const [formData, setFormData] = useState({
    userName: "",

    email: "",
    password: "",
    cardNumber: "",
    amount: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [photoSrc, setPhotoSrc] = useState("");
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get("link t api")
      .then((response) => {
        setTitle(response.data.title);
        setUserName(response.data.userName);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      axios
        .post("link ta post api", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [formData]
  );

  const handleChange = useCallback(
    (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    },
    [formData]
  );

  return (
    <div className="root">
      <div className="container">
        <div className="photo">
          <img src={hand} alt="" />
        </div>
        <div className="donation-form">
          <div className="title">{title}</div>
          <CgProfile
            style={{ fontSize: "6em", display: "block", textAlign: "left" }}
          />
          <form onSubmit={handleSubmit}>
            <div className="inputGroup">
              <InputField
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onBlur={(event) => setIsEmailValid(event.target.checkValidity())}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              type="id"
              name="cardNumber"
              placeholder="Card number"
              value={formData.cardNumber}
              required
              onChange={handleChange}
            />
            <InputField
              type="number"
              name="amount"
              placeholder="the amount"
              value={formData.amount}
              required
              onChange={handleChange}
            />
            <FaDollarSign
              style={{
                marginLeft: "5px",
                transform: "translateX(+1800%) translateY(-250%)",
              }}
            />
            <input className="bottom" type="submit" value="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
