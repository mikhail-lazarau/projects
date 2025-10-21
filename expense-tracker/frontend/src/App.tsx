import { useMemo } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import Logo from './components/Logo';

function App() {
  const emailLabel = useMemo(
    () => ({
      floating: 'Email',
      placeholder: 'Enter your email',
    }),
    []
  );

  const passwordLabel = useMemo(
    () => ({
      floating: 'Password',
      placeholder: 'Enter your password',
    }),
    []
  );
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
        <Input label={emailLabel} type="email" />
        <Input
          label={passwordLabel}
          type="password"
          defaultValue="some value"
        />
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
