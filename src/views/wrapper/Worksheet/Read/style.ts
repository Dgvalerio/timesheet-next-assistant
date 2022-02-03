import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex: 1;
  font-size: 12px;

  aside {
    width: 280px;
    background-color: ${({ theme }) => theme.azure.colors.backgroundDark};

    & > div {
      padding: 35px;
    }

    nav {
      display: flex;
      flex-direction: column;

      button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 10px 20px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid rgba(69, 74, 84, 0.7);
        color: #aaabae;

        svg {
          fill: #aaabae;

          &:last-child {
            width: 8px;
            height: 8px;
            margin-left: auto;
          }
        }
      }
    }
  }

  > main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    background-color: white;
    color: ${({ theme }) => theme.azure.colors.backgroundLight};
    padding: 20px;

    header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-bottom: 1rem;

      & > div:nth-child(1) {
        display: flex;
        align-items: center;
        gap: 1.8rem;
        padding-bottom: 9px;

        & > div:nth-child(1) {
          display: flex;
          align-items: center;
          gap: 9px;

          span:first-child {
            border-radius: 50%;
            border: 2px solid #f5f5f5 !important;
          }

          span:not(:first-child) {
            font-size: 14px;
            padding-bottom: 2px;
          }
        }

        & > div:nth-child(2) {
          display: flex;
          flex-direction: column-reverse;

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #ee4749;
            width: 1rem;
            height: 1rem;
            color: #fff;
            margin-left: 8px;
            margin-bottom: -6px;
          }
        }

        button {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-left: auto;
          background-color: transparent;
          border: none;
        }
      }

      & > div:nth-child(3) {
        h1 {
          font-size: 25px;
          font-weight: normal;
          margin-bottom: -8px;
        }
      }
    }

    section {
      display: flex;
      flex-direction: row;
      padding: 1rem;
      border: 1px solid #eee;
    }

    input,
    select,
    textarea {
      padding: 6px 12px;
      border: 1px solid #ccc;
      border-radius: 2px;
      background-color: transparent;
      color: #555;
    }

    > section#footer {
      display: flex;
      justify-content: center;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;

      button {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 5px 14px;
        border: 1px solid #ddd;
        border-radius: 3px;
        gap: 6px;
      }
    }

    footer {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1rem;
    }

    hr {
      border: none;
      border-bottom: 1px solid #eee;
    }
  }
`;

const WorksheetReadStyles = { Container };

export default WorksheetReadStyles;
