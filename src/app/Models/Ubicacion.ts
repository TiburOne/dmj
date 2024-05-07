import { Base } from "./Base";

export class Ubicacion implements Base{

  id: number = 0;
  static endpoint: string = "/ubicacion";

  latitud: number = 0;
  longitud: number = 0;
  nombre: string = "";
  ciudad: string = "";
  provincia: string = "";

  getText(): string {
    throw new Error("Method not implemented.");
  }

  getEndPoint(): string {
    return '/api/especies';  // Devuelve el endpoint específico para la clase Especie
  }

}
