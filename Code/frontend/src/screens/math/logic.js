import mathGenerator from "services/math-generator";

export const RESULT_NONE = 0;
export const RESULT_CORRECT = 1;
export const RESULT_WRONG = 2;
export const RESULT_TIMEOUT = 3;

export function getInitialState(settings) {
  return {
    result: RESULT_NONE,
    expression: "",
    mathResult: "",
    progressPercentage: 0,
    correctAnswers: 0,
    correctDifficulty: 0,
    incorrectDifficulty: 0,
    totalAnswers: 0,
    initialQuestionTime: new Date(),
    finalQuestionTime: 0,
    answerTimeout: parseInt(settings.answerTimeout),
    waitTime: parseInt(settings.waitTime),
    averageScore: 70,
    yourScore: 0,
    waiting: true,
    enableSound: settings.enableSound,
    isControl: settings.isControl,
    testTotalTime: settings.testTotalTime,
    difficulty: settings.difficulty,
    counters: [0, 0, 0, 0, 0],
  };
}

export function mainReducer(state, action) {
  switch (action.type) {
    case "userInput": {
      if (state.waiting) {
        //Do not accept user input when waiting
        return state;
      }
      if (state.mathResult === action.input) {
        return {
          ...state,
          waiting: true,
          result: RESULT_CORRECT,
          correctAnswers: state.correctAnswers + 1,
          correctDifficulty: state.correctDifficulty + 1,
          incorrectDifficulty: 0,
          totalAnswers: state.totalAnswers + 1,
          averageScore: state.averageScore + Math.exp(-0.075 * state.correctAnswers),
          yourScore: Math.floor(((state.correctAnswers + 1) / (state.totalAnswers + 1)) * 100),
        };
      } else {
        return {
          ...state,
          waiting: true,
          result: RESULT_WRONG,
          incorrectAnswers: state.incorrectAnswers + 1,
          incorrectDifficulty: state.incorrectDifficulty + 1,
          correctDifficulty: 0,
          totalAnswers: state.totalAnswers + 1,
          averageScore: state.averageScore - 1,
          yourScore: Math.floor((state.correctAnswers / (state.totalAnswers + 1)) * 100),
        };
      }
    }
    case "timeout": {
      return {
        ...state,
        waiting: true,
        result: RESULT_TIMEOUT,
        incorrectAnswers: state.incorrectAnswers + 1,
        correctDifficulty: 0,
        totalAnswers: state.totalAnswers + 1,
        averageScore: state.averageScore - 1,
        yourScore: Math.floor((state.correctAnswers / (state.totalAnswers + 1)) * 100),
      };
    }

    case "firstQuestion": {
      const finalQuestionTime = new Date();
      finalQuestionTime.setSeconds(finalQuestionTime.getSeconds() + state.answerTimeout);
      const mathQuestions = mathGenerator();
      const expression = mathQuestions[state.difficulty][0][0];
      const result = mathQuestions[state.difficulty][0][1];
      const newCounters = [0, 0, 0, 0, 0];
      newCounters[state.difficulty] = 1;
      return {
        ...state,
        waiting: false,
        expression: expression,
        mathResult: result,
        progressPercentage: 0,
        finalQuestionTime: finalQuestionTime,
        result: RESULT_NONE,
        mathQuestions: mathQuestions,
        counters: newCounters,
      };
    }

    case "newQuestion": {
      const finalQuestionTime = new Date();
      finalQuestionTime.setSeconds(finalQuestionTime.getSeconds() + state.answerTimeout);
      const newState = {
        ...state,
        initialQuestionTime: new Date(),
        waiting: false,
        progressPercentage: 0,
        finalQuestionTime: finalQuestionTime,
        result: RESULT_NONE,
      };
      if (state.correctDifficulty === 3 && state.difficulty < 4) {
        newState.difficulty = state.difficulty + 1;
        newState.correctDifficulty = 0;
      } else if (state.incorrectDifficulty === 3 && state.difficulty > 0) {
        newState.difficulty = state.difficulty - 1;
        newState.incorrectDifficulty = 0;
      }
      const questions = state.mathQuestions[newState.difficulty];
      const questionIndex = state.counters[newState.difficulty];
      const expression = questions[questionIndex][0];
      const result = questions[questionIndex][1];
      const newCounters = [...state.counters];
      newCounters[newState.difficulty] = (questionIndex + 1) % questions.length;
      return {
        ...newState,
        expression: expression,
        mathResult: result,
        counters: newCounters,
      };
    }
    case "updateProgressPercentage": {
      return {
        ...state,
        progressPercentage: 100 - ((state.finalQuestionTime - new Date()) / (state.answerTimeout * 1000)) * 100,
      };
    }
    default: {
      return state;
    }
  }
}
