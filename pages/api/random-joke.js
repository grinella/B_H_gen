import { getRandomJoke } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const quote = await getRandomJoke();
    res.status(200).json({ quote });
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero della Battuta' });
  }
}