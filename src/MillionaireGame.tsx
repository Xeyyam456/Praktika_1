import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GamePhase, GameQuestion } from './types/game';
import { CHECKPOINT_INDICES } from './data/questions';
import { selectGameQuestions } from './utils/selectQuestions';
import StartScreen from './screens/StartScreen';
import QuestionScreen from './screens/QuestionScreen';
import ResultScreen from './screens/ResultScreen';
import { colors } from './theme';

const getGuaranteedPrize = (indexReached: number, gameQuestions: GameQuestion[]): number => {
  let floor = 0;
  for (const checkpoint of CHECKPOINT_INDICES) {
    if (checkpoint < indexReached) {
      floor = gameQuestions[checkpoint].prize;
    }
  }
  return floor;
};

export default function MillionaireGame(): React.JSX.Element {
  const [phase, setPhase] = useState<GamePhase>('start');
  const [playerName, setPlayerName] = useState('Player');
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>(() => selectGameQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finalPrize, setFinalPrize] = useState(0);
  const [won, setWon] = useState(false);

  const handleStart = (name: string): void => {
    setPlayerName(name);
    setGameQuestions(selectGameQuestions());
    setCurrentIndex(0);
    setWon(false);
    setFinalPrize(0);
    setPhase('playing');
  };

  const handleAnswered = (correct: boolean): void => {
    if (!correct) {
      setFinalPrize(getGuaranteedPrize(currentIndex, gameQuestions));
      setWon(false);
      setPhase('result');
      return;
    }

    if (currentIndex === gameQuestions.length - 1) {
      setFinalPrize(gameQuestions[currentIndex].prize);
      setWon(true);
      setPhase('result');
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = (): void => {
    setPhase('start');
  };

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        {phase === 'start' && <StartScreen onStart={handleStart} />}

        {phase === 'playing' && (
          <QuestionScreen
            question={gameQuestions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={gameQuestions.length}
            score={currentIndex > 0 ? gameQuestions[currentIndex - 1].prize : 0}
            onAnswered={handleAnswered}
          />
        )}

        {phase === 'result' && (
          <ResultScreen
            playerName={playerName}
            score={finalPrize}
            won={won}
            questionsAnswered={won ? gameQuestions.length : currentIndex}
            totalQuestions={gameQuestions.length}
            onRestart={handleRestart}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
