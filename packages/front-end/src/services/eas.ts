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
  "0xe4b131099876d653b5390d2f9e1d4b307dc4b9053e160b04e2e5d79a2783407e";
const CheckoutSchema =
  "0xb0c31c19cbe2d5aec1bbee13950c04f4949d6797fef3b40b3c1c17d3036b7683";
const HostReviewSchema =
  "0xc717944d04dd49d2fd74d9cbee4ee1b34497aee24175882df4e5a0b3c6ae427c";

export async function attestSignUp(
  signer: TransactionSigner,
  user: string,
  hypercertId: number,
  recipient: string
) {
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
