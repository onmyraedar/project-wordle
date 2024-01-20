import React from 'react';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';

import { checkGuess } from '../../game-helpers';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [gameStatus, setGameStatus] = React.useState('running');
  const [guesses, setGuesses] = React.useState([]);

  function addGuess(unconfirmedGuess) {
    const guess = checkGuess(unconfirmedGuess, answer);
    const nextGuesses = [...guesses, guess];

    setGuesses(nextGuesses);

    if (unconfirmedGuess === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  let banner;
  if (gameStatus === 'won') {
    banner = (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong>
            {' '}
            {guesses.length} {guesses.length === 1 ? 'guess' : 'guesses'}
          </strong>
          .
        </p>
      </div>
    );
  } else if (gameStatus === 'lost') {
    banner = (
      <div className="sad banner">
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>
    );
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      <GuessInput addGuess={addGuess} gameStatus={gameStatus} />
      {banner}
    </>
  );
}

export default Game;
