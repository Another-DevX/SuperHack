import { SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { JsonRpcProvider } from 'ethers';
import { Wallet } from 'ethers';

const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");

const ATTESTATOR_SIGNER_PRIVATE_KEY =
  "e58aa0579165d19d30699c2572106d502aa5225c65023fcb0165acd3818b0268";
const signer = new Wallet(ATTESTATOR_SIGNER_PRIVATE_KEY, provider);

const schemaRegistry = new SchemaRegistry(
  "0x4200000000000000000000000000000000000020"
); //Testnet Base Sepolia


const registrationSchema = "address user, uint256 hypercertID";
const checkoutSchema = " address user,uint256 hypercertID, uint16 hostRate";
const hostReviewSchema = "uint256 hypercertID,(uint16 stars,address user)[]";

const RegistrationContract = "0x4bDd8DF9653A2aDB7309c5297F0c4318A2E8e403";
const CheckoutContract = "0x7e77e6f24faf45315512A6997BeDB7E5948077C1";
const HostReviewResolver = "0xB9A0B213cd8C6E9f97056bb509736162e1e4e005";

const registerSchema = async (schema :string, revocable :boolean, name: string, resolverAddress: string) => {
  schemaRegistry.connect(signer);
  const transaction = await schemaRegistry.register({
    schema,
    resolverAddress,
    revocable,
  });

  let res = await transaction.wait();
  console.log(name + ": " +  res);
};

async function main() {
  await registerSchema(registrationSchema, true, "RegistrationSchema", RegistrationContract);
  await registerSchema(checkoutSchema, false,"CheckoutSchema", CheckoutContract);
  await registerSchema(hostReviewSchema, false,"HostReviewSchema", HostReviewResolver);
}

main();
/*RegistrationSchema: 0x1df8c9e0dd9db5399c10671b1e6fa955ed6b02acd0626171517f22651cc77b49
CheckoutSchema: 0x9773edf40273e0f916d8bc566b9dedf82e9b3f1caf9b5824081b20f0dc3aabfc
HostReviewSchema: 0x57e9642c4ed205c644d799388086fb2d45107d700d9b895682e630ecf2af1191c*/