import { formatHypercertData } from "@hypercerts-org/sdk";
export async function uploadHypercertMetadata() {
  const {
    data: metadata,
    valid,
    errors,
  } = formatHypercertData({
    contributors: [],
    description: "This is a Hypercert",
    name: "Hypercert Realize IT",
    excludedImpactScope: [],
    excludedRights: [],
    image: "https://hypercerts.org/logo.png",
    rights: [],
    version: "1.0.0",
    workTimeframeStart: 1693622400,
    workTimeframeEnd: 1696290800,
    impactTimeframeEnd: 1696290800,
    impactTimeframeStart: 1693622400,
    impactScope: [],
    workScope: [],
    excludedWorkScope: [],
    external_url: "https://hypercerts.org",
    properties: [
      {
        trait_type: "string",
        value: "Hello",
      },
    ],
  });

  // Check on errors
  console.debug({ valid, body: JSON.stringify(metadata) });
  if (!valid) {
    return console.error(errors);
  }
  const response = await fetch(
    "https://staging-api.hypercerts.org/v1/metadata",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegura que el servidor sepa que estás enviando JSON
      },
      body: JSON.stringify({
        // Convierte el objeto JavaScript en un JSON string
        metadata: metadata,
      }),
    },
  );

  const result = await response.json();
  return result;
}
