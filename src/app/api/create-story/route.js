// /app/api/create-story/route.js
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {

  const { name, age, topic } = await req.json();

  const input = {
    top_k: 50,
    top_p: 0.9,
    prompt: `Write a very short bedtime story about ${topic} for my ${age} years-old daughter named ${name}.`,
    temperature: 0.2,
    max_new_tokens: 1024,
    prompt_template: "<s>[INST] {prompt} [/INST] ",
    presence_penalty: 0,
    frequency_penalty: 0
  };

  let answer = "";
  for await (const event of replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
    answer += event.toString();
    console.log(answer);
    process.stdout.write(event.toString());
  };

  const output = await replicate.run(
    "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
    {
      input: {
        width: 768,
        height: 768,
        prompt: answer,
        scheduler: "K_EULER",
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 50
      }
    }
  );
  console.log(output);


  return Response.json({
    status: "ok",
    answer,
    output
  });


}
