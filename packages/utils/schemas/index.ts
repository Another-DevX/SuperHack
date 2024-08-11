import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { JsonRpcProvider } from "ethers";
import { Wallet } from "ethers";

const provider = new JsonRpcProvider("https://rpc.ankr.com/base_sepolia");

const ATTESTATOR_SIGNER_PRIVATE_KEY =
  "e58aa0579165d19d30699c2572106d502aa5225c65023fcb0165acd3818b0268";
const signer = new Wallet(ATTESTATOR_SIGNER_PRIVATE_KEY, provider);

const schemaRegistry = new SchemaRegistry(
  "0x4200000000000000000000000000000000000020",
); //Testnet Base Sepolia

const registrationSchema = "address user, uint256 hypercertID";
const checkoutSchema = " address user,uint256 hypercertID, uint16 hostRate";
const hostReviewSchema =
  "uint256 hypercertID,(uint16 stars,address user)[] reviews";

const RegistrationContract = "0xa684d2037F5Ac305E8293933535309aE98A9149A";
const CheckoutContract = "0x9ac3b971bb4ce65c9583F14e7F016D65757A3F3d";
const HostReviewResolver = "0xE3467AeC1c2bC406cadf363D94f829C9D4371655";

const registerSchema = async (
  schema: string,
  revocable: boolean,
  name: string,
  resolverAddress: string,
) => {
  schemaRegistry.connect(signer);
  const transaction = await schemaRegistry.register({
    schema,
    resolverAddress,
    revocable,
  });

  let res = await transaction.wait();
  console.log(name + ": " + res);
};

async function main() {
  await registerSchema(
    registrationSchema,
    true,
    "RegistrationSchema",
    RegistrationContract,
  );
  await registerSchema(
    checkoutSchema,
    false,
    "CheckoutSchema",
    CheckoutContract,
  );
  await registerSchema(
    hostReviewSchema,
    false,
    "HostReviewSchema",
    HostReviewResolver,
  );
}

main();
/*

RegistrationSchema: 0x3539dce80f1ead6893317037ff2ad4dc67ea032e5d65e1ee6afd0a3b21d6ccd3
CheckoutSchema: 0x14f0592c71ea5076831b062ffa1eeb8e019edaea6b06a38c723e764197ac9757
HostReviewSchema: 0xf6c5b8abb35f1ff4399a8ccf2c2fde1a88f460cf9f255a269b176c92ec789a19

*/

