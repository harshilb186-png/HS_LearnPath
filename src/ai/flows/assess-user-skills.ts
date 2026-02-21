'use server';
/**
 * @fileOverview An AI-powered tool to assess user skills against a chosen career path and suggest areas for improvement.
 *
 * - assessUserSkills - A function that handles the skill assessment process.
 * - AssessUserSkillsInput - The input type for the assessUserSkills function.
 * - AssessUserSkillsOutput - The return type for the assessUserSkills function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AssessUserSkillsInputSchema = z.object({
  currentSkills: z.string().describe("A detailed description of the user's current skills, experience, and qualifications."),
  careerPath: z.string().describe("The user's desired career path, including the role and industry."),
});
export type AssessUserSkillsInput = z.infer<typeof AssessUserSkillsInputSchema>;

// Output Schema
const AssessUserSkillsOutputSchema = z.object({
  overallAssessment: z.string().describe("A comprehensive assessment of the user's current skills and how well they align with the chosen career path."),
  skillGaps: z.array(z.object({
    skillName: z.string().describe("The name of the skill that is a gap."),
    description: z.string().describe("A brief description of why this skill is a gap for the desired career path."),
    suggestions: z.array(z.string()).describe("A list of concrete, actionable suggestions for how the user can improve or acquire this skill."),
  })).describe("A list of specific skill gaps identified, along with detailed descriptions and actionable improvement suggestions for each."),
});
export type AssessUserSkillsOutput = z.infer<typeof AssessUserSkillsOutputSchema>;

export async function assessUserSkills(input: AssessUserSkillsInput): Promise<AssessUserSkillsOutput> {
  return assessUserSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessUserSkillsPrompt',
  input: { schema: AssessUserSkillsInputSchema },
  output: { schema: AssessUserSkillsOutputSchema },
  prompt: `You are an AI-powered career coach and skill assessment expert. Your task is to evaluate a user's current skills against their desired career path and provide a clear assessment, identify specific skill gaps, and offer actionable suggestions for improvement.

Current User Skills:
{{{currentSkills}}}

Desired Career Path:
{{{careerPath}}}

Please provide:
1.  An 'overallAssessment' of how well the user's current skills align with their desired career path. Be thorough and analytical.
2.  A 'skillGaps' array. For each identified gap:
    *   Provide the 'skillName' (e.g., "Data Structures and Algorithms", "Cloud Architecture", "Project Management").
    *   Describe why this 'description' is a gap for the specific career path.
    *   List specific, actionable 'suggestions' for how the user can acquire or improve this skill (e.g., "Complete an online course on Coursera: 'Algorithms Part I'", "Build a small project using AWS Lambda and S3", "Read 'The Phoenix Project'").

Ensure your response is directly parsable into the specified JSON schema.`,
});

const assessUserSkillsFlow = ai.defineFlow(
  {
    name: 'assessUserSkillsFlow',
    inputSchema: AssessUserSkillsInputSchema,
    outputSchema: AssessUserSkillsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
