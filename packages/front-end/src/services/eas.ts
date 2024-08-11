import {
  EAS,
  SchemaEncoder,
  TransactionSigner,
} from "@ethereum-attestation-service/eas-sdk";
import { ZeroHash } from "ethers";

const registrationSchemaDefinition = "address user, uint256 hypercertID";
const checkoutSchemaDefinition =
  "address user, uint256 hypercertID, uint16 hostRate";
const hostReviewSchemaDefinition =
  "uint256 hypercertID,(uint16 stars,address user)[]";

const RegistrationSchema =
  "0x3539dce80f1ead6893317037ff2ad4dc67ea032e5d65e1ee6afd0a3b21d6ccd3";
const CheckoutSchema =
  "0x14f0592c71ea5076831b062ffa1eeb8e019edaea6b06a38c723e764197ac9757";
const HostReviewSchema =
  "0xf6c5b8abb35f1ff4399a8ccf2c2fde1a88f460cf9f255a269b176c92ec789a19";

export async function attestSignUp(
  signer: TransactionSigner,
  user: string,
  hypercertId: string,
  recipient: string,
) {
  const eas = new EAS("0x4200000000000000000000000000000000000021");
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(registrationSchemaDefinition);
  const encodedData = schemaEncoder.encodeData([
    { name: "user", value: user, type: "address" },
    { name: "hypercertID", value: hypercertId, type: "uint256" },
  ]);
  console.debug({ user, hypercertId, recipient, encodedData });

  const tx = await eas.attest({
    schema: RegistrationSchema,
    data: {
      recipient: recipient,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
      expirationTime: BigInt(0),
      value: BigInt(0),
      refUID: ZeroHash,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
  return newAttestationUID;
}

export async function attestSignOut(
  signer: TransactionSigner,
  attestationId: string,
) {
  const eas = new EAS("0x4200000000000000000000000000000000000021");
  eas.connect(signer);

  const tx = await eas.revoke({
    schema: RegistrationSchema,
    data: { uid: attestationId },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
  return newAttestationUID;
}

export async function attestCheckout(
  signer: TransactionSigner,
  user: string,
  hypercertId: number,
  recipient: string,
  hostRate: number,
) {
  const eas = new EAS("0x4200000000000000000000000000000000000021");
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
      expirationTime: BigInt(0),
      value: BigInt(0),
      refUID: ZeroHash,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
  return newAttestationUID;
}

export async function attestHostReview(
  signer: TransactionSigner,
  hypercertId: number,
  recipient: string,
  reviews: { stars: number; user: string }[],
) {
  const eas = new EAS("0x4200000000000000000000000000000000000021");
  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(hostReviewSchemaDefinition);
  const encodedData = schemaEncoder.encodeData([
    { name: "hypercertID", value: hypercertId, type: "uint256" },
    { name: "reviews", value: reviews, type: "(uint16 stars,address user)[]" },
  ]);

  const tx = await eas.attest({
    schema: HostReviewSchema,
    data: {
      recipient: recipient,
      revocable: false, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
      expirationTime: BigInt(0),
      value: BigInt(0),
      refUID: ZeroHash,
    },
  });

  const newAttestationUID = await tx.wait();

  console.log("New attestation UID:", newAttestationUID);
  return newAttestationUID;
}
