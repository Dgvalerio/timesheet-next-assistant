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

  main {
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

    section:nth-child(2) {
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      border-bottom: none;
      padding: 12px 15px;
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

    section:nth-child(3) > form {
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

    section:nth-child(4) {
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

    section:nth-child(5) {
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

    section:nth-child(6) {
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

export const WorksheetReadStyles = {
  Container,
};
