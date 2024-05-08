import { useState, useEffect } from "react";
import { useMembershipContext } from "./MembershipContext";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import { SERVERIP } from "../config";
// import Swal from "sweetalert2";
import Image from "../images/camera.svg";
import { Button, user } from "@nextui-org/react";
import Qr1 from "../images/QR1 (130).png";
import Qr2 from "../images/QR2 (280).png";
import Qr3 from "../images/QR3 (450).png";
import Qr4 from "../images/QR4 (640).png";
import Qr5 from "../images/QR5 (150).png";
import Qr6 from "../images/QR6 (320).png";
import Qr7 from "../images/QR7 (510).png";
import Qr8 from "../images/QR8 (720).png";
import Qr9 from "../images/QR9 (170).png";
import Qr10 from "../images/QR10 (360).png";
import Qr11 from "../images/QR11 (570).png";
import Qr12 from "../images/QR12.png";

const Foram2 = () => {
  const { hasMembership, updateMembershipStatus } = useMembershipContext();
  const [degree, setDegree] = useState("");
  const [email, setEmail] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [membership, setMembership] = useState("");
  const name = localStorage.getItem("userName");
  const phoneNumber = localStorage.getItem("userPhone");


  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedInUserEmail");
    if (!storedEmail) {
      navigate("/");
    } else {
      setEmail(storedEmail);
      setDegree(getDegreeFromEmail(storedEmail));
    }
  }, [navigate]);

  let qr1 = Qr1;
  let qr2 = Qr2;
  let qr3 = Qr3;
  let qr4 = Qr4;
  const getDegreeFromEmail = (email) => {
    const emailDomain = email.substring(email.lastIndexOf("@") + 1);
    if (emailDomain === "students.iitmandi.ac.in") {
      if (email.charAt(0).toLowerCase() === "b") {
        qr1 = Qr1;
        qr2 = Qr2;
        qr3 = Qr3;
        qr4 = Qr4;
        const amount1 = "130";
        const amount2 = "280";
        const amount3 = "450";
        const amount4 = "640";
        return "B-Tech";
      } else {
        qr1 = Qr5;
        qr2 = Qr6;
        qr3 = Qr7;
        qr4 = Qr8;
        const amount1 = "150";
        const amount2 = "320";
        const amount3 = "510";
        const amount4 = "720";
        return "PHD/M-Tech";
      }
    } else if (emailDomain === "iitmandi.ac.in") {
      qr1 = Qr9;
      qr2 = Qr10;
      qr3 = Qr11;
      qr4 = Qr12;
      const amount1 = "170";
      const amount2 = "360";
      const amount3 = "570";
      const amount4 = "800";
      return "Faculty/Staff";
    } else {
      qr1 = Qr9;
      qr2 = Qr10;
      qr3 = Qr11;
      qr4 = Qr12;
      const amount1 = "170";
      const amount2 = "360";
      const amount3 = "570";
      const amount4 = "800";
      return "Faculty/Staff";
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Define the data to be sent to the backend
    const data = {
      name,
      phoneNumber,
      degree,
      email,
      membership,
      transactionId,
    };
    console.log(data);

    try {
      const response = await fetch(`${SERVERIP}/payment/tempPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response data
      const responseData = await response.json();
      console.log("Data saved successfully:", responseData);
      updateMembershipStatus(true);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("There was a problem saving the data:", error);
    }
  };

  if (!hasMembership) {
    return (
      <div className="flex justify-center items-center bg-gray-200 min-h-screen font-monts pb-3">
        <div className="flex flex-col items-center lg:w-[90%] h-[95%] border rounded-md">
          <h2 className="text-3xl text-center font-bold mt-4">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4 w-full justify-items-center h-[85%] pt-10">
            <div className="bg-gradient-to-bl from-red-400 to-red-100 w-full max-sm:w-[90%] border-2 border-gray-200 hover:border-2 hover:border-[#332941] rounded-lg flex flex-col justify-around gap-5 mt-10 hover:scale-110 transition-transform duration-300">
              <div className="flex justify-evenly my-8">
                <img src={qr1} alt="not found" className="w-[40%]" />
                <div className="flex flex-col justify-start w-1/2">
                  <span className="text-2xl mt-2 font-semibold">Base</span>
                  <span className="text-lg font-md">Subscription</span>
                  <span className="text-sm mt-4">
                    *scan the QR code to get the subscription
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-6 mb-10">
                <ul className="flex flex-col gap-2 w-[90%]">
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span>1 Pass</span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Price: </p>
                      <p className="text-xl ml-2 font-semibold">₹1/</p>
                      <p>Month </p>
                    </span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Validity: </p>
                      <p className="text-lg ml-2 font-semibold">7 </p>
                      <p>Days</p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-bl from-gray-400 to-gray-50 w-full max-sm:w-[90%] border-2 border-gray-200 hover:border-2 hover:border-[#332941] rounded-lg flex flex-col justify-around gap-5 mb-10 hover:scale-110 transition-transform duration-300 ">
              <div className="flex justify-evenly my-8">
                <img src={qr2} alt="not found" className="w-[40%]" />
                <div className="flex flex-col justify-between w-1/2">
                  <span className="text-2xl mt-2 font-semibold">Silver</span>
                  <span className="text-lg mt-2 font-md">Subscription</span>
                  <span className="text-sm mt-4">
                    *scan the QR code to get the subscription
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-6 mb-10">
                <ul className="flex flex-col gap-2 w-[90%]">
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span>2 Passes</span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Price: </p>
                      <p className="text-xl ml-2 font-semibold">₹1/</p>
                      <p>Month </p>
                    </span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Validity: </p>
                      <p className="text-lg ml-2 font-semibold">15 </p>
                      <p>Days</p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-bl from-amber-400 to-yellow-100 w-full max-sm:w-[90%] border-2 border-gray-200 hover:border-2 hover:border-[#332941] rounded-lg flex flex-col justify-around gap-5 mt-10 max-sm:mt-0 hover:scale-110 transition-transform duration-300">
              <div className="flex justify-evenly my-8">
                <img src={qr3} alt="not found" className="w-[40%]" />
                <div className="flex flex-col justify-between w-1/2">
                  <span className="text-2xl mt-2 font-semibold">Gold</span>
                  <span className="text-lg mt-2 font-md">Subscription</span>
                  <span className="text-sm mt-4">
                    *scan the QR code to get the subscription
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-6 mb-10">
                <ul className="flex flex-col gap-2 w-[90%]">
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span>3 Passes</span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Price: </p>
                      <p className="text-xl ml-2 font-semibold">₹1/</p>
                      <p>Month </p>
                    </span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Validity: </p>
                      <p className="text-lg ml-2 font-semibold">30 </p>
                      <p>Days</p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-bl from-blue-400 to-cyan-50 w-full max-sm:w-[90%] border-2 border-gray-200 hover:border-2 hover:border-[#332941] rounded-lg flex flex-col justify-around gap-5 mb-10 hover:scale-110 transition-transform duration-300">
              <div className="flex justify-evenly my-8">
                <img src={qr4} alt="not found" className="w-[40%]" />
                <div className="flex flex-col justify-between w-1/2">
                  <span className="text-2xl mt-2 font-semibold">Diamond</span>
                  <span className="text-lg mt-2 font-md">Subscription</span>
                  <span className="text-sm mt-4">
                    *scan the QR code to get the subscription
                  </span>
                </div>
              </div>
              <div className="flex justify-center mt-6 mb-10">
                <ul className="flex flex-col gap-2 w-[90%]">
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span>4 Passes</span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Price: </p>
                      <p className="text-xl ml-2 font-semibold">₹1/</p>
                      <p>Month </p>
                    </span>
                  </li>
                  <li className="flex gap-5 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="flex items-end">
                      <p>Validity: </p>
                      <p className="text-lg ml-2 font-semibold">30 </p>
                      <p>Days</p>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 capitalize flex flex-col items-center gap-3">
  <h2 className="font-semibold text-xl">
    Fill out this form after payment
  </h2>
  <div>
    <span className="mr-3">Membership chosen:</span>
    <select
      value={membership}
      onChange={(e) => {
        setMembership(e.target.value);
      }}
      required
    >
      <option value="">Select Membership</option>
      <option value="Base">Base</option>
      <option value="Silver">Silver</option>
      <option value="Gold">Gold</option>
      <option value="Diamond">Diamond</option>
    </select>
  </div>
  <div>
    <span className="mr-3">Transaction ID:</span>
    <input
      type="text"
      placeholder="Your transaction ID"
      value={transactionId}
      required
      onChange={(e) => {
        setTransactionId(e.target.value);
      }}
    />
  </div>
  <Button
    color="success"
    type="submit"
    onClick={submitHandler}
    disabled={!membership || !transactionId}
  >
    Submit
  </Button>
</div>

        </div>
      </div>
    );
  } else {
    navigate("/");
    return null;
  }
};

export default Foram2;
