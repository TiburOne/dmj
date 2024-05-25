import { Base } from "./Base";
import { TipoAcoplado } from "./Tipo_Acoplado";
import { Transportista } from "./Transportista";

export class Acoplado implements Base {

  id: number;
  id_transportista: number;
  dominio: string;
  id_tipo_acoplado : number;
  transportista?: Transportista; // Suponiendo que tienes un DTO para Transportista
  tipo_acoplado?: TipoAcoplado; // Suponiendo que tienes un DTO para TipoAcoplado

  constructor(data: any) {
    this.id = data.id;
    this.id_transportista = data.id_transportista;
    this.dominio = data.dominio;
    this.id_tipo_acoplado  = data.id_tipo_acoplado ;
    this.transportista = data.transportista;
    this.tipo_acoplado = data.tipo_acoplado;
  }

  getText(): string {
    return this.dominio;
  }
}
