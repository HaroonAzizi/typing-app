// utils/textUtils.js

// Sample text passages for typing tests
const textSamples = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Pangrams are often used to test fonts, keyboards, and other text-related tools.",

  "Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++.",

  "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.",

  "TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript.",

  "The World Wide Web, commonly known as the Web, is an information system enabling documents and other web resources to be accessed over the Internet. Documents and downloadable media are made available to the network through web servers and can be accessed by programs such as web browsers.",

  "Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.",

  "Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user. Large clouds often have functions distributed over multiple locations, each location being a data center.",

  "Software engineering is the systematic application of engineering approaches to the development of software. Software engineering is a computing discipline.",

  "A keyboard is a typewriter-style device which uses an arrangement of buttons or keys to act as mechanical levers or electronic switches. Keyboards are the primary devices used for inputting text.",

  "The Internet is a global system of interconnected computer networks that use the Internet protocol suite to communicate between networks and devices. It is a network of networks that consists of private, public, academic, business, and government networks of local to global scope, linked by a broad array of electronic, wireless, and optical networking technologies.",

  // Additional text samples
  "Machine learning is a branch of artificial intelligence and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy. Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so.",

  "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes. Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative.",

  "Blockchain is a shared, immutable ledger that facilitates the process of recording transactions and tracking assets in a business network. An asset can be tangible or intangible. Virtually anything of value can be tracked and traded on a blockchain network, reducing risk and cutting costs for all involved.",

  "Virtual reality is a simulated experience that can be similar to or completely different from the real world. Applications of virtual reality include entertainment, education, and business. Other distinct types of VR-style technology include augmented reality and mixed reality, sometimes referred to as extended reality or XR.",

  "Quantum computing is the exploitation of collective properties of quantum states, such as superposition and entanglement, to perform computation. The devices that perform quantum computations are known as quantum computers. They are believed to be able to solve certain computational problems, such as integer factorization, substantially faster than classical computers.",

  "The Internet of Things refers to the billions of physical devices around the world that are now connected to the internet, all collecting and sharing data. Thanks to the arrival of super-cheap computer chips and the ubiquity of wireless networks, it's possible to turn anything, from something as small as a pill to something as big as an airplane, into a part of the IoT.",

  "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data, and apply knowledge and actionable insights from data across a broad range of application domains.",

  "Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. Recent work also considers the viewer proximity as part of the viewing context as an extension for RWD. Content, design and performance are necessary across all devices to ensure usability and satisfaction.",

  "User experience design is the process of supporting user behavior through usability, usefulness, and desirability provided in the interaction with a product. User experience design encompasses traditional human–computer interaction design and extends it by addressing all aspects of a product or service as perceived by users.",

  "Agile software development comprises various approaches to software development under which requirements and solutions evolve through the collaborative effort of self-organizing and cross-functional teams and their customer/end user. It advocates adaptive planning, evolutionary development, early delivery, and continual improvement, and it encourages flexible responses to change.",

  // Add these new paragraphs to your textSamples array

  "Haroon Azizi is a skilled full-stack developer specializing in modern web and mobile technologies. With expertise in React, Next.js, and React Native, he creates seamless user experiences across platforms. His portfolio includes a variety of innovative applications such as a Clinic Manager system, a face recognition-based attendace app, called Attendance Plus, and a Zoom clone called Unite. For inquiries or collaboration opportunities, he can be reached at hi@haroonazizi.com.",

  "As a creative technologist, Haroon Azizi combines technical expertise with innovative design thinking. His typing application demonstrates his attention to user experience and performance optimization. Beyond coding, Haroon excels at generating creative solutions and designing intuitive interfaces. His portfolio website showcases his diverse range of projects and technical capabilities, reflecting his commitment to quality and innovation in software development.",

  "Leading a team of five talented developers, Haroon Azizi has established a track record of delivering high-quality software solutions. His collaborative approach and technical leadership enable efficient project execution from concept to deployment. With proficiency in version control systems like GitHub and modern development workflows, Haroon ensures code quality and project scalability. His multidisciplinary skills span from frontend development to system architecture design.",

  "The development of this typing application is one of many projects in Haroon Azizi's portfolio. His work demonstrates versatility across different domains, from healthcare management systems to communication tools. By leveraging technologies like React and Next.js, Haroon creates responsive and performant applications that solve real-world problems. His creative approach to software development combines technical excellence with thoughtful design, resulting in intuitive user experiences.",
];

// Common words for easy typing practice
const commonWords = [
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "I",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
];

// Function to get a random text sample
export const getRandomText = () => {
  // 1 in 3 chance to get a longer text (combining multiple samples)
  if (Math.random() < 0.33) {
    return getLongerText();
  }

  const randomIndex = Math.floor(Math.random() * textSamples.length);
  return textSamples[randomIndex];
};

// Function to generate a longer text by combining multiple samples
const getLongerText = () => {
  // Randomly select 2-3 text samples to combine
  const numSamples = Math.floor(Math.random() * 2) + 2; // 2 or 3
  let combinedText = "";

  // Keep track of used indices to avoid repetition
  const usedIndices = new Set();

  for (let i = 0; i < numSamples; i++) {
    let randomIndex;
    // Ensure we don't use the same sample twice
    do {
      randomIndex = Math.floor(Math.random() * textSamples.length);
    } while (usedIndices.has(randomIndex));

    usedIndices.add(randomIndex);
    combinedText += textSamples[randomIndex] + " ";
  }

  return combinedText.trim();
};

// Function to generate a text with common words (easier typing)
export const getEasyText = () => {
  // Generate a paragraph with 50-100 common words
  const wordCount = Math.floor(Math.random() * 51) + 50; // 50-100 words
  let text = "";

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * commonWords.length);
    text += commonWords[randomIndex] + " ";
  }

  return text.trim();
};

// Function to calculate typing statistics
export const calculateStats = (text, userInput, timeInSeconds) => {
  // Count correctly typed characters
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (i < text.length && userInput[i] === text[i]) {
      correctChars++;
    }
  }

  // Calculate WPM: (characters / 5) / minutes
  const timeInMinutes = timeInSeconds / 60;
  const wpm = Math.round(correctChars / 5 / timeInMinutes);

  // Calculate accuracy
  const accuracy = Math.round(
    (correctChars / Math.max(1, userInput.length)) * 100
  );

  return { wpm, accuracy };
};
