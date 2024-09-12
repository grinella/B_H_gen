"use client";

import React, { useState, useEffect } from 'react';

export default function Preview() {
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');
  const [displayedQuote, setDisplayedQuote] = useState('');

  // Funzione per richiedere una battuta casuale dall'API
  const fetchRandomJoke = async () => {
    try {
      const response = await fetch('/api/random-joke');
      
      // Controlla se la risposta non è ok (status diverso da 2xx)
      if (!response.ok) {
        throw new Error(`Errore API: ${response.status} ${response.statusText}`);
      }

      // Prova a parsare la risposta JSON
      const data = await response.json();
      setQuote(data.quote);
      setError(''); // Resetta l'errore se tutto va bene
      setDisplayedQuote(''); // Reset displayed quote when fetching a new one
    } catch (error) {
      console.error('Errore nel recupero della citazione:', error);
      setError('Errore nel recupero della citazione. Riprova.');
    }
    
  };

  useEffect(() => {
    if (quote) {
      let i = 0;
      const typingEffect = setInterval(() => {
        if (i <= quote.length) {
          setDisplayedQuote(quote.slice(0, i));
          if (quote[i - 2] === '?') {
            const start = Date.now();
            while (Date.now() - start < 1000) {}
          }
          i++;
        } else {
          clearInterval(typingEffect);
        }
      }, 32); // più il numero è basso e più è veloce la scrittura della battuta

      return () => clearInterval(typingEffect);
    }
  }, [quote]);

  const getDisplayLines = (text: string): string => {
    const lines = text.split('\n');
    return lines.slice(-100).join('\n'); 
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-purple p-4 relative">
      <h1 className="text-white text-3xl font-bold mt-8 mb-24">Don't be a bad person</h1>
      
      <div className="flex-grow flex flex-col items-center justify-start pt-24">
        <p className="text-xl text-center max-w-md text-white h-32 overflow-hidden whitespace-pre-wrap">
          {getDisplayLines(displayedQuote)}
        </p>
        {error && (
          <p className="mt-2 text-red-500">{error}</p>
        )}
      </div>
      
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={fetchRandomJoke}
          className="px-6 py-3 text-lg font-bold text-white bg-red-950 rounded hover:bg-red-800 transition-colors transform scale-100 hover:scale-105"
        >
          Generate Black Humor Joke
        </button>
      </div>
    </div>
  );
}