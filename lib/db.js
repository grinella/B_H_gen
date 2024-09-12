
import fs from 'fs/promises';
import path from 'path';

export async function getRandomJoke() {
  const sqlFilePath = path.join(process.cwd(), 'public', 'my.sql');
  const sqlContent = await fs.readFile(sqlFilePath, 'utf-8');
  
  // Estrarre le battute dal file SQL
  const quotes = sqlContent.match(/VALUES \("(.+?)"\)/g)
    ?.map(match => match.replace(/VALUES \("(.+?)"\)/, '$1')) || [];

  if (quotes.length === 0) {
    throw new Error('Nessuna battuta trovata nel file SQL');
  }
  
  // Selezionare una battuta casuale
  const RandomJoke = quotes[Math.floor(Math.random(15) * quotes.length)];
  // const test = RandomJoke.replace(/\\n/g, 'CHAR(13)+CHAR(10)');
  // return test;
  return RandomJoke;
}