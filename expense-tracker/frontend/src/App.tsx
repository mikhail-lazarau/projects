import { Button } from './components/Button';
import { InputLabel } from './components/InputLabel';
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
      <div style={{ margin: '20px', display: 'flex', flexDirection: 'column', gap: '30px', width: '327px' }}>
        <InputLabel
          floatingLabel="Email"
          placeholderLabel="Enter your email"
          type="email"
        />
        <InputLabel
          floatingLabel="Password"
          placeholderLabel="Enter your password"
          type="password"
          defaultValue="some value"
        />
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
