import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { selectIsVerified, selectMessage, selectQrCode } from '../store/sesssion/selector';
import { HttpFetchQrCode, HttpVerifyAttendance } from '../store/sesssion/thunks';
import { useAppDispatch } from '../store/hooks';
import Spinner from '../loaders/Spinner';
import { useSearchParams } from 'react-router';
import AttendanceMarked from './AttendanceMarked';
import { sessionActions } from '../store/sesssion/slice';

export default function QrCodeScanner(){

    const dispatch = useAppDispatch();
    const params = useSearchParams();
    const sessionId = atob(params[0].get("sessionId"));

    const qrCode = useSelector(selectQrCode);
    const isVerified = useSelector(selectIsVerified);
    const message = useSelector(selectMessage);

    const [ error, setError ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);


    useEffect(() => {
      async function fetchSessions() {
        try {
          await dispatch(HttpFetchQrCode()).unwrap();
        } catch (error) {
          console.error("Error fetching qrcode:", error);
        }
      }
        
      fetchSessions();
    }, []);

    // * State Management
    const [inputCodes, setInputCodes] = useState(Array(6).fill(""));
    const [focusedIndex, setFocusedIndex] = useState(null);
    
    // * Handle input change
    const handleInputChange = (index, value) => {
        if (!/^[a-zA-Z0-9]*$/.test(value)) return; // * Allow letters and digits
        const updatedCodes = [...inputCodes];
        updatedCodes[index] = value.slice(0, 1); // * Ensure only 1 digit
        setInputCodes(updatedCodes);
    
        if (value && index < inputCodes.length - 1) {
          document.getElementById(`code-${index + 1}`).focus(); // * Move to the next input
        }
    };


    const handleKeyDown = (e, index) => {
      // * Move back on Backspace if input is empty
      if (e.key === "Backspace") {
        if (inputCodes[index] === "") {
          if (index > 0) {
            document.getElementById(`code-${index - 1}`).focus();
          }
        } else {
          const updatedCodes = [...inputCodes];
          updatedCodes[index] = "";
          setInputCodes(updatedCodes);
        }
      }

      // *  Left/Right arrow navigation
      if (e.key === "ArrowLeft" && index > 0) {multi-factor-auth
        document.getElementById(`code-${index - 1}`).focus();
      } else if (e.key === "ArrowRight" && index < inputCodes.length - 1) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    };

    // * Verify Code Handler
    function handleVerifyCode(e) {
      e.preventDefault();

      const code = inputCodes.join("");

      if (code.length !== 6) {
        setError("Please enter the 6-digit code");
        return;
      }

      setError("");
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          try{
            await dispatch(HttpVerifyAttendance({
              sessionId: sessionId,
              code: code,
              latitude: coords.latitude,
              longitude: coords.longitude,
              setIsLoading: setIsLoading
            })).unwrap();
          }catch(err){
            console.log(err)

            setError(err.message || "An error occurred while verifying attendance");

            setTimeout(() => {
              setIsLoading(false);
              setError("");
            }, 2000);

            return;
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        },
        (err) => {
          console.log(err);
          setError(err.message);

          setTimeout(() => {
            setIsLoading(false);
            setError("");
          }, 2000);
        }
      );
    }

    return <section className=" h-[90vh] w-full">
      { !isVerified && <div>
        <p className="text-center mt-20 text-[24px] font-bold">Scan <span className="text-primary">QrCode</span></p>
        <p className="text-center text-base text-black/80 mt-2 font-medium">Verify attendance</p>

        <p className="text-center mt-6 w-[60%] mx-auto text-[18px] font-medium leading-8">Scan QR code below on your authentication app to get the validation code for further authentication</p>

        <img src={qrCode} alt="QR Code" className="mx-auto h-[30vh]"/>

        <p className="text-center mt-6 text-base font-medium">2. Enter validation code to confirm connection</p>

      <div className="flex justify-center">
        <form onSubmit={(e) => handleVerifyCode(e)} className="w-full max-w-sm">
          <div className="flex justify-center mt-6">
            {inputCodes.map((code, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  value={code}S c
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  className={`border border-black/20 w-16 h-24 text-center mx-1 py-4 text-[24px] font-semibold text-black rounded-xl ${
                    focusedIndex === index ? "outline-none border-primary ring-1 ring-primary" : ""
                  }`}
                />
              ))}
          </div>

          {error !== "" && <p className='text-center text-red-500 mt-4 font-medium text-[14px]'>{error}</p>}
          {message !== "" && <p className='text-center text-green-500 mt-4 font-medium text-[16px]'>{message}</p>}
          
          { isLoading && <div className='flex justify-center mt-4 text-[13px] text-black/60 space-x-3'>
            <p>Authenticating</p>
            <Spinner color='border-green-600'/>
          </div>}

          <div className="mt-8 flex justify-center">
            <button type="submit" disabled={isLoading} className=" text-white flex justify-between bg-green-600 text-[16px] font-semibold px-4 py-3 rounded-xl w-full border hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-20">
              <p className="mt-[2px]">Confirm Attendance</p>
              <IoIosArrowRoundForward className="size-6"/>
            </button>
          </div>
        </form>
      </div>
    </div>}

    { isVerified && <AttendanceMarked/>}
  </section>
}