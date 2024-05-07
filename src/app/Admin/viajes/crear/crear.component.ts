import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  center = { lat: 24.886, lng: -70.268 };  // Ajusta esto a una ubicación inicial
  zoom = 13;
  marker: google.maps.Marker;
  height: string = '600px';
  width: string = '600px';

  form: FormGroup;

  apiKey: string = 'AIzaSyDt6JlDHbP_hgr60wVKfdUdrO21ywD1S10';

  constructor(private fb: FormBuilder, private geocodingService: GeocodingService) {

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

  fetchLocationData(lat: number, lng: number) {
    this.geocodingService.getGeocode(lat, lng, this.apiKey).subscribe({
      next: (response: any) => {
        if (response.results && response.results.length > 0) {
          const firstResult = response.results[0];
          const city = firstResult.address_components.find((ac:any) => ac.types.includes('locality'))?.long_name;
          const province = firstResult.address_components.find((ac:any) => ac.types.includes('administrative_area_level_1'))?.long_name;
          const address = firstResult.formatted_address;
          this.form.patchValue({
            latitud: lat,
            longitud: lng,
            ciudad: city,
            provincia: province,
            direccion: address
          });
        }
      },
      error: (e) => console.error('Error fetching geocode:', e)
    });
  }

  saveForm() {
    if (this.form.valid) {
      console.log('Guardando datos:', this.form.value);
      // Aquí puedes procesar el formulario como necesites
    } else {
      console.error('Formulario no es válido');
      this.markAllAsTouched();
      // Puedes mostrar un mensaje al usuario o manejar la validación fallida como prefieras
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

}
