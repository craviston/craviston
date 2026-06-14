
'use server';
/**
 * @fileOverview An AI-powered 'CraveMatch' tool that suggests waffle or sandwich combinations
 * based on the user's current mood or flavor preferences.
 *
 * - craveMatch - A function that handles the personalized recommendation process.
 * - CraveMatchInput - The input type for the craveMatch function.
 * - CraveMatchOutput - The return type for the craveMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const CraveMatchInputSchema = z.object({
  mood: z
    .string()
    .describe('The user\'s current mood (e.g., "happy", "gloomy", "energetic").'),
  flavorPreferences: z
    .string()
    .describe(
      'The user\'s flavor preferences (e.g., "sweet", "spicy", "savory", "fruity").'
    ),
});
export type CraveMatchInput = z.infer<typeof CraveMatchInputSchema>;

// Output Schema
const CraveMatchOutputSchema = z.object({
  recommendedItem: z.object({
    name: z.string().describe('The name of the recommended waffle or sandwich.'),
    type: z.union([z.literal('Waffle'), z.literal('Sandwich')]).describe('The type of the recommended item.'),
  }).describe('The recommended food item.'),
  reasoning: z
    .string()
    .describe(
      'A brief explanation of why this item was recommended based on the user\'s mood and preferences.'
    ),
  suggestedPairing: z
    .string()
    .describe('A beverage or side dish that would pair well with the recommended item.'),
});
export type CraveMatchOutput = z.infer<typeof CraveMatchOutputSchema>;

// Wrapper function
export async function craveMatch(input: CraveMatchInput): Promise<CraveMatchOutput> {
  return craveMatchFlow(input);
}

// Prompt definition
const craveMatchPrompt = ai.definePrompt({
  name: 'craveMatchPrompt',
  input: {schema: CraveMatchInputSchema},
  output: {schema: CraveMatchOutputSchema},
  prompt: `You are Craviston's AI-powered 'CraveMatch' tool. Your goal is to recommend the perfect waffle or sandwich from our menu based on the user's mood and flavor preferences. You must choose one item from the list below.

Available Waffles:
- Belgian Milk Chocolate (Sweet, Classic, Comforting)
- Triple Chocolate (Indulgent, Rich, Sweet, Indulgent)
- Nutella Waffle (Sweet, Nutty, Hazelnut, Bestseller)
- Kit Kat Waffle (Sweet, Crunchy, Fun, Rich)

Available Sandwiches:
- Paneer Tikka Sandwich (Savory, Spicy, Bold, Indian fusion)
- Pizza Sandwich (Savory, Tangy, Cheesy, Loaded)
- Corn Cheese Grill (Savory, Sweet Corn, Creamy, Cheesy)
- Veg Cheese Grill (Savory, Classic, Fresh, Crunchy)

User's Mood: {{{mood}}}
User's Flavor Preferences: {{{flavorPreferences}}}

Based on the user's input, recommend a single item and explain your reasoning. Also suggest a suitable pairing like a Cold Coffee or a Hot Chocolate.`,
});

// Flow definition
const craveMatchFlow = ai.defineFlow(
  {
    name: 'craveMatchFlow',
    inputSchema: CraveMatchInputSchema,
    outputSchema: CraveMatchOutputSchema,
  },
  async input => {
    const {output} = await craveMatchPrompt(input);
    return output!;
  }
);
