import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { JsonRpcProvider } from 'ethers';
import { Wallet } from 'ethers';

const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");

const ATTESTATOR_SIGNER_PRIVATE_KEY =
  "e58aa0579165d19d30699c2572106d502aa5225c65023fcb0165acd3818b0268";
const signer = new Wallet(ATTESTATOR_SIGNER_PRIVATE_KEY, provider);

const schemaRegistry = new SchemaRegistry(
  "0x4200000000000000000000000000000000000021"
); //Testnet Base Sepolia
const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26

const registrationSchema = "address user, uint256 hypercertID";
const checkoutSchema = " address user,uint256 hypercertID, uint16 hostRate";
const hostReviewSchema = "uint256 hypercertID,(uint16 stars,address user)[]";

const registerSchema = async (schema, revocable) => {
  schemaRegistry.connect(signer);
  const transaction = await schemaRegistry.register({
    schema,
    resolverAddress,
    revocable,
  });

  await transaction.wait();
};

async function main() {
  await registerSchema(registrationSchema, true);
  await registerSchema(checkoutSchema, false);
  await registerSchema(hostReviewSchema, false);
}

main();
