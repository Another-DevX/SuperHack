export async function attestSignOut(
    signer: TransactionSigner,
    attestationId: string
  ) {
    const eas = new EAS("0x4200000000000000000000000000000000000021");
    eas.connect(signer);
  
    const transaction = await eas.revoke({
      schema: RegistrationSchema,
      data: { uid: attestationId },
    });
  
    await transaction.wait();
  }