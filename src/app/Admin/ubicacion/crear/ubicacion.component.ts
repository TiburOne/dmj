import { Component } from '@angular/core';
import { GeocodingService } from '../../services/geocoding.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService, SERVICE_CONFIG } from '../../services/crud.service';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css'],
  providers: [
    CRUDService,
    {
      provide: SERVICE_CONFIG,
      useValue: { endpoint: 'ubicacion' }
    }
  ],
})
export class UbicacionComponent {
  center = { lat: 24.886, lng: -70.268 };  // Ajusta esto a una ubicación inicial
  zoom = 13;
  marker: google.maps.Marker;
  height: string = '600px';
  width: string = '600px';

  form: FormGroup;

  apiKey: string = 'AIzaSyDt6JlDHbP_hgr60wVKfdUdrO21ywD1S10';
  addresses: string[] = [];
  customAddress: string = '';
  isAddressEditable: boolean = false;

  constructor(private fb: FormBuilder, private geocodingService: GeocodingService, private crudService: CRUDService<Ubicacion>) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],  // Validación de campo requerido
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.marker = new google.maps.Marker({  // Inicialización con un marcador predeterminado
      position: { lat: 24.886, lng: -70.268 },  // Posición inicial
      label: {
        color: 'red',
        text: 'Seleccionado',
      },
      title: 'Ubicación Seleccionada',
      animation: google.maps.Animation.DROP
    });
  }
  ngOnInit(): void {
    this.getCurrentPosition();
  }
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`Latitud: ${lat}, Longitud: ${lng}`);

      // Actualizar la posición del marcador cada vez que el usuario haga clic en el mapa
      this.setMarker(lat, lng);

      // Actualiza el centro del mapa al lugar del clic para mejorar la visualización
      this.center = { lat: lat, lng: lng };

      this.fetchLocationData(lat, lng);
    }
  }

  getCurrentPosition(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position?.coords.latitude ?? 46.788,
        lng: position?.coords.longitude ?? -71.3893,
      };
      this.setMarker(position?.coords.latitude ?? 46.788, position?.coords.longitude ?? -71.3893);
      this.fetchLocationData(position?.coords.latitude ?? 46.788, position?.coords.longitude ?? -71.3893);
    });
  }

  setMarker(lat: number, lng: number) {
    this.marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },
      label: {
        color: 'red',
        text: 'Seleccionado',  // Puedes personalizar este texto
      },
      title: 'Ubicación Seleccionada',  // Tooltip que aparece al pasar el mouse sobre el marcador
      animation: google.maps.Animation.DROP,  // Animación al aparecer el marcador
      //options: { animation: google.maps.Animation.DROP }
    });
  }

  // Función para actualizar el formulario con los datos del marcador
  updateForm(lat: number, lng: number, city: string, province: string, address: string) {
    this.form.setValue({
      latitud: lat,
      longitud: lng,
      ciudad: city,
      provincia: province,
      direccion: address
    });
  }

  cities: string[] = [];
  fetchLocationData(lat: number, lng: number) {
    this.geocodingService.getGeocode(lat, lng, this.apiKey).subscribe({
      next: (response: any) => {
        if (response.results && response.results.length > 0) {
          const firstResult = response.results[0];
          this.cities = response.results.map((result: any) => {
            const city = result.address_components.find((ac: any) => ac.types.includes('locality'))?.long_name;
            return city;
          }).filter((city: string | undefined) => city !== undefined);
          // Aquí también actualiza el formulario para establecer la primera ciudad obtenida o maneja como prefieras
          this.form.patchValue({
            ciudad: this.cities[0] || ''  // Establece la primera ciudad como valor por defecto o deja en blanco si no hay ciudades
          });
          const province = firstResult.address_components.find((ac: any) => ac.types.includes('administrative_area_level_1'))?.long_name;
          const address = firstResult.formatted_address;
          this.form.patchValue({

            provincia: province,
          });
        }
        this.addresses = response.results.map((result: any) => result.formatted_address);
        this.form.patchValue({
          latitud: lat,
          longitud: lng,
          direccion: this.addresses[0]  // Establece la primera dirección como valor por defecto
        });
        this.customAddress = this.addresses[0];
      },
      error: (e) => console.error('Error fetching geocode:', e)
    });
  }

  onAddressChange() {
    this.customAddress = this.form.get('direccion')?.value;
    this.isAddressEditable = true;  // Permite la edición después de seleccionar una dirección
  }

  saveForm() {
    if (this.form.valid) {
      console.log('Guardando datos:', this.form.value);

      const { nombre, latitud, longitud, ciudad, provincia, direccion } = this.form.value;

      // Creando la instancia del modelo con los datos del formulario
      const ubicacion = new Ubicacion();
      ubicacion.nombre = nombre;
      ubicacion.latitud = latitud;
      ubicacion.longitud = longitud;
      ubicacion.ciudad = ciudad;
      ubicacion.provincia = provincia;

      this.crudService.create(ubicacion).subscribe({
        next: (res) => {
          console.log('Ubicación creada con éxito:', res);
          Swal.fire({
            title: '¡Éxito!',
            text: 'La ubicación ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          // Opcional: redirigir o recargar componentes/página
        },
        error: (err) => {
          console.error('Error creando ubicación:', err);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear la ubicación.',
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        }
      });
      // Aquí puedes procesar el formulario como necesites
    } else {
      console.error('Formulario no es válido');
      this.markAllAsTouched();
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  }

  closeForm() {
    console.log('Formulario cerrado');
    this.form.reset();  // Esto limpia el formulario, quita los datos ingresados.
    // Aquí podrías añadir más lógica como cambiar la vista o esconder el formulario
  }

  markAllAsTouched() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  onCoordinatesChange() {
    const lat = parseFloat(this.form.get('latitud')?.value);
    const lng = parseFloat(this.form.get('longitud')?.value);
    if (!isNaN(lat) && !isNaN(lng)) {
      this.setMarker(lat, lng);
      this.center = { lat, lng }; // Actualiza el centro del mapa
      this.fetchLocationData(lat, lng);
    }
  }
  selectAll(event: MouseEvent): void {
    (event.target as HTMLInputElement).select();
  }
}
