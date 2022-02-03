import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;

  section#title {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    border-bottom: none;
    padding: 12px 15px;
  }

  section#form > form {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;

    label {
      font-weight: bold;
      color: #949494;
    }

    & > div {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      column-gap: 1rem;

      &:nth-child(2) > div:first-child {
        flex-direction: row;
        gap: 0.2rem;
      }

      &:nth-child(3) {
        grid-template-columns: 5fr 1fr;

        & > div {
          display: block;

          button {
            display: flex;
            align-items: stretch;
            background-color: #00a651;
            border: none;
            border-radius: 4px;
            padding: 0;

            span,
            svg {
              padding: 6px 12px;
              color: #fff;
            }

            svg {
              background-color: #007d3d;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              width: 10px;
              height: auto;

              path {
                fill: #fff;
              }
            }
          }
        }
      }

      & > div {
        display: flex;
        flex-direction: column;
        row-gap: 0.4rem;
      }
    }
  }
`;

const CreateAppointmentStyles = { Container };

export default CreateAppointmentStyles;
