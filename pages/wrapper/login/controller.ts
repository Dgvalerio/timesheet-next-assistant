import { useState } from 'react';

type ControllerReturn = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
};

const useLoginController = (): ControllerReturn => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    alert(JSON.stringify({ email, password }));
  };

  return { email, setEmail, password, setPassword, handleSubmit };
};

export default useLoginController;
