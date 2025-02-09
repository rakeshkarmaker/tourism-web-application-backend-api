
import { Controller, Post, Body, Get } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';

@Controller('gemini') // Define base route for your Gemini API endpoints
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('generate-text')
  async generateText(@Body('prompt') prompt: string): Promise<{ text: string }> {
    const generatedText = await this.geminiService.generateText(prompt);
    return { text: generatedText };
  }

  @Get('hello')
  getHello(): string {
    return "Hello Gemini!";
  }
}


// Postman url 