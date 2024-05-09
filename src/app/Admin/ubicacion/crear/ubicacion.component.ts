import { Component, Inject, OnInit } from '@angular/core';
import { GeocodingService } from '../../services/geocoding.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDService, SERVICE_CONFIG } from '../../services/crud.service';
import { Ubicacion } from 'src/app/Models/Ubicacion';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';

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
export class UbicacionComponent implements OnInit {

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

  constructor(private fb: FormBuilder, private geocodingService: GeocodingService, private crudService: CRUDService<Ubicacion>,
    public dialogRef: MatDialogRef<UbicacionComponent>, @Inject(MAT_DIALOG_DATA) public data: Ubicacion | null) {

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
    if (this.data) {
      this.form.patchValue(this.data);
      this.setMarker(this.data.latitud, this.data.longitud);
      this.center = { lat: this.data.latitud, lng: this.data.longitud };

    }
    else {
      this.getCurrentPosition();
    }
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

  markerOptions: google.maps.MarkerOptions = {
    icon: '/assets/google_maps_new_logo_icon.png',

  };

  setMarker(lat: number, lng: number) {

    const svgMarker = {
      path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(0, 20),
    };

    this.markerOptions = {
      icon: svgMarker,
      draggable: true,
      title: "Location",
      label: "Locxtion",
      animation: google.maps.Animation.DROP,
    };
    this.marker = new google.maps.Marker({
      position: {
        lat: lat,
        lng: lng
      },

      label: {
        text: 'Ubicación',  // Puedes personalizar este texto
        fontWeight: 'Bold',
        fontSize: '16px',
        color: 'red'
      },
      draggable: true,
      title: 'Ubicación Seleccionada',  // Tooltip que aparece al pasar el mouse sobre el marcador
        // Animación al aparecer el marcador

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
      ubicacion.direccion = direccion;

      if (this.data && this.data.id > 0) {
        ubicacion.id = this.data.id;
        this.crudService.update(this.data.id, ubicacion).subscribe({
          next: (res) => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Error actualizando ubicación:', err);
            Swal.fire('Error', 'No se pudo actualizar la ubicación', 'error');
          }
          //error => Swal.fire('Error', 'No se pudo actualizar la ubicación', 'error')
        });
      } else {
        this.crudService.create(ubicacion).subscribe({
          next: (res) => {
            console.log('Ubicación creada con éxito:', res);
            this.dialogRef.close(true);

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

      }

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

  onMapEndDrag($event: any) {
    console.log($event);
    this.setMarker($event.latLng.lat(), $event.latLng.lng())
    this.center = { lat: $event.latLng.lat(), lng: $event.latLng.lng() };

      this.fetchLocationData($event.latLng.lat(), $event.latLng.lng());
  }

}
