// Fonction externe au composant 
export const initialState = {
  currentIndex: 0,
  scoreTemporaire: 0,
  status: 'idle', // idle, playing, finished
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */
export const quizReducer = (state, action) => {

  /**
   * 
   */
  switch (action.type) {
    case 'START_QUIZ':
      return { ...state, status: 'playing', currentIndex: 0, scoreTemporaire: 0 };

    case 'ANSWER_QUESTION': {
      const isCorrect = action.payload.reponseUtilisateur === action.payload.bonneReponse;
      return {
        ...state,
        scoreTemporaire: isCorrect ? state.scoreTemporaire + 1 : state.scoreTemporaire,
        currentIndex: state.currentIndex + 1
      };
    }

    case 'FINISH_QUIZ':
      return { ...state, status: 'finished' };

    case 'RESET_QUIZ':
      return { ...initialState };

    default:
      return state;
  }
};