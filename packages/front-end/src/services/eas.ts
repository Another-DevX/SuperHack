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
  "0x4b287d3f18ab895b1f7cd80fe72c304a9463015fcdcce0bde5502a0ad4b52472";
const CheckoutSchema =
  "0x7be7f7a4013f1186414398496012e2781b26cb42ae1c9ca018d6ec9b788d8814";
const HostReviewSchema =
  "0x51fad90fd41712934c205ff4fe1abe79c6563ee1993bce6c2ef38492ce534c4a";

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
