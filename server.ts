import app from './App';

const PORT = process.env.PORT || 8080;
const host = '0.0.0.0';

app.listen(PORT, host, () => {
  console.log(`Backend Caldera is running on port: ${PORT}`);
});