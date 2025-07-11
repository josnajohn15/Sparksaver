// src/utils/hfClassify.js

export async function classifyApplianceWithHF(file) {
  const apiKey = "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";
  const apiURL = "https://api-inference.huggingface.co/models/microsoft/resnet-50"; // Make sure this model supports inference

  // Convert File to Base64 string
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // only base64 part
      reader.onerror = (error) => reject(error);
    });

  try {
    const imageBase64 = await toBase64(file);

    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: imageBase64 }),
    });

    const raw = await response.text();
    console.log("Raw HuggingFace Response:", raw);

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status} - ${raw}`);
    }

    const result = JSON.parse(raw);

    if (!Array.isArray(result) || result.length === 0 || !result[0].label) {
      throw new Error("Unexpected response format or empty result from HF");
    }

    return {
      label: result[0].label,
      confidence: result[0].score,
    };
  } catch (error) {
    console.error("HF Classification Error:", error);
    throw error;
  }
}