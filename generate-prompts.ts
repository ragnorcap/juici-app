import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// File path
const filePath = path.join(__dirname, 'data/prompts.json');

// Helper function to load existing prompts from file
function loadExistingPrompts(file: string): Set<string> {
  try {
    const data = fs.readFileSync(file, 'utf-8');
    const parsed = JSON.parse(data);
    // Handle the structure of our prompts.json file which has a "prompts" array
    const prompts: string[] = parsed.prompts || [];
    return new Set(prompts);
  } catch (error) {
    console.error('Error loading existing prompts:', error);
    // If file doesn't exist or is empty, return an empty set
    return new Set();
  }
}

// Helper function to save prompts to file (appending new ones)
function savePrompts(file: string, newPrompts: string[]) {
  let allPrompts: string[] = [];
  if (fs.existsSync(file)) {
    try {
      const data = fs.readFileSync(file, 'utf-8');
      const parsed = JSON.parse(data);
      allPrompts = parsed.prompts || [];
    } catch (error) {
      console.error('Error parsing the existing prompts file. Overwriting file.');
    }
  }
  
  // Add new prompts to existing ones
  const combinedPrompts = [...allPrompts, ...newPrompts];
  
  // Save with the correct structure
  fs.writeFileSync(file, JSON.stringify({ prompts: combinedPrompts }, null, 2), 'utf-8');
  console.log(`Successfully appended ${newPrompts.length} prompts to ${file}`);
  console.log(`Total prompts: ${combinedPrompts.length}`);
}

// Random helper function
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Prompt generators

// Basic prompt: "Create a [tool] for [subject]."
function generateBasicPrompt(): string {
  const tools = ["dashboard", "website", "app", "tool", "widget", "extension", "report", "analyzer", "tracker", "generator"];
  const subjects = [
    "FRED inflation data", "weather data", "social media metrics", "personal finance", "health records",
    "sports statistics", "travel trends", "e-commerce data", "user feedback", "product reviews"
  ];
  return `Create a ${randomChoice(tools)} for ${randomChoice(subjects)}.`;
}

// Moderate prompt: "Develop a [tool] that [action] for [subject] with [feature]."
function generateModeratePrompt(): string {
  const tools = ["app", "service", "platform", "system", "tool"];
  const actions = ["analyzes", "visualizes", "monitors", "aggregates", "optimizes", "automates", "enhances", "predicts", "organizes", "manages"];
  const subjects = [
    "social media trends", "financial markets", "health data", "user behavior", "energy consumption",
    "e-commerce sales", "real-time analytics", "environmental metrics", "supply chain data", "logistics information"
  ];
  const features = [
    "interactive charts", "real-time data", "machine learning insights", "user-friendly design", "customizable reports",
    "data export options", "mobile responsiveness", "integrated notifications", "cloud support", "multi-language support"
  ];
  return `Develop a ${randomChoice(tools)} that ${randomChoice(actions)} for ${randomChoice(subjects)} with ${randomChoice(features)}.`;
}

// Detailed prompt: "Build a [tool] that enables users to [action] [subject] using [technique] integrated with [system] while ensuring [constraint]."
function generateDetailedPrompt(): string {
  const tools = ["application", "platform", "dashboard", "solution", "system"];
  const actions = ["analyze", "monitor", "visualize", "predict", "track", "automate", "simulate", "optimize", "manage", "orchestrate"];
  const subjects = [
    "complex market trends", "large-scale datasets", "real-time sensor data", "multi-dimensional metrics",
    "distributed logs", "social media interactions", "environmental data", "healthcare records", "IoT devices", "cryptocurrency transactions"
  ];
  const techniques = [
    "advanced algorithms", "machine learning models", "statistical analysis", "data mining techniques", "neural networks",
    "data visualization libraries", "automated scripts", "cloud computing", "real-time processing", "API integrations"
  ];
  const systems = [
    "a microservices architecture", "a cloud-based platform", "an event-driven system", "a modular framework", "a containerized environment",
    "a serverless setup", "a decentralized network", "a scalable API", "an integrated IoT solution", "a mobile-first interface"
  ];
  const constraints = [
    "high performance", "robust security", "scalability", "user privacy", "data accuracy",
    "minimal latency", "fault tolerance", "resource efficiency", "compliance standards", "cross-platform compatibility"
  ];
  return `Build a ${randomChoice(tools)} that enables users to ${randomChoice(actions)} ${randomChoice(subjects)} using ${randomChoice(techniques)} integrated with ${randomChoice(systems)} while ensuring ${randomChoice(constraints)}.`;
}

// Function to generate unique prompts using a generator function
function generateUniquePrompts(generator: () => string, count: number, existing: Set<string>): string[] {
  const prompts: string[] = [];
  let attempts = 0;
  const maxAttempts = count * 10; // Arbitrary limit to prevent infinite loops
  
  // Continue generating until we have 'count' unique prompts
  while (prompts.length < count && attempts < maxAttempts) {
    attempts++;
    const prompt = generator();
    // Check if the prompt already exists in the file or has been generated in this run
    if (!existing.has(prompt) && !prompts.includes(prompt)) {
      prompts.push(prompt);
      existing.add(prompt); // Add to existing set to avoid duplicates in future generators
    }
  }
  
  if (prompts.length < count) {
    console.warn(`Warning: Could only generate ${prompts.length} unique prompts instead of the requested ${count}`);
  }
  
  return prompts;
}

// Main function to generate and optionally append new prompts
async function main() {
  const existingPrompts = loadExistingPrompts(filePath);
  console.log(`Loaded ${existingPrompts.size} existing prompts.`);

  // Increasing the counts to generate 50 prompts total per run
  const basicPrompts = generateUniquePrompts(generateBasicPrompt, 15, existingPrompts);
  const moderatePrompts = generateUniquePrompts(generateModeratePrompt, 15, existingPrompts);
  const detailedPrompts = generateUniquePrompts(generateDetailedPrompt, 20, existingPrompts);

  const newPrompts = [...basicPrompts, ...moderatePrompts, ...detailedPrompts];

  console.log('\nGenerated Prompts:');
  newPrompts.forEach((p, i) => console.log(`${i + 1}. ${p}`));

  // Ask user for confirmation to append new prompts to the file
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query: string): Promise<string> =>
    new Promise(resolve => rl.question(query, resolve));

  const answer = await question('\nDo you want to append these new prompts to the file? (y/n): ');
  rl.close();

  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    savePrompts(filePath, newPrompts);
  } else {
    console.log('No changes were made.');
  }
}

main().catch(err => console.error(err)); 