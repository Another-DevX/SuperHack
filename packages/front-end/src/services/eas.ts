import {
  EAS,
  SchemaEncoder,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";

const registrationSchemaDefinition = "address user, uint256 hypercertID";
const checkoutSchemaDefinition =
  " address user,uint256 hypercertID, uint16 hostRate";
const hostReviewSchemaDefinition =
  "uint256 hypercertID,(uint16 stars,address user)[]";

const RegistrationContract = "0x6b097466783ec818785d194cF66942E764e67D4C";
const CheckoutContract = "0xad040f2565e1dA79278677Fcf7cf7C49E7b49e1E";
const HostReviewContract = "0x5c56b6Bcf8752054981220CE084c021594e13Ca3";

const RegistrationSchema =
  "0x1df8c9e0dd9db5399c10671b1e6fa955ed6b02acd0626171517f22651cc77b49";
const CheckoutSchema =
  "0x9773edf40273e0f916d8bc566b9dedf82e9b3f1caf9b5824081b20f0dc3aabfc";
const HostReviewSchema =
  "0x57e9642c4ed205c644d799388086fb2d45107d700d9b895682e630ecf2af1191c";

  
export async function  attestSignUp(
  signer: TransactionSigner,
  user: string,
  hypercertId: bigint,
  recipient: string
)  {
  const eas = new EAS(RegistrationContract);
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(registrationSchemaDefinition);
  const encodedData = schemaEncoder.encodeData([
    { name: "user", value: user, type: "address" },
    { name: "hypercertID", value: hypercertId, type: "uint256" },
  ]);

  const tx = await eas.attest({
    schema: RegistrationSchema,
    data: {
      recipient: recipient,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
  return newAttestationUID;
}

export async function attestSignOut(
  signer: TransactionSigner,
  attestationId: string
) {
  const eas = new EAS(RegistrationContract);
  eas.connect(signer);

  const transaction = await eas.revoke({
    schema: RegistrationSchema,
    data: { uid: attestationId },
  });

  await transaction.wait();
}

export async function attestCheckout(
  signer: TransactionSigner,
  user: string,
  hypercertId: number,
  recipient: string,
  hostRate: number
) {
  const eas = new EAS(CheckoutContract);
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(checkoutSchemaDefinition);
  const encodedData = schemaEncoder.encodeData([
    { name: "user", value: user, type: "address" },
    { name: "hypercertID", value: hypercertId, type: "uint256" },
    { name: "hostRate", value: hostRate, type: "uint16" },
  ]);

  const tx = await eas.attest({
    schema: CheckoutSchema,
    data: {
      recipient: recipient,
      revocable: false, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
}

export async function attestHostReview(
  signer: TransactionSigner,
  user: string,
  hypercertId: number,
  recipient: string,
  reviews: { stars: number; user: string }[]
) {
  const eas = new EAS(HostReviewContract);
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(hostReviewSchemaDefinition);
  const encodedData = schemaEncoder.encodeData([
    { name: "user", value: user, type: "address" },
    { name: "hypercertID", value: hypercertId, type: "uint256" },
    { name: "reviews", value: reviews, type: "(uint16 stars,address user)[]" },
  ]);

  const tx = await eas.attest({
    schema: HostReviewSchema,
    data: {
      recipient: recipient,
      revocable: false, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
}
