import React, { useEffect, useState } from "react";
import Web3 from "web3";
import CrimeRecords from "./contracts/CrimeRecords.json";

import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [crimes, setCrimes] = useState([]);

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

  return (
    <div className="container mt-5">
      <h2>Crime List</h2>
      <ul className="list-group mt-3">
        {crimes.map((crime, index) => (
          <li key={index} className="list-group-item">
            <p>Criminal: {crime[0]}</p>
            <p>Location: {crime[1]}</p>
            <p>Crime: {crime[2]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
