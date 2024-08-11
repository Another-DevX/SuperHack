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

const RegistrationContract = "0x19a685CcAfcfE70102B69F91C1928D2801E8f1aC";
const CheckoutContract = "0x7Ef76eF7Cb84A852cD7f672B4b3dbc568b20cE0A";
const HostReviewResolver = "0xcCF95BFFF3F9185400cd16135d2f92604160A494";

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
RegistrationSchema: 0x4b287d3f18ab895b1f7cd80fe72c304a9463015fcdcce0bde5502a0ad4b52472
CheckoutSchema: 0x7be7f7a4013f1186414398496012e2781b26cb42ae1c9ca018d6ec9b788d8814
HostReviewSchema: 0x51fad90fd41712934c205ff4fe1abe79c6563ee1993bce6c2ef38492ce534c4a

*/

