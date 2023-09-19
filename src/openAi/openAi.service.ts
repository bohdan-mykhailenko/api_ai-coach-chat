import { Injectable } from '@nestjs/common';
import { API_KEY } from 'src/const';
import OpenAI from 'openai'; // or 'import * as OpenAI from 'openai';' if needed

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: API_KEY,
    });
  }

  async generateUserStory(userStoryInput: string): Promise<string> {
    try {
      const prompt = `Generate a user story: "${userStoryInput}"`;
      const response = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful Agile Coach.', // Set the role and content of the AI Coach
          },
          {
            role: 'user',
            content: `Generate a user story: ${prompt}`, // The user's request for a user story
          },
          {
            role: 'assistant',
            content:
              'As a project manager, I want to assign tasks to team members so that I can track progress.', // The generated user story will be placed here
          },
          {
            role: 'user',
            content:
              'What are some best practices for conducting effective sprint planning meetings in Agile?', // The user's request for advice
          },
          {
            role: 'assistant',
            content: '', // The generated advice based on Agile principles will be placed here
          },
        ],
        max_tokens: 500, // Adjust the max_tokens as needed for response length
        model: 'gpt-3.5-turbo', // Specify the model name
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while generating a user story');
    }
  }
}
