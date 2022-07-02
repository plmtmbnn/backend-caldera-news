import app from './App';

const PORT = process.env.BE_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Backend Caldera is running on port: ${PORT}`);
});