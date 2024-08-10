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
  "0xee95ef2317e2045c7e84dc58c9772178e5302971c52c46abbf17c333b2281240";
const CheckoutSchema =
  "0x85d37d4ed2e6d589c271b136b0f779e9208a7a2a6c57165c88554d3bbd807268";
const HostReviewSchema =
  "0xc2d9966087f3968ba1a39713388eb89ded047ff2d3cb86701bce52cf536a52ea";

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
  user: string,
  hypercertId: number,
  recipient: string,
  reviews: { stars: number; user: string }[],
) {
  const eas = new EAS("0x4200000000000000000000000000000000000021");
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
  return newAttestationUID;
}
