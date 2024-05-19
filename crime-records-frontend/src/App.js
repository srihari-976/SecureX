import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CrimeRecords from "./contracts/CrimeRecords.json";
import Navbar from "./Navbar";
import Login from "./login";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [crimes, setCrimes] = useState([]);
  const [criminalName, setCriminalName] = useState("");
  const [location, setLocation] = useState("");
  const [crime, setCrime] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [loginType, setLoginType] = useState(""); // 'admin' or 'public'
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const networkId = await web3.eth.net.getId();
          const deployedNetwork = CrimeRecords.networks[networkId];
          if (deployedNetwork) {
            const instance = new web3.eth.Contract(
              CrimeRecords.abi,
              deployedNetwork && deployedNetwork.address
            );
            setContract(instance);

            const count = await instance.methods.getCrimesCount().call();
            const crimes = [];
            for (let i = 0; i < count; i++) {
              const crime = await instance.methods.getCrime(i).call();
              crimes.push(crime);
            }
            setCrimes(crimes);
          } else {
            console.error("Contract not deployed to the current network.");
          }
        } catch (error) {
          console.error(
            "User denied account access or another error occurred:",
            error
          );
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CrimeRecords.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(
            CrimeRecords.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(instance);

          const count = await instance.methods.getCrimesCount().call();
          const crimes = [];
          for (let i = 0; i < count; i++) {
            const crime = await instance.methods.getCrime(i).call();
            crimes.push(crime);
          }
          setCrimes(crimes);
        } else {
          console.error("Contract not deployed to the current network.");
        }
      } else {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    init();
  }, []);

  const handleAddCrime = async () => {
    if (!contract) {
      console.error("Contract is not loaded.");
      return;
    }

    try {
      await contract.methods
        .addCrime(criminalName, location, crime)
        .send({ from: account });
      const newCrime = await contract.methods
        .getCrime((await contract.methods.getCrimesCount().call()) - 1)
        .call();
      setCrimes([...crimes, newCrime]);
    } catch (error) {
      console.error("Error adding crime:", error);
    }
  };

  const handleLoginType = (type) => {
    setShowLogin(true);
    setLoginType(type);
  };

  const handleShowDetails = (crime) => {
    setSelectedCrime(crime);
    setShowDetails(true);
  };

  const handleHideDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <Navbar onLoginType={handleLoginType} />
      {showLogin && <Login />}
      {contract && !showLogin && (
        <div className="container mt-5">
          <h2>Crime List</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCrime();
            }}
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Criminal Name"
                value={criminalName}
                onChange={(e) => setCriminalName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Crime"
                value={crime}
                onChange={(e) => setCrime(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Crime
            </button>
          </form>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => handleShowDetails(crime)}
          ></button>
          {showDetails && selectedCrime && (
            <div className="container mt-5">
              <h2>Crime Details</h2>
              <div>
                <p>Criminal: {selectedCrime[0]}</p>
                <p>Location: {selectedCrime[1]}</p>
                <p>Crime: {selectedCrime[2]}</p>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleHideDetails}
              >
                Hide Details
              </button>
            </div>
          )}
          <ul className="list-group mt-3">
            {crimes.map((crime, index) => (
              <li key={index} className="list-group-item custom-list-item">
                <p>Criminal: {crime[0]}</p>
                <p>Location: {crime[1]}</p>
                <p>Crime: {crime[2]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default App;
