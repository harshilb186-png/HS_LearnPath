'use server';
/**
 * @fileOverview A Genkit flow for summarizing learning module content.
 *
 * - summarizeModuleContent - A function that generates a summary of provided content.
 * - SummarizeModuleContentInput - The input type for the summarizeModuleContent function.
 * - SummarizeModuleContentOutput - The return type for the summarizeModuleContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeModuleContentInputSchema = z.object({
  content: z.string().describe('The full text content of the learning module or GitHub repository content.'),
});
export type SummarizeModuleContentInput = z.infer<typeof SummarizeModuleContentInputSchema>;

const SummarizeModuleContentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the provided content, highlighting key learning points.'),
});
export type SummarizeModuleContentOutput = z.infer<typeof SummarizeModuleContentOutputSchema>;

export async function summarizeModuleContent(input: SummarizeModuleContentInput): Promise<SummarizeModuleContentOutput> {
  return summarizeModuleContentFlow(input);
}

const summarizeModulePrompt = ai.definePrompt({
  name: 'summarizeModulePrompt',
  input: {schema: SummarizeModuleContentInputSchema},
  output: {schema: SummarizeModuleContentOutputSchema},
  prompt: `You are an expert educational assistant. Your task is to provide a concise summary of the following learning module content.
Focus on highlighting the key concepts and most important learning points, making it easy for a user to quickly grasp the core information and decide if they need to read the full content.

Content to summarize:
---
{{{content}}}
---`,
});

const summarizeModuleContentFlow = ai.defineFlow(
  {
    name: 'summarizeModuleContentFlow',
    inputSchema: SummarizeModuleContentInputSchema,
    outputSchema: SummarizeModuleContentOutputSchema,
  },
  async (input) => {
    const {output} = await summarizeModulePrompt(input);
    return output!;
  }
);
