import { HfInference } from '@huggingface/inference';
import env from '../config/env';

const inference = new HfInference(env.hugginFace.apiKey);
const model = 'deepseek-ai/DeepSeek-R1';

export function paraphrase(question: string) {
  return inference.textGeneration({ model: model, data: question });
}
