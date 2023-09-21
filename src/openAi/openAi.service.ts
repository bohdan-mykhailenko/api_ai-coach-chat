import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../models/message.model'; // Import your Sequelize Message model
import { API_KEY } from 'src/const';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;

  constructor(
    @InjectModel(Message)
    private readonly messageModel: typeof Message, // Inject the Sequelize model
  ) {
    this.openai = new OpenAI({
      apiKey: API_KEY,
    });
  }

  async getAllMessages(): Promise<Message[]> {
    try {
      const messages = await Message.findAll();
      return messages;
    } catch (error) {
      throw new Error('Error fetching messages');
    }
  }

  async generateUserStory(
    userStoryInput: string,
  ): Promise<{ role: string; content: string }> {
    try {
      const prompt = `${userStoryInput}`;
      const response = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful Agile Coach.', // Set the role and content of the AI Coach
          },
          {
            role: 'user',
            content: `${prompt}`, // The user's request for a user story
          },
          {
            role: 'assistant',
            content:
              'As a project manager, I want to assign tasks to team members so that I can track progress.', // The generated user story will be placed here
          },
          {
            role: 'assistant',
            content: '', // The generated advice based on Agile principles will be placed here
          },
        ],
        max_tokens: 100, // Adjust the max_tokens as needed for response length
        model: 'gpt-3.5-turbo', // Specify the model name
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content,
      };

      return assistantMessage;
    } catch (error) {
      console.error(error);
      console.log(error);
      throw new Error('An error occurred while generating a user story');
    }
  }

  async postUserStory(
    userStoryInput: string,
  ): Promise<{ userMessage: any; assistantMessage: any }> {
    try {
      // Generate the user story using your generateUserStory method
      const generatedAssistantMessage =
        await this.generateUserStory(userStoryInput);

      // Create a new message record in the database for the user's message
      const userMessage = await this.messageModel.create({
        role: 'user',
        content: userStoryInput,
      });

      // Create a new message record in the database for the assistant's message
      const assistantMessage = await this.messageModel.create({
        role: 'assistant',
        content: generatedAssistantMessage.content,
      });

      return { userMessage, assistantMessage }; // Return both messages
    } catch (error) {
      console.error(error);
      console.log(error);
      throw new Error(
        'An error occurred while generating and saving the user story and message',
      );
    }
  }
}
