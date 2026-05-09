const recentGreetings: Set<number> = new Set();
export const maxRecentGreetings = 8;

const hoursLeft = 24 - new Date().getHours();

const greetingsText: string[] = [
  "Let's make today count!",
  "Get things done and conquer the day!",
  "Embrace the power of productivity!",
  "Set your goals, crush them, repeat.",
  "Today is a new opportunity to be productive!",
  "Make every moment count.",
  "Stay organized, stay ahead.",
  "Take charge of your day!",
  "One task at a time, you've got this!",
  "Productivity is the key to success.",
  "Let's turn plans into accomplishments!",
  "Start small, achieve big.",
  "Be efficient, be productive.",
  "Harness the power of productivity!",
  "Get ready to make things happen!",
  "It's time to check off those tasks!",
  "Start your day with a plan!",
  "Stay focused, stay productive.",
  "Unlock your productivity potential.",
  "Turn your to-do list into a to-done list!",
  `Have a wonderful ${new Date().toLocaleDateString("en", {
    weekday: "long",
  })}!`,
  `Happy ${new Date().toLocaleDateString("en", {
    month: "long",
  })}! A great month for productivity!`,
  hoursLeft > 4
    ? `${hoursLeft} hours left in the day. Use them wisely!`
    : `Only ${hoursLeft} hours left in the day`,
];

export const getRandomGreeting = (): string => {
  const getUniqueGreeting = (): string => {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * greetingsText.length);
    } while (recentGreetings.has(randomIndex));

    recentGreetings.add(randomIndex);
    if (recentGreetings.size > maxRecentGreetings) {
      const firstEntry = Array.from(recentGreetings).shift();
      if (firstEntry !== undefined) {
        recentGreetings.delete(firstEntry);
      }
    }

    return greetingsText[randomIndex];
  };

  return getUniqueGreeting();
};
