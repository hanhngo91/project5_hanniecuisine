import { useState } from "react";
import { notification } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const [formMessage, setFormMessage] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    subject: "",
    message: "",
  });
  //Check empty input:
  const checkEmptyInput = (input: string) => {
    if (input === "") {
      return false;
    }
    return true;
  };
  //Validate email:
  const validateEmail = (): boolean => {
    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return emailPattern.test(String(formMessage.email).toLowerCase());
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormMessage((prevFormMessage) => ({
      ...prevFormMessage,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (
      !checkEmptyInput(formMessage.firstName) ||
      !checkEmptyInput(formMessage.lastName) ||
      !checkEmptyInput(formMessage.email) ||
      !checkEmptyInput(formMessage.tel) ||
      !checkEmptyInput(formMessage.subject) ||
      !checkEmptyInput(formMessage.message)
    ) {
      notification.error({
        message: "Please fill in all the fields!",
      });
      return;
    } else if (!validateEmail()) {
      notification.error({
        message: "Please enter valid email!",
      });
      return;
    } else {
      try {
        await axios.post("http://localhost:3001/message", formMessage);

        notification.success({
          message: "Send message successfully!",
        });
        setFormMessage({
          firstName: "",
          lastName: "",
          email: "",
          tel: "",
          subject: "",
          message: "",
        });
      } catch (err) {
        console.log(err);
        notification.error({
          message: "Send message failed due to server error!",
        });
      }
    }
  };

  return (
    <div className="bg-black text-white pt-[10rem] px-[4rem]">
      <div className="flex justify-around">
        <div className="basis-[65%] mr-[3rem]">
          <p className="text-4xl mb-[2.5rem]">CONTACT US</p>
          <p className="mb-[1rem]">
            <i className="fa-solid fa-phone text-white"></i> &nbsp;Phone: &nbsp;
            <span className="text-gray-500">(03) 9791 9894</span>
          </p>
          <p className="mb-[1rem]">
            <i className="fa-solid fa-envelope text-white"></i>&nbsp;Email:
            &nbsp;
            <span className="text-gray-500">lacuisinedhannie@hannie.com</span>
          </p>
          <p className="mb-[1rem]">
            For any marketing, media & PR enquiries, please email &nbsp;
            <span className="text-gray-500 cursor-pointer hover:underline">
              marketing@hannie.group
            </span>
          </p>
          <p className="mb-[1rem]">
            Open time: &nbsp;
            <span className="text-gray-500">Mon to Sun, from 5pm</span>
          </p>
          <p className="mb-[1rem]">
            Please note a 15% surcharge applies on public holidays
          </p>
          <p className="text-xl mb-[1rem]">— GET IN TOUCH —</p>
          <div className="w-full text-black">
            <form onSubmit={handleSubmit}>
              <div className="w-full flex justify-between gap-4 my-[1rem]">
                <input
                  className="w-[50%] py-1 px-2 outline-none"
                  type="text"
                  name="firstName"
                  value={formMessage.firstName}
                  maxLength={10}
                  placeholder="First name"
                  onChange={handleChange}
                />
                <input
                  className="w-[50%] py-1 px-2 outline-none"
                  type="text"
                  name="lastName"
                  value={formMessage.lastName}
                  maxLength={10}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
              <div className="w-full mb-[1rem]">
                <input
                  className="w-full py-1 px-2 outline-none"
                  type="text"
                  name="email"
                  value={formMessage.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full mb-[1rem]">
                <input
                  className="w-full py-1 px-2 outline-none"
                  type="text"
                  name="tel"
                  value={formMessage.tel}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="w-full mb-[1rem]">
                <input
                  className="w-full py-1 px-2 outline-none"
                  type="text"
                  name="subject"
                  value={formMessage.subject}
                  maxLength={50}
                  onChange={handleChange}
                  placeholder="Enter subject"
                />
              </div>
              <div className="w-full mb-[1rem]">
                <textarea
                  className="w-full py-1 px-2 outline-none resize-none"
                  cols={50}
                  rows={10}
                  maxLength={200}
                  onChange={handleChange}
                  name="message"
                  value={formMessage.message}
                  placeholder="Enter your message..."
                ></textarea>
              </div>
              <button className="py-[.5rem] px-[3.25rem] text-white font-semibold border-2 border-white mb-8 hover:bg-white hover:text-black">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
        <div className="basis-[35%]">
          <p className="mb-[1rem]">
            La cuisine d'Hannie, Level 55 Rialto Towers
          </p>
          <p className="mb-[1rem]">525 Collins Street, Melbourne, VIC 3000</p>
          <div className="mb-[2rem] flex justify-center items-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12607.172423667456!2d144.93874509303168!3d-37.818314809457775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4db0e62159%3A0xdf5a6a74057ab41f!2s525%20Collins%20St%2C%20Melbourne%20VIC%203000%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1689952082133!5m2!1svi!2s"
              width="400"
              height="350"
              loading="lazy"
            ></iframe>
          </div>
          <p className="mb-[1rem] leading-8 text-justify">
            Access to the Rialto underground car park is at 476 Flinders Lane.
            For information on carpark rates and opening hours, please contact
            us.
          </p>
          <p className="mb-[1rem] leading-8 text-justify font-courgette">
            Please note over the weekend the Rialto car park is closed to the
            public, however it is still accessible to La cuisine d'Hannie
            guests. Please check with Security via the Security Intercom System
            located at the Car Park entrance and you will then be directed to
            the casual car parking bays located on Level D to E ramp.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-[2rem]">
        <img className="w-[12rem]" src="/images/c1.jpeg" alt="contact1" />
        <img className="w-[12rem]" src="/images/c2.jpeg" alt="contact2" />
        <img className="w-[12rem]" src="/images/c3.jpeg" alt="contact3" />
        <img className="w-[12rem]" src="/images/c4.jpeg" alt="contact4" />
        <img className="w-[12rem]" src="/images/c5.jpeg" alt="contact5" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="border-b border-[#3d3b3b] mt-[5rem] mb-[2rem] w-[75%]"></div>

        <div className="mt-[3rem]">
          <Link to="/reservations">
            <span className="text-gray-500 cursor-pointer mx-2 hover:border-b">
              Make a reservation
            </span>
          </Link>
          <span>|</span>
          <span className="text-gray-500 cursor-pointer mx-2 hover:border-b">
            Mailing list
          </span>
          <span>|</span>
          <span className="text-gray-500 cursor-pointer mx-2 hover:border-b">
            Privacy Policy
          </span>
        </div>
        <div className="mt-[1rem] pb-[2rem] font-inpiration">
          <span>
            A brand by Hannie <i className="fa-solid fa-heart"></i> Hanh
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
