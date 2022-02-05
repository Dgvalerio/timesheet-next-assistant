/* eslint-disable */
/// <reference types="cypress" />
type IAppointment = {
  IdCustomer: string;
  IdProject: string;
  IdCategory: string;
  InformedDate: string;
  StartTime: string;
  EndTime: string;
  Description: string;
};

const appointments: IAppointment[] = [
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '07:30',
    EndTime: '08:15',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '5. Criando testes para o SignUp 13\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/f327461aa0ce93467c446b730c45c2404c312385\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '08:16',
    EndTime: '09:11',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '1. Criando o AddAccount UseCase\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/54fb3750c7d45fca6b250300b7a6b004fbc30be3\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '09:12',
    EndTime: '09:37',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '2. Criando o CompareFieldsValidation\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/2f44f4e2ec2668ff76844b197beaceb7b7cf941f\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '09:38',
    EndTime: '09:43',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '3. Corrigindo bug no Eslint\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '09:44',
    EndTime: '10:29',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '6. Criando testes para o SignUp 23\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/285722076ac1a9e4ecdf26166d29d55bc8a84717\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '10:30',
    EndTime: '11:10',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '7. Criando testes para o SignUp 33\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/0c9e601244c662ffa3b8889c0786205ca76b4633\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '11:11',
    EndTime: '11:31',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '8. Criando um componente para o SubmitButton\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/1c4877fa829a8283ff044727a1d3626fa963ea28\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '11:32',
    EndTime: '12:47',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 9: SignUp\n' +
      '9. Criando a composição do SignUp\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/366332c52790784c928b627eb9647d0cf323f8f6\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '23092021',
    StartTime: '12:48',
    EndTime: '13:38',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 10: Testes de Integração com Cypress (Iniciando)\n' +
      '1. Configurando o Cypress\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '24092021',
    StartTime: '07:30',
    EndTime: '08:29',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 10: Testes de Integração com Cypress (Continuando)\n' +
      '1. Configurando o Cypress\n' +
      '\n' +
      'Estudando documentação do Cypress\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '24092021',
    StartTime: '08:30',
    EndTime: '10:31',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 10: Testes de Integração com Cypress (Finalizando)\n' +
      '1. Configurando o Cypress\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/c7351b2bdcc3ac3f86d624c2d19fb875ad7afc85\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '24092021',
    StartTime: '10:32',
    EndTime: '10:51',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 10: Testes de Integração com Cypress\n' +
      '2. Criando testes de integração para o Login 12\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/3969ae7f23d61cab58a7a7fc99c498c55bad3a6a\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '24092021',
    StartTime: '10:52',
    EndTime: '11:23',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 10: Testes de Integração com Cypress\n' +
      '3. Criando testes de integração para o Login 22\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/9b009e5a9af8afea619bcb4aa73213a859244bf9\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '24092021',
    StartTime: '11:24',
    EndTime: '11:57',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 10: Testes de Integração com Cypress\n' +
      '4. Criando input com animação\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/95bbef387313415c8410891c14d5b04fa0ed81db\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '24092021',
    StartTime: '11:58',
    EndTime: '12:58',
    Description:
      'Vendo aulas de "ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns"\n' +
      '\n' +
      'Seção 10: Testes de Integração com Cypress\n' +
      '5. Mockando requests nos testes de integração\n' +
      '\n' +
      'https://github.com/Dgvalerio/reactjs-hooks-tdd-clean-architecture-solid-and-patterns/commit/9451450ed0cb52a6b2f92b4859cf23151355ccc0\n',
  },
  {
    IdCustomer: 'LUBY',
    IdProject: 'Incubadora JS',
    IdCategory: 'Laboratório',
    InformedDate: '24092021',
    StartTime: '12:59',
    EndTime: '13:30',
    Description:
      'Correção da prova do modulo de JavaScript\n' +
      '\n' +
      '- Felipe Alvarenga\n',
  },
];

describe(
  'Luby TimeSheet',
  { baseUrl: 'https://luby-timesheet.azurewebsites.net' },
  () => {
    it('Registrando apontamentos do dia.', () => {
      cy.log('Realizando login.');

      (() => {
        cy.visit('/');

        cy.get('#Login').type('davi.valerio@luby.software');
        cy.get('#Password').type('-b_jUn82k7');

        cy.intercept('POST', '**/').as('login');

        cy.get('.btn').click();

        cy.wait('@login').then(({ response }) =>
          expect(response?.statusCode).be.eq(302)
        );
      })();

      cy.log('Navegando para página de registro de apontamentos.');

      (() => {
        cy.url().should('contain', '/Home/Index');

        cy.get('#main-menu > :nth-child(1) > [href="#"]').click();
        cy.get('.visible > li > a > .title').click();
      })();

      cy.log('Realizando um apontamento.');

      appointments.forEach((a) => {
        cy.url().should('contain', '/Worksheet/Read');

        cy.intercept('**/Worksheet/ReadProject').as('typeCliente');

        cy.get('#IdCustomer').select(a.IdCustomer);

        cy.wait('@typeCliente').then(({ response }) => {
          expect(response?.statusCode).be.eq(200);
        });

        cy.intercept('**/Worksheet/ReadCategory').as('ReadCategory');
        cy.intercept('**/Worksheet/ReadProjectProgress').as(
          'ReadProjectProgress'
        );

        cy.get('#IdProject').select(a.IdProject);

        cy.wait('@ReadCategory').then(({ response }) =>
          expect(response?.statusCode).be.eq(200)
        );
        cy.wait('@ReadProjectProgress').then(({ response }) =>
          expect(response?.statusCode).be.eq(200)
        );

        cy.get('#IdCategory').select(a.IdCategory);

        cy.get('#InformedDate').type(a.InformedDate);

        cy.get('#StartTime').type(a.StartTime);

        cy.get('#EndTime').type(a.EndTime);

        cy.get('#NotMonetize').check();

        cy.get('#Description').type(a.Description);

        cy.intercept('POST', '**/Worksheet/Update').as('addingAppointment');

        cy.get('.col-md-2 > .btn').click();

        cy.wait('@addingAppointment').then(({ response }) =>
          expect(response?.statusCode).be.eq(302)
        );
      });

      cy.url().should('contain', '/Worksheet/Read');
    });
  }
);
