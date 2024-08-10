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

const RegistrationContract = "0xc4E3aDDF2eB8bCC3E3b8C890f4654Dc23d7452e4";
const CheckoutContract = "0xdBF0E0d86ba089c5A7309E891c03a7b20F59b4a0";
const HostReviewResolver = "0xeA1e63B205efaefA60Dc66314ea926CdF584C066";

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

RegistrationSchema: 0xee95ef2317e2045c7e84dc58c9772178e5302971c52c46abbf17c333b2281240
CheckoutSchema: 0x85d37d4ed2e6d589c271b136b0f779e9208a7a2a6c57165c88554d3bbd807268
HostReviewSchema: 0xc2d9966087f3968ba1a39713388eb89ded047ff2d3cb86701bce52cf536a52ea

*/

