import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { JsonRpcProvider } from "ethers";
import { Wallet } from "ethers";

const provider = new JsonRpcProvider("https://rpc.ankr.com/celo");

const ATTESTATOR_SIGNER_PRIVATE_KEY =
  "PRIVATE_KEY";
const signer = new Wallet(ATTESTATOR_SIGNER_PRIVATE_KEY, provider);

const schemaRegistry = new SchemaRegistry(
  "0x5ece93bE4BDCF293Ed61FA78698B594F2135AF34",
); //Testnet Base Sepolia

const registrationSchema = "address user, uint256 hypercertID";
const checkoutSchema = " address user,uint256 hypercertID, uint16 hostRate";
const hostReviewSchema =
  "uint256 hypercertID,(uint16 stars,address user)[] reviews";

const RegistrationContract = "0x716939517706d422e3fCe3AacF16F1BEe08869c8";
const CheckoutContract = "0x4375E936bab7d8674206849c0598de2B4C7DB780";
const HostReviewResolver = "0xEAF0DD8e96cfD1c0511AC811888cb5B92A464F5c";

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

