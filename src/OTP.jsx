import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

// Ref.current property holds an array here

const OTP = ({ number }) => {
  const ref = useRef([]);
  const [otp, setOtp] = useState(new Array(number).fill(""));
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (ref.current[0]) {
      ref.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (newOtp.join("").length == otp.length) {
      ref.current[index].blur();
      console.log(newOtp.join(""));
      setDisable(false);
      return;
    }
    if (value) {
      ref.current[index + 1].focus();
    }
  };

  const handlekeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      ref.current[index - 1].focus();
    }
  };

  const handleClick = (index) => {
    ref.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      ref.current[otp.indexOf("")].focus();
    }
  };

  return (
    <>
      <div className="flex justify-center">
        {Array.from({ length: number }).map((_, index) => {
          return (
            <input
              value={otp[index]}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handlekeyDown(e, index)}
              onChange={(e) => handleChange(e, index)}
              key={index}
              ref={(e) => (ref.current[index] = e)}
              className="flex justify-center items-center outline-indigo-300 w-[45px] h-[50px] rounded-lg bg-blue-800 text-white m-1 px-4"
              type="text"
              name="otp"
              id="otp"
            />
          );
        })}
      </div>
      <div>
        <button
          className={`w-[200px] h-[50px] mt-10 text-white ${
            disable ? "bg-slate-400" : "bg-green-500"
          }`}
          onClick={() => {
            alert("Login Successful");
            setOtp(new Array(number).fill(""));
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default OTP;
