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
    width: 100%;

    label {
      font-weight: bold;
      color: #949494;
    }

    & > div {
      display: flex;
      column-gap: 1rem;

      .checkbox-group {
        flex-direction: row;
        gap: 0.2rem;
      }

      .button-group {
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

      & > div {
        display: flex;
        flex-direction: column;
        row-gap: 0.4rem;
        flex: 1;
        min-width: calc((100% - 80px) / 6) !important;
        max-width: calc((100% - 80px) / 6) !important;

        &.textarea-group {
          min-width: calc((100% / 6) * 5) !important;
          max-width: calc((100% / 6) * 5) !important;
        }
      }
    }
  }
`;

const CreateAppointmentStyles = { Container };

export default CreateAppointmentStyles;
