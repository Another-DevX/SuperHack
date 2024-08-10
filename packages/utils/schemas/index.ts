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
  await registerSchema(registrationSchema, true, "RegistrationSchema", "0x45d05d80f6A9C4d686877253b802f2B0bb840082");
  await registerSchema(checkoutSchema, false,"CheckoutSchema", "0xBacFc9E5Cb60C716f5630387dBd5772da6c89943");
  await registerSchema(hostReviewSchema, false,"HostReviewSchema", "");
}

main();
