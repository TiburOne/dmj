import { Base } from "./Base";

export class Ubicacion implements Base{

  id: number = 0;
  static endpoint: string = "/ubicacion";

  latitud: number = 0;
  longitud: number = 0;
  nombre: string = "";
  ciudad: string = "";
  provincia: string = "";
  direccion: string= "";

  constructor(data?: any) {
    this.id = data?.id;
    this.nombre = data?.nombre;
    this.ciudad = data?.ciudad;
    this.provincia = data?.provincia;
    this.direccion = data?.direccion;
  }

  getText(): string {
    return this.nombre + this.direccion;
  }

  getEndPoint(): string {
    return '/api/especies';  // Devuelve el endpoint específico para la clase Especie
  }

}
