import questions from '../data/questions.json';
import { questionImages } from '../data/questionImageMap';
import { questionsCount } from '../quizConfig';

export const getRandomQuestions = (count = questionsCount) => {
  const uniqueMap = new Map();
  questions.forEach(q => {
    if (!uniqueMap.has(q.id)) {
      uniqueMap.set(q.id, q);
    }
  });

  const uniqueQuestions = Array.from(uniqueMap.values());
  const shuffled = [...uniqueQuestions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map(q => ({
    ...q,
    image: questionImages[q.id.toString()] || null
  }));
};
