import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.azure.colors.backgroundDark};
  flex: 1;

  section {
    display: flex;
    justify-content: center;

    & > form,
    & > div {
      width: 100%;
      max-width: 20rem;
    }
  }

  section:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: ${({ theme }) => theme.azure.colors.backgroundLight};

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 6rem 4rem 4rem;

      p {
        font-size: 0.8rem;
        color: ${({ theme }) => theme.azure.colors.text};
      }
    }

    &::after {
      content: '';
      margin-bottom: -1rem;

      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-top: 1rem solid
        ${({ theme }) => theme.azure.colors.backgroundLight};
    }
  }

  section:last-child {
    padding: 4rem;

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      div {
        display: flex;
        align-items: center;
        flex: 1;
        border-radius: 0.2rem;
        background-color: ${({ theme }) => theme.azure.colors.backgroundLight};

        svg {
          padding: 0 1rem;
          border-right: 1px solid #454a54;
          color: #454a54;

          path {
            fill: #555;
          }
        }
      }

      button,
      input {
        color: #fff;
        font-size: 0.9rem;
      }

      input {
        width: 100%;
        background-color: transparent;
        border: none;
        text-align: left;
        padding: 1rem;

        &:-webkit-autofill {
          background-color: transparent;
        }
      }

      button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${({ theme }) => theme.azure.colors.backgroundDark};
        border: 1px solid #454a54;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 1rem;

        svg > path {
          fill: #fff;
        }

        &:hover {
          background-color: ${({ theme }) =>
            theme.azure.colors.backgroundLight};
        }
      }

      a {
        margin-top: 2rem;
        text-align: center;
        text-decoration: none;
        color: ${({ theme }) => theme.azure.colors.text};
        font-size: 0.9rem;
      }
    }
  }
`;

export const LoginStyles = {
  Container,
};
