import { useState } from 'react';

type ControllerReturn = {
  entered: string;
  setEntered: (entered: string) => void;
};

const useHomeController = (): ControllerReturn => {
  const [entered, setEntered] = useState('');

  return { entered, setEntered };
};

export default useHomeController;
