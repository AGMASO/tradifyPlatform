const ethers = require("ethers");
import { abi, abiTradify } from "../../../constants/index";
require("dotenv").config();
const { config } = require("dotenv");

export default async function createOffer(_nftAddress, _price, _tokenId) {
  console.log("We are in script createOffer");

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Request access to the MetaMask account
    await window.ethereum.send("eth_requestAccounts");
    // Get the signer's address
    const signerAddress = (await provider.listAccounts())[0];
    console.log(signerAddress);

    // Create an instance of the signer using the provider and signer's address
    const signer = provider.getSigner(signerAddress);
    console.log(signer);

    console.log("estoy trabajando");

    const addressContract = "<YOUR ADDRESS Tradify_Platform>";

    const bm3_3er = new ethers.Contract(_nftAddress, abi, signer);
    const tradify = new ethers.Contract(addressContract, abiTradify, signer);

    const tokenIdUint = parseInt(_tokenId, 10);
    // Convert the value to the appropriate format for Ethereum (wei)
    const priceInWei = ethers.utils.parseEther(_price);
    console.log(priceInWei);

    const tx = await tradify.createOffer(_nftAddress, priceInWei, _tokenId);
    // Wait for the second
    await tx.wait();

    console.log("success to create Offer for that Car");
  } catch (error) {
    console.error("Error creating Offer:", error);
  }
}
