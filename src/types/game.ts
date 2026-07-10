export type Difficulty = 'easy' | 'medium' | 'hard';

export type Question = {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number;
  difficulty: Difficulty;
};

export type GameQuestion = Question & { prize: number };

export type GamePhase = 'start' | 'playing' | 'result';

export type AnswerFeedback = 'correct' | 'incorrect' | null;
