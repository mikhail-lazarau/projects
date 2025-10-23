import { useMemo, useState } from 'react';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { DatePicker } from './components/DatePicker';
import { Icon } from './components/Icon';
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

  const [date, setDate] = useState(new Date());
  return (
    <>
      <Logo />
      <div style={{ margin: '20px', display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'left' }}>
        <Icon iconName="plus" size={{ width: 15, height: 15 }} color="#3629B7" />
        <Icon iconName="bell" />
        <Icon iconName="empty-square" size={{ width: 30, height: 30 }} />
        <Icon iconName="tick-square" color="#3629B7" />
      </div>
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
        <DatePicker placeholder="Select a date" value={date} onChange={setDate} />
      </div>
      <h1>Vite + React</h1>
    </>
  );
}

export default App;
