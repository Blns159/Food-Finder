// "use client";
// import { signOut, useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// function HeaderNavBar() {
//   const { data: session } = useSession();
//   const [profileClick,setProfileClick]=useState(false);

//   useEffect(()=>{
//     setTimeout(()=>{
//       setProfileClick(false)
//     },6000)
//   },[profileClick==true])
//   return session?.user&&(
//    <div
//       className="flex items-center
//     justify-between p-2 shadow-md"
//     >
//       <div className="flex gap-7 items-center">
//         <Image src="/logo.png" alt="logo" width={50} height={50} />
//         <h2 className="cursor-pointer hover:text-blue-500">Home</h2>
//         <h2 className="cursor-pointer hover:text-blue-500">Favourite</h2>
//       </div>
//       <div
//         className=" bg-gray-100 p-[6px] rounded-md
//       w-[40%] gap-3 hidden md:flex"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//           />
//         </svg>
//         <input
//           type="text"
//           placeholder="Search"
//           className="bg-transparent 
//         outline-none w-full"
//         />
//       </div>
//       <div>
//         {session?.user ? (
//           <>
//             <Image
//               src={session.user.image}
//               alt="user"
//               width={40}
//               height={40}
//               onClick={()=>setProfileClick(!profileClick)}
//               className="rounded-full cursor-pointer 
//               hover:border-[2px] border-blue-500"
//             />
//            {profileClick? <div className="absolute bg-white p-3
//             shadow-md border-[1px] mt-2 z-30
//             right-4 ">
//               <h2 className="cursor-pointer
//                hover:text-blue-500 hover:font-bold"
//                onClick={()=>signOut()}>Logout</h2>
//             </div>:null}
//           </>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default HeaderNavBar;

"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { MdPhotoCamera, MdClose, MdReplay, MdCloudUpload } from 'react-icons/md';

function HeaderNavBar() {
  const { data: session } = useSession();
  const [profileClick, setProfileClick] = useState(false);
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);


  const [cameraOpen, setCameraOpen] = useState(false);

  const handleCameraClick = () => {
    setCameraOpen(true);
    setImageSrc(null);
  };

  const handleCamera = () => {
    const video = webcamRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageSrc = canvas.toDataURL("image/png");
    setImageSrc(imageSrc);

  }

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click(); // Click the hidden file input element
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };


  useEffect(() => {
    setTimeout(() => {
      setProfileClick(false)
    }, 6000)
  }, [profileClick == true])

  useEffect(() => {
    if (cameraOpen) {
      const video = document.getElementById("camera");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
          video.srcObject = stream;
          video.play();
        });
      }
    }
  }, [cameraOpen]);

  return session?.user && (
    <div
      className="flex items-center
    justify-between p-2 shadow-md"
    >
      <div className="flex gap-7 items-center">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <h2 className="cursor-pointer hover:text-blue-500">Home</h2>
        <h2 className="cursor-pointer hover:text-blue-500">Favourite</h2>
      </div>
      <div
        className=" bg-gray-100 p-[6px] rounded-md
      w-[40%] gap-3 hidden md:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent 
        outline-none w-full"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={handleCameraClick}
        >
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M19 8h-1l-2-2h-6l-2 2H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2zm-7 8a4 4 0 100-8 4 4 0 000 8z" />

        </svg>

      </div>
      {cameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md flex flex-col items-center">
            {imageSrc ? (
              <>
                <img src={imageSrc} alt="Captured" className="w-full h-auto" />

              </>
            ) : (
              <video id="camera" ref={webcamRef} className="w-full h-auto"></video>
            )}
            <div>
              <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleCapture}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />
              <button
                onClick={handleUploadButtonClick}
                className="mt-2 bg-yellow-500 text-white p-2 min-w-30 mr-2 rounded-md"
              >
                <MdCloudUpload />
              </button>
              {!imageSrc && (
                <button
                  onClick={handleCamera}
                  className="mt-2 bg-green-500 text-white p-2 min-w-30 mr-2 rounded-md"
                >
                  <MdPhotoCamera />
                </button>
              )}

              {imageSrc && (
                <button
                  onClick={() => {
                    setImageSrc(null);
                    handleCloseCamera();
                    setTimeout(handleCameraClick, 100);
                  }}
                  className="mt-2 bg-blue-500 text-white p-2 min-w-30 mr-2 rounded-md"
                >
                  <MdReplay />
                </button>
              )}

              <button onClick={handleCloseCamera} className="mt-2 bg-red-500 text-white p-2 min-w-30 rounded-md"><MdClose /></button>
            </div>
          </div>
        </div>
      )}

      <div>
        {session?.user ? (
          <>
            <Image
              src={session.user.image}
              alt="user"
              width={40}
              height={40}
              onClick={() => setProfileClick(!profileClick)}
              className="rounded-full cursor-pointer 
              hover:border-[2px] border-blue-500"
            />
            {profileClick ? <div className="absolute bg-white p-3
            shadow-md border-[1px] mt-2 z-30
            right-4 ">
              <h2 className="cursor-pointer
               hover:text-blue-500 hover:font-bold"
                onClick={() => signOut()}>Logout</h2>
            </div> : null}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default HeaderNavBar;
