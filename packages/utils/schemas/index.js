const { SchemaRegistry } = require("@ethereum-attestation-service/eas-sdk");
const JSON_RPC_PROVIDER="https://rpc.ankr.com/base_sepolia";
const provider = new JsonRpcProvider(JSON_RPC_PROVIDER);
const signer= new Wallet(ATTESTATOR_SIGNER_PRIVATE_KEY, provider);

const schemaRegistry = new SchemaRegistry("0x4200000000000000000000000000000000000021");//Testnet Base Sepolia
const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26

const registrationSchema = "address user, uint256 hypercertID";
const checkoutSchema = " address user,uint256 hypercertID, uint16 hostRate";
const hostReviewSchema = "uint256 hypercertID, (uint16 stars,address user)[]";


const registerSchema = async ( schema,revocable )=> {
  
  schemaRegistry.connect(signer);
  const transaction = await schemaRegistry.register({
      schema,
      resolverAddress,
      revocable,
    });
    
    await transaction.wait();

};

async function main(){
  await registerSchema(registrationSchema,true);
  await registerSchema(checkoutSchema, false);
  await registerSchema(registrationSchema,false);
};



main();