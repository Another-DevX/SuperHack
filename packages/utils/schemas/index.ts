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

const RegistrationContract = "0x6b097466783ec818785d194cF66942E764e67D4C";
const CheckoutContract = "0xad040f2565e1dA79278677Fcf7cf7C49E7b49e1E";
const HostReviewResolver = "0x5c56b6Bcf8752054981220CE084c021594e13Ca3";

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
/*RegistrationSchema: 0xe4b131099876d653b5390d2f9e1d4b307dc4b9053e160b04e2e5d79a2783407e
CheckoutSchema: 0xb0c31c19cbe2d5aec1bbee13950c04f4949d6797fef3b40b3c1c17d3036b7683
HostReviewSchema: 0xc717944d04dd49d2fd74d9cbee4ee1b34497aee24175882df4e5a0b3c6ae427c*/