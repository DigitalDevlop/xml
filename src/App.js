import React, { useState } from 'react';
import Beem from './beams.jpg';
import Logo from './Green Leaves Line Logo (1).gif';

function VASTGenerator() {
  const [videoLink, setVideoLink] = useState('');
  const [name, setName] = useState('');
  const [AdTitle, setAdTitle] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;
  const generateEndpoint = process.env.REACT_APP_VAST_GENERATE_ENDPOINT;
  const vastXMLEndpoint = process.env.REACT_APP_VAST_XML_ENDPOINT;


  const handleGenerateVAST = async () => {
    if (!videoLink || !name || !AdTitle) {
      setErrorMsg('Please fill in all fields');
      setResponseMsg(''); // Reset responseMsg
      return;
    }

    try {
      const response = await fetch(`${apiUrl}${generateEndpoint}?videoLink=${videoLink}&name=${name}&adtitle=${AdTitle}`, {
        method: 'POST',
      });

      if (response.ok) {
        setResponseMsg(`${apiUrl}${vastXMLEndpoint}/${name}.xml`);
        setErrorMsg(''); // Reset errorMsg
      } else {
        const errorMessage = await response.text();
        setResponseMsg(`Error: ${errorMessage}`);
        setErrorMsg(''); // Reset errorMsg
      }
    } catch (error) {
      setResponseMsg('Error generating VAST');
      setErrorMsg(''); // Reset errorMsg
      console.error('Error generating VAST:', error);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <img src={Beem} alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <img src={Logo} className="" alt="Tailwind Play" />



        <input
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Ad Campaign Name"
          value={AdTitle}
          onChange={(e) => setAdTitle(e.target.value)}
        />

        <input
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="File Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Reviev Adstudio  Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        {errorMsg && (
          <div className="bg-red-200 rounded-lg p-4  mb-2">
            <p className="text-sm text-red-800 font-semibold text-center">{errorMsg}</p>
          </div>
        )}
        <button
          className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block"
          onClick={handleGenerateVAST}
        >
          Generate VAST
        </button>


        {responseMsg && (
          <div className="bg-green-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-green-800 font-semibold text-center">{responseMsg}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VASTGenerator;
