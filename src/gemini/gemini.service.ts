import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any; // GenerativeModel type from google-generativeai

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.getOrThrow('GOOGLE_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" }); // or "gemini-pro-vision" for multimodal
  }

  async generateText(prompt: string): Promise<string> {
    try {

    const mypromt = `Generate a highly detailed, engaging, and practical tour plan for ${prompt}.\\n\\nThe output MUST be in JSON format. \\u00A0Please carefully follow the JSON structure outlined below to ensure the response is easily parsable and integrates seamlessly with web applications.\\n\\nThe JSON response should contain the following top-level fields:\\n\\n* \\u00A0 \\"title\\": \\u00A0Create a compelling, concise, and informative title for the tour plan. This should be attention-grabbing and accurately reflect the tour's theme or destination. \\u00A0*(Example: \\"Unveiling Rajbari's Cultural Heritage: A 3-Day Tour\\")*\\n* \\u00A0 \\"description\\": \\u00A0Write a brief, enticing, and informative description of the tour plan. This should highlight the key attractions, experiences, and overall theme of the tour to pique user interest. Aim for 2-3 sentences. *(Example: \\"Embark on a 3-day journey through Rajbari, exploring its rich cultural tapestry. Discover historical landmarks, vibrant local crafts, and the region's unique traditions.\\")*\\n* \\u00A0 \\"duration\\": \\u00A0Clearly state the total duration of the tour. \\u00A0Use a format that is easy to understand (e.g., \\"3 Days\\", \\"Full Day Trip\\", \\"Weekend Getaway\\", \\"2 Days/1 Night\\").\\n* \\u00A0 \\"tour_plan_text\\": \\u00A0This is the core of the tour plan. \\u00A0Provide a meticulously structured, day-by-day itinerary in Markdown format. Each day's section must include:\\n\\u00A0 \\u00A0 * \\u00A0 **Day Heading:** \\u00A0Use clear and informative headings for each day (e.g., \\"## Day 1: Arrival and \\u09B0\\u09BE\\u099C\\u09AC\\u09BE\\u09DC\\u09C0 Town Exploration\\").\\n\\u00A0 \\u00A0 * \\u00A0 **Time Slots:** Organize each day into time-based slots (e.g., \\"**Morning:**\\", \\"**Afternoon:**\\", \\"**Evening:**\\").\\n\\u00A0 \\u00A0 * \\u00A0 **Specific Locations and Activities:** For each time slot, list specific places to visit and activities to undertake. Use the full and correct name of each location.\\n\\u00A0 \\u00A0 * \\u00A0 **Engaging Descriptions:** For each location or activity, provide a brief, enticing, and informative description to capture the user's interest and provide context. \\u00A0Focus on what makes each place special or worthwhile.\\n\\u00A0 \\u00A0 * \\u00A0 **Embedded Google Maps Hyperlinks:** \\u00A0Within the description of each location in the \\"tour_plan_text\\", embed a descriptive hyperlink that points directly to the Google Maps URL for that specific location. Use Markdown link format: \`[Descriptive Link Text](MAP_URL)\`. \\u00A0*(Example: \\u00A0\\"\[Explore \\u00A0Pancharatna Gobinda Mandir on Google Maps](https://www.google.com/url?sa=E&source=gmail&q=MAP_LINK_FOR_PANCHARATNA_GOBINDA_MANDIR)\\")*. **Ensure these are valid, working Google Maps URLs.**\\n\\u00A0 \\u00A0 * \\u00A0 **Practical Notes:** Include any relevant practical information or tips within each day's plan. This might include suggestions for transportation, recommended attire, best times to visit, or local customs to be aware of.\\n\\n* \\u00A0 \\"map_links\\": \\u00A0Create a JSON array named \\"\\\\"map_links\\\\"\\". This array should contain a JSON object for *every unique location* mentioned in the \\"\\\\"tour_plan_text\\\\"\\". \\u00A0Each object in the array must have these key-value pairs:\\n\\u00A0 \\u00A0 * \\u00A0 \\"location_name\\": \\u00A0The *exact* full name of the place as it appears in the \\"\\\\"tour_plan_text\\\\"\\". This must match precisely for easy referencing.\\n\\u00A0 \\u00A0 * \\u00A0 \\"map_url\\": \\u00A0A **valid, direct, and accurate Google Maps URL** for the corresponding \\"\\\\"location_name\\\\"\\". **Double-check that these URLs are functional and point to the correct places.**\\n\\n* \\u00A0 \\"overall_map_link\\": \\u00A0Provide a *single, valid Google Maps URL* in this field that, when opened, displays **all** the locations listed in the \\"\\\\"map_links\\\\"\\"" array on a single map. This provides a convenient overview of the entire tour route. \\u00A0If it is technically impossible to generate a single map link showing all locations, then set the value of \\"overall_map_link\\" to the string \\"\\\\"not_available\\\\"\\". \\u00A0Please prioritize creating this overall map link if feasible.\\n\\n**Important Instructions and Reminders:**\\n\\n* \\u00A0 **JSON Format is Mandatory:** The entire response *must* be valid JSON. \\u00A0Pay close attention to syntax (curly braces, square brackets, colons, commas, quotes).\\n* \\u00A0 **Accuracy of Map Data is Critical:** \\u00A0Ensure all \`map_url\` values in both \\"map_links\\" and \\"tour_plan_text\\" are valid, working Google Maps links that point to the correct locations. **Invalid or incorrect map links are unacceptable.**\\n* \\u00A0 **Markdown Formatting:** \\u00A0Use Markdown formatting for the \\"tour_plan_text\\" to enhance readability (headings, lists, bold text, hyperlinks).\\n* \\u00A0 **Completeness:** Ensure that *every location* mentioned in the \\"tour_plan_text\\" is also included in the \\"map_links\\" array with its corresponding \`map_url\`. \\n* \\u00A0 **User-Centric Design:** \\u00A0The tour plan should be designed to be helpful and engaging for someone actually planning to take this tour. \\u00A0Provide practical advice and enticing descriptions.\\n\\nBy following this detailed prompt, you should receive a JSON response that is well-structured, informative, and contains accurate map data, ready to be used in your web development project.`;

    const mypromt2 = `Generate a highly detailed, engaging, and practical tour plan for ${prompt}.

The output MUST be in JSON format. Please carefully follow the JSON structure outlined below to ensure the response is easily parsable and integrates seamlessly with web applications.

The JSON response should contain the following top-level fields:

* "title": Create a compelling, concise, and informative title for the tour plan. This should be attention-grabbing and accurately reflect the tour's theme or destination. *(Example: "Unveiling Rajbari's Cultural Heritage: A 3-Day Tour")*
* "description": Write a brief, enticing, and informative description of the tour plan. This should highlight the key attractions, experiences, and overall theme of the tour to pique user interest. Aim for 2-3 sentences. *(Example: "Embark on a 3-day journey through Rajbari, exploring its rich cultural tapestry. Discover historical landmarks, vibrant local crafts, and the region's unique traditions.")*
* "duration": Clearly state the total duration of the tour. Use a format that is easy to understand (e.g., "3 Days", "Full Day Trip", "Weekend Getaway", "2 Days/1 Night").
* "tour_plan_text": This is the core of the tour plan. Provide a meticulously structured, day-by-day itinerary in Markdown format. Each day's section must include:
    * **Day Heading:** Use clear and informative headings for each day (e.g., "## Day 1: Arrival and রাজবাড়ী Town Exploration").
    * **Time Slots:** Organize each day into time-based slots (e.g., "**Morning:**", "**Afternoon:**", "**Evening:**").
    * **Specific Locations and Activities:** For each time slot, list specific places to visit and activities to undertake. Use the full and correct name of each location.
    * **Engaging Descriptions:** For each location or activity, provide a brief, enticing, and informative description to capture the user's interest and provide context. Focus on what makes each place special or worthwhile.
    * **Embedded Google Maps Hyperlinks:** Within the description of each location in the "tour_plan_text", embed a descriptive hyperlink that points directly to the Google Maps URL for that specific location. Use Markdown link format: "[Descriptive Link Text](MAP_URL)". *(Example: "[Explore Pancharatna Gobinda Mandir on Google Maps](MAP_LINK_FOR_PANCHARATNA_GOBINDA_MANDIR)")*. **Ensure these are valid, working Google Maps URLs.**
    * **Practical Notes:** Include any relevant practical information or tips within each day's plan. This might include suggestions for transportation, recommended attire, best times to visit, or local customs to be aware of.

* "map_links": Create a JSON array named "map_links". This array should contain a JSON object for *every unique location* mentioned in the "tour_plan_text". Each object in the array must have these key-value pairs:
    * "location_name": The *exact* full name of the place as it appears in the "tour_plan_text". This must match precisely for easy referencing.
    * "map_url": A **valid, direct, and accurate Google Maps URL** for the corresponding "location_name". **Double-check that these URLs are functional and point to the correct places.**

* "overall_map_link": Provide a *single, valid Google Maps URL* in this field that, when opened, displays **all** the locations listed in the "map_links" array on a single map. This provides a convenient overview of the entire tour route. If it is technically impossible to generate a single map link showing all locations, then set the value of "overall_map_link" to the string "not_available". Please prioritize creating this overall map link if feasible.

**Important Instructions and Reminders:**

* **JSON Format is Mandatory:** The entire response *must* be valid JSON. Pay close attention to syntax (curly braces, square brackets, colons, commas, quotes).
* **Accuracy of Map Data is Critical:** Ensure all "map_url" values in both "map_links" and "tour_plan_text" are valid, working Google Maps links that point to the correct locations. **Invalid or incorrect map links are unacceptable.**
* **Markdown Formatting:** Use Markdown formatting for the "tour_plan_text" to enhance readability (headings, lists, bold text, hyperlinks).
* **Completeness:** Ensure that *every location* mentioned in the "tour_plan_text" is also included in the "map_links" array with its corresponding "map_url".
* **User-Centric Design:** The tour plan should be designed to be helpful and engaging for someone actually planning to take this tour. Provide practical advice and enticing descriptions.

By following this detailed prompt, you should receive a JSON response that is well-structured, informative, and contains accurate map data, ready to be used in your web development project.`;

      const result = await this.model.generateContent(mypromt);
      const response = result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error('Error generating text with Gemini API:', error);
      throw new Error('Failed to generate text.'); // Or handle error as needed
    }
  }

  // Add other methods for chat, image generation, etc., as needed
}