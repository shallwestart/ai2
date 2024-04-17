// /app/api/create-story/route.js
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  const { character, animal, style } = await req.json();

  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        width: 768,
        height: 768,
        prompt: `An astronaut riding a rainbow unicorn, cinematic, dramatic. In the style of ${style}`,
        refine: "expert_ensemble_refiner",
        scheduler: "K_EULER",
        lora_scale: 0.6,
        num_outputs: 1,
        guidance_scale: 7.5,
        apply_watermark: false,
        high_noise_frac: 0.8,
        negative_prompt: "",
        prompt_strength: 0.8,
        num_inference_steps: 25
      }
    }
  );
  console.log(output);
  
  return Response.json({
    status: "ok",
    answer:output[0],
  });


}
