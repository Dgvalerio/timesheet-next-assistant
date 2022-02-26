import axios, { Axios } from 'axios';
import Protocol from 'devtools-protocol';

namespace Scrapper {
  export namespace SignIn {
    export interface Request {
      login: string;
      password: string;
    }

    export type Response =
      | {
          cookies: Protocol.Network.Cookie[];
          error?: never;
        }
      | {
          cookies?: never;
          error: string;
        };
  }

  export namespace Read {
    export namespace Appointment {
      export interface Request {
        cookies: Protocol.Network.Cookie[];
        appointmentId: string;
      }

      export interface Appointment {
        Worksheet: null;
        Require: null;
        Evaluate: null;
        TotalRows: number;
        PageSize: number;
        Table: null;
        Id: number;
        IdRequire: null;
        IdCustomer: number;
        CustomerName: null;
        IdProject: number;
        ProjectName: null;
        StartDate: null;
        EndDate: null;
        IdCell: number;
        CellName: null;
        IdCategory: number;
        IdManager: number;
        IdDeveloper: number;
        IsMaster: boolean;
        IdAncestor: number;
        DeveloperName: null;
        HourValue: null;
        ExtraValue: null;
        CategoryName: null;
        InformedDate: string;
        Created: null;
        StartTime: string;
        EndTime: string;
        TotalTime: null;
        NotMonetize: boolean;
        Description: string;
        CommitRepository: string | null;
        IsDeleted: boolean;
        TotalTimeInProject: null;
        ConsumedTimeInProject: null;
        IdEvaluate: null;
        IsApprove: null;
        IsReprove: null;
        IsReview: null;
        IsWait: null;
        IsPreApproved: null;
        TimePreApproved: null;
        UserPreApproved: null;
        IsPaid: boolean;
        ConsumedTimeInProjectExceded: boolean;
        TimeInWorksheetExceded: number;
        IsEvaluate: boolean;
        TypeReport: null;
        SumTotalTime: null;
        TotaltimeInMinutes: number;
        IdCustomerPreSelected: null;
        IdProjectPreSelected: null;
        IdDeveloperPreSelected: null;
        IsEvaluatePreSelected: boolean;
      }

      export type Response =
        | {
            appointment: Appointment;
            error?: never;
          }
        | {
            appointment?: never;
            error: string;
          };
    }

    export namespace Appointments {
      export interface Request {
        cookies: Protocol.Network.Cookie[];
      }

      export interface Appointment {
        id: string;
        cliente: string;
        projeto: string;
        categoria: string;
        data: string;
        horaInicial: string;
        horaFinal: string;
        descricao: string;
        naoContabilizado: boolean;
        avaliacao: string;
        commit: string;
      }

      export type Response =
        | {
            appointments: Appointment[];
            error?: never;
          }
        | {
            appointments?: never;
            error: string;
          };
    }

    export namespace Clients {
      export interface Request {
        cookies: Protocol.Network.Cookie[];
      }

      export interface Client {
        id: string;
        title: string;
        projects: Project[];
      }

      export interface Project {
        Id: number;
        Name: string;
        StartDate: string;
        EndDate: string;
        IdCustomer: number;
        categories: Category[];
        progress: ProjectProgress;
      }

      export interface Category {
        Id: number;
        Name: string;
        IdProject: number;
      }

      export interface ProjectProgress {
        Id: number;
        IdCell: null;
        CellName: null;
        IdCustomer: number;
        CustomerName: string;
        IdProject: number;
        ProjectName: string;
        IsMaintenance: boolean;
        HourLimitPerMonth: null;
        Budget: number;
        NotMonetize: boolean;
        StartDate: string;
        EndDate: string;
        TotalTime: string;
        TotalTimeMounth: string;
        TotalTimeInProject: string;
        ConsumedTimeInProject: string;
      }

      export type Response =
        | {
            clients: Client[];
            error?: never;
          }
        | {
            clients?: never;
            error: string;
          };
    }
  }

  export namespace Create {
    export namespace Appointment {
      export interface Request {
        cookies: Protocol.Network.Cookie[];
        customer: string;
        project: string;
        category: string;
        informedDate: string;
        startTime: string;
        endTime: string;
        notMonetize: boolean;
        description: string;
        commit?: string;
      }

      export type Response =
        | {
            data: string;
            error?: never;
          }
        | {
            data?: never;
            error: string;
          };
    }
  }

  export interface Interface {
    check(): Promise<string>;
    signIn(signInDto: SignIn.Request): Promise<SignIn.Response>;
    readAppointments(
      readAppointmentsDto: Read.Appointments.Request
    ): Promise<Read.Appointments.Response>;
    readAppointment(
      readAppointmentDto: Read.Appointment.Request
    ): Promise<Read.Appointment.Response>;
    readClients(
      readClientsDto: Read.Clients.Request
    ): Promise<Read.Clients.Response>;
    createAppointment(
      createAppointmentDto: Create.Appointment.Request
    ): Promise<Create.Appointment.Response>;
  }
}

/** @module ScrapperApi  */
class ScrapperController implements Scrapper.Interface {
  private api: Axios;

  /** Set axios instance */
  constructor() {
    this.api = axios.create({
      baseURL: 'https://timesheet-express-assistant.herokuapp.com',
    });
  }

  /**
   * Check api
   * @return {string}
   * */
  async check(): Promise<string> {
    const { data } = await this.api.get('/');

    return data;
  }

  /**
   * createAppointment
   * @param {Scrapper.Create.Appointment.Request} createAppointmentDto
   * @return {Scrapper.Create.Appointment.Response}
   * */
  async createAppointment(
    createAppointmentDto: Scrapper.Create.Appointment.Request
  ): Promise<Scrapper.Create.Appointment.Response> {
    const { data } = await this.api.post(
      '/scrapper/create-appointment',
      createAppointmentDto
    );

    return data;
  }

  /**
   * readAppointments
   * @param {Scrapper.Read.Appointments.Request} readAppointmentsDto
   * @return {Scrapper.Read.Appointments.Response}
   * */
  async readAppointments(
    readAppointmentsDto: Scrapper.Read.Appointments.Request
  ): Promise<Scrapper.Read.Appointments.Response> {
    const { data } = await this.api.post(
      '/scrapper/read-appointments',
      readAppointmentsDto
    );

    return data;
  }

  /**
   * readAppointment
   * @param {Scrapper.Read.Appointment.Request} readAppointmentDto
   * @return {Scrapper.Read.Appointment.Response}
   * */
  async readAppointment(
    readAppointmentDto: Scrapper.Read.Appointment.Request
  ): Promise<Scrapper.Read.Appointment.Response> {
    const { data } = await this.api.post(
      '/scrapper/read-appointment',
      readAppointmentDto
    );

    return data;
  }

  /**
   * readClients
   * @param {Scrapper.Read.Clients.Request} readClientsDto
   * @return {Scrapper.Read.Clients.Response}
   * */
  async readClients(
    readClientsDto: Scrapper.Read.Clients.Request
  ): Promise<Scrapper.Read.Clients.Response> {
    const { data } = await this.api.post(
      '/scrapper/read-clients',
      readClientsDto
    );

    return data;
  }

  /**
   * signIn
   * @param {Scrapper.SignIn.Request} signInDto
   * @return {Scrapper.SignIn.Response}
   * */
  async signIn(
    signInDto: Scrapper.SignIn.Request
  ): Promise<Scrapper.SignIn.Response> {
    const { data } = await this.api.post('/scrapper/sign-in', signInDto);

    return data;
  }
}

export const ScrapperApi = new ScrapperController();
