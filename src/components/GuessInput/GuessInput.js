import React from 'react';

function GuessInput() {
  const [guess, setGuess] = React.useState('');

  function handleChangeGuess(event) {
    const nextGuess = event.target.value.toUpperCase();
    setGuess(nextGuess);
  }

  function handleSubmitGuess(event) {
    event.preventDefault();
    console.log({ guess });
    setGuess('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmitGuess}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        pattern="[a-zA-Z]{5}"
        required={true}
        value={guess}
        onChange={handleChangeGuess}
      />
    </form>
  );
}

export default GuessInput;
