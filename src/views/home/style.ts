import styled from 'styled-components';

const Container = styled.main`
  margin: auto;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h1 {
    font-size: 2rem;
    text-align: center;
  }

  button {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0.25rem 1rem;
    border: none;
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    border-radius: 0.5rem;

    &:hover {
      transition: 0.2s;
      background-color: rgba(217, 217, 217, 0.2);
    }
  }
`;

const HomeStyles = { Container };

export default HomeStyles;
