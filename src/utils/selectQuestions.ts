import { Difficulty, GameQuestion, Question } from '../types/game';
import { getPrizeForIndex, questionBank } from '../data/questions';

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const byDifficulty = (difficulty: Difficulty): Question[] =>
  shuffle(questionBank.filter((q) => q.difficulty === difficulty));

// Bütün sual hovuzunu (təkrarsız, çətinlik dərəcəsinə görə artan) təsadüfi sıraya salır.
export const selectGameQuestions = (): GameQuestion[] => {
  const picked = [...byDifficulty('easy'), ...byDifficulty('medium'), ...byDifficulty('hard')];

  return picked.map((question, index) => ({ ...question, prize: getPrizeForIndex(index) }));
};
