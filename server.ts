import app from './App';

const PORT = process.env.BE_PORT;

app.listen(PORT, () => {
  console.log(`Backend Caldera is running on port: ${PORT}`);
});