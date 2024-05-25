import { Base } from "./Base";

export class Camion implements Base {

  id: number;
  id_transportista: number;
  dominio: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(data:any){
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.dominio = data.dominio;
    this.id_transportista = data.id_transportista;
  }

  getText(): string {
    return this.dominio;
  }

}
