import { Button } from './components/Button';
import Logo from './components/Logo';

function App() {
  return (
    <>
      <Logo />
      <div className="button-container">
        <Button>Click me</Button>
        <Button variant="secondary">Click me</Button>
        <Button disabled>Click me</Button>
        <Button loading>Click me</Button>
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
