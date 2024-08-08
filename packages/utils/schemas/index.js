import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';


const schemaRegistry = new SchemaRegistry("0x4200000000000000000000000000000000000021");//Testnet Base Sepolia

schemaRegistry.connect(signer);

const schema = "address user, uint256 hypercertID";
const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
const revocable = true;

const transaction = await schemaRegistry.register({
  schema,
  resolverAddress,
  revocable,
});

// Optional: Wait for transaction to be validated
await transaction.wait();