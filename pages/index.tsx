import { useState } from 'react';

import type { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.main`
  padding: 4rem;

  h1 {
    font-size: 6rem;
    text-align: center;
  }

  input {
    background-color: rgba(0, 0, 0, 0.08);
    color: #fff;
    padding: 0.25rem;
    border: none;
    font-size: 2rem;
    width: 100%;
    text-align: center;
    border-radius: 0.5rem;
  }
`;

const Home: NextPage = () => {
  const [entered, setEntered] = useState('');

  return (
    <Container>
      <h1>To Timesheet</h1>
      <input
        type="text"
        value={entered}
        onChange={({ target: { value } }) => setEntered(value)}
      />
    </Container>
  );
};

export default Home;
