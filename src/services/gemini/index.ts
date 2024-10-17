const { VertexAI } = require('@google-cloud/vertexai');
import axios from 'axios';
import { Request, Response } from "express";


export async function getPatternsFromB64(req: Request, res: Response) {
  let base64Image = req.body.image;
  console.log("Base64: "+base64Image);

  const project = 'trishul-414221';
  const location = 'asia-southeast1';
  const vertex_ai = new VertexAI({ project: project, location: location });

  const generativeVisionModel = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-pro-vision',
  });

  //base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const filePart = {inline_data: {data: base64Image, mime_type: 'image/jpeg'}};
  const textPart = {text: 'Below given is the input of a image from a ecommerce website.identify darkpatterns in it from the following list of dark patterns.Dark Patterns identified by DoCA1. False Urgency: Creating a false sense of urgency or scarcity to pressure usersinto quick decisions.2. Basket Sneaking: Adding additional products or services to the shopping cartwithout user consent.3. Confirm Shaming: Using guilt as a tactic to make users adhere to a particularbelief or viewpoint.4. Forced Action: Forcing users into actions they may not want, such as signingup for a service to access content.5. Subscription Traps: Making it easy to sign up for a service but challenging tocancel, often by hiding the cancellation option.6. Interface Interference: Making it difficult for users to take certain actions, such ascanceling a subscription or deleting an account.7. Bait and Switch:Advertising one product or service but delivering another,often of lower quality.8. Drip Pricing: Hiding additional costs from users until they are alreadycommitted to making a purchase.9. Disguised Ads: Creating advertisements that look like other types of content,such as news articles or user-generated content.10. Nagging: Persistent, repetitive, and annoyingly constant criticism,complaints, or requests for action.the output should contain the type of darkpattern present and give it a rating A to E (A being no darkpattern and E being 4 or more darkpatterns)Below is the screenshot from the ecommerce site'};
  const request = {
      contents: [{role: 'user', parts: [textPart, filePart]}],
    };
  const resp = await generativeVisionModel.generateContentStream(request);
  const contentResponse = await resp.response;
  console.log(contentResponse.candidates[0].content.parts[0].text);
  
  res.status(200).send(contentResponse.candidates[0].content.parts[0].text);

}

export async function getPatternsFromImage(req: any, res: Response) {
  let url = req.body.image;

  console.log("URL: "+url);
  
  if (!url) {
    res.status(400).send('URL is missing in the request');
    return;
  }
  const response = await axios.get(url, { responseType: 'arraybuffer'});
  const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  
  console.log(base64Image);

  const project = 'trishul-414221';
  const location = 'asia-southeast1';
  const vertex_ai = new VertexAI({ project: project, location: location });

  const generativeVisionModel = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-pro-vision',
  });

  const filePart = {inline_data: {data: base64Image, mime_type: 'image/png'}};
  const textPart = {text: 'Below given is the input of a image from a ecommerce website.identify darkpatterns in it from the following list of dark patterns.Dark Patterns identified by DoCA1. False Urgency: Creating a false sense of urgency or scarcity to pressure usersinto quick decisions.2. Basket Sneaking: Adding additional products or services to the shopping cartwithout user consent.3. Confirm Shaming: Using guilt as a tactic to make users adhere to a particularbelief or viewpoint.4. Forced Action: Forcing users into actions they may not want, such as signingup for a service to access content.5. Subscription Traps: Making it easy to sign up for a service but challenging tocancel, often by hiding the cancellation option.6. Interface Interference: Making it difficult for users to take certain actions, such ascanceling a subscription or deleting an account.7. Bait and Switch:Advertising one product or service but delivering another,often of lower quality.8. Drip Pricing: Hiding additional costs from users until they are alreadycommitted to making a purchase.9. Disguised Ads: Creating advertisements that look like other types of content,such as news articles or user-generated content.10. Nagging: Persistent, repetitive, and annoyingly constant criticism,complaints, or requests for action.the output should contain the type of darkpattern present and give it a rating A to E (A being no darkpattern and E being 4 or more darkpatterns)Below is the screenshot from the ecommerce site'};
  const request = {
      contents: [{role: 'user', parts: [textPart, filePart]}],
    };
  const resp = await generativeVisionModel.generateContentStream(request);
  const contentResponse = await resp.response;
  console.log(contentResponse.candidates[0].content.parts[0].text);
  
  res.status(200).send(contentResponse.candidates[0].content.parts[0].text);
}