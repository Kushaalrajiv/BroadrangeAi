import React, { useEffect, useState } from "react";
import "./App.css";
import { ethers } from 'ethers';
import contractABI from "./utils/contractABI.json";
import { networks } from './utils/networks';

const CONTRACT_ADDRESS = "0x312F15F2444fB94c9aE0a979ad2008a53977094a";
const App = () => {
  const [network, setNetwork] = useState('');
  const [currentAccount, setCurrentAccount] = useState("");
  const [tranhash, settranhash] = useState("");
  const [trandate, settrandate] = useState("");
  const [compliance, setCompliance] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [summaryText, setSummaryText] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask!');
      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
    }

     const chainId = await ethereum.request({ method: 'eth_chainId' });
     setNetwork(networks[chainId]);
 
     ethereum.on('chainChanged', handleChainChanged);
     
  
     function handleChainChanged(_chainId) {
       window.location.reload();
     }
  };
  const fetchLatestEntries = async () => {
    try {
      const response = await fetch('http://localhost:3002/latestEntries');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching latest entries:', error);
      return null;
    }
  };

  const returnStruct = async () => {
    try {
      console.log("Hello");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
  
        const latestEntries = await fetchLatestEntries();
        console.log(1);
        if (latestEntries && latestEntries.length > 0) {
          console.log(2);
          const { company_name,id, ComplianceStatus, SummaryText } = latestEntries[0];
          console.log(3);
          const tx = await contract.addCompanies([id.toString()], [company_name], [ComplianceStatus], [SummaryText]);
          console.log(4);
          const receipt = await tx.wait();
          console.log("Called addCompanies successfully!");
          console.log(receipt);
          console.log(receipt.transactionHash);
          settranhash(receipt.transactionHash);
  
          const block = await provider.getBlock(receipt.blockNumber);
          const timestamp = new Date(block.timestamp * 1000);
          settrandate(timestamp.toString());
  
          getComplianceStatus();
        }
      }
    } catch (error) {
      console.error("Error calling:", error);
    }
  };
  const getComplianceStatus = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, provider);

        const companies = await contract.returnData();
        const length=companies.length-1;
        if (companies && companies.length > 0) {
          
          const firstCompany = companies[length];
          setCompliance(firstCompany.company_status);
          setCompanyName(firstCompany.company_name);
          setSummaryText(firstCompany.summary_text);
        }
      }
    } catch (error) {
      console.error("Error getting compliance status:", error);
    }
  };


  useEffect(() => {
    checkIfWalletIsConnected();
    // getComplianceStatus();
  }, []);

  return (
    <div className="App">
    <h1>Deploy the Compliance Status to Blockchain</h1>
    <h4>Account Address:{currentAccount}</h4>
    <h4>Contract Address: {CONTRACT_ADDRESS}</h4>
      <header className="App-header">
        <button onClick={connectWallet} id="button1">Connect</button>
        <button onClick={returnStruct} id="button2">Deployyy</button>
      </header>
      <p>Transaction Hash: {tranhash}</p>
      <p>Transaction Date: {trandate}</p>
      <h3>Company Name : {companyName}</h3>
      <h3>Company Status: {compliance}</h3>
      <h3>Summary Text: {summaryText}</h3>
    </div>
  );
};
export default App;
