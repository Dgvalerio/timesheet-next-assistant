import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  flex-direction: column;

  section#table {
    border-top: none;
    border-bottom: none;
    padding: 0;

    table {
      display: flex;
      flex-direction: column;

      thead,
      tbody,
      tfoot {
        & > tr {
          display: grid;
          grid-template-columns: repeat(10, 1fr);

          &:nth-child(odd) {
            background-color: #f9f9f9;
          }

          th,
          td {
            display: flex;
            justify-content: center;
            padding: 15px 10px;
          }

          td {
            color: #777;

            & > button {
              color: #303641;
              background-color: #f0f0f1;
              border: none;
              padding: 5px 10px;
              border-radius: 2px;

              svg {
                width: 8px;
                height: 8px;
              }
            }

            & > span {
              padding: 2px 5px;
              color: #fff;
              border-radius: 2px;
              margin: auto;

              &.unapproved {
                background-color: #34495e;
              }

              &.approved {
                background-color: #16a085;
              }
            }
          }
        }
      }

      tfoot {
        td {
          padding: 0.6rem;

          input {
            background-color: #fff;
            width: 100%;
          }
        }
      }
    }
  }

  section#info {
    border-top: none;
    border-bottom: none;
    justify-content: space-between;
    align-items: center;

    span {
      color: #949494;
    }

    nav {
      display: flex;
      align-items: stretch;

      button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        border: 1px solid #eee;
        border-radius: 0;
        background-color: transparent;
        padding: 6px 12px;

        &.active {
          background-color: #262b34;
          color: #fff;
        }

        &:first-child {
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }

        &:last-child {
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        &:not(:last-child) {
          border-right: none;
        }

        svg {
          width: 8px;
          height: 8px;
        }
      }
    }
  }
`;

const ListAppointmentsStyles = { Container };

export default ListAppointmentsStyles;
