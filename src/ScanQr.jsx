import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { HttpFetchQrCode } from './store/qr/thunks';
import { useSelector } from 'react-redux';
import { selectQrCodeImage } from './store/qr/selector';

const StudentQRScanner = () => {

  const image = useSelector(selectQrCodeImage);

  const dispatch = useAppDispatch();
  useEffect(() => {
    try{
      const fetchData = async () => {
        await dispatch(HttpFetchQrCode({ sessionId : 1})).unwrap();
      }

      fetchData();
    }catch(error){
      console.log(error)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-4">

      <div className="max-w-lg mx-auto mt-28">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Scan QR Code
          </h1>
          <p className="text-gray-600 text-center">
            Point your camera at the lecturer's QR code to mark attendance
          </p>
        </div>

        <div className='flex justify-center'>
          <img src={image} alt="QR Code" />
        </div>

        {/* Footer Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact your lecturer or IT support
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentQRScanner;