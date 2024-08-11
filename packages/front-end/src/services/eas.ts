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
  "0x6a120ae227dfaccbcdbdf882584acf6de5ff9c93d87918c93c1982425fdb32ed";
const CheckoutSchema =
  "0x7a974122faf2294abc354bea7fd8e01a0b2f700262e828228a2ec8f226ba26d2";
const HostReviewSchema =
  "0xe51eee49680da48f65e67df6f1137b87380201e3c9a4a4a204fd4610fb596e5f";

export async function attestSignUp(
  signer: TransactionSigner,
  user: string,
  hypercertId: string,
  recipient: string,
) {
  const eas = new EAS("0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92");
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
  const eas = new EAS("0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92");
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
  const eas = new EAS("0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92");
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
  const eas = new EAS("0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92");
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
