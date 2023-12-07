import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  user: any; // Datos del usuario
  editedName: string = '';
  editedDescription: string = '';
  editedCity: string = '';
  editedCountry: string = '';
  editedEmail: string = '';
  isEditing: boolean = false;
  isEditingInterests: boolean = false;
  isEditingFrameworks: boolean = false;
  editedInterests: { [key: number]: string } = {};
  editedFrameworks: { [key: number]: string } = {};

  constructor(private apiService: ApiService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.apiService.get().subscribe((data: any) => {
      this.user = data;
      console.log(this.user);
    });
  }

  editProfile() {
    this.isEditing = true;
    this.editedName = this.user.$values[0].Name;
    this.editedDescription = this.user.$values[0].Description;
    this.editedCity = this.user.$values[0].City;
    this.editedCountry = this.user.$values[0].Country;
    this.editedEmail = this.user.$values[0].Email;
  }

  saveProfile() {
    const id = this.user.$values[0].Id;
    const updatedData = {
      Name: this.editedName,
      Description: this.editedDescription,
      City: this.editedCity,
      Country: this.editedCountry,
      Email: this.editedEmail,
    };

    this.apiService.updateProfile(id, updatedData).subscribe(
      (response) => {
        // Manejar la respuesta de la API si es necesario
        console.log('Perfil actualizado correctamente:', response);

        // Establecer isEditing en falso para volver a la vista no editable
        this.isEditing = false;

        // Actualizar los datos locales del usuario si es necesario
        this.user.$values[0].Name = this.editedName;
        this.user.$values[0].Description = this.editedDescription;
        this.user.$values[0].City = this.editedCity;
        this.user.$values[0].Country = this.editedCountry;
        this.user.$values[0].Email = this.editedEmail;
      },
      (error) => {
        // Manejar errores de la API si es necesario
        console.error('Error al actualizar el perfil:', error);
      }
    );
  }

  editInterests() {
    this.isEditingInterests = true;
    // Inicializa los campos editables con los valores actuales
    this.user.$values[0].Interests.$values.forEach((interest: any) => {
      this.editedInterests[interest.Id] = interest.Description;
    });
  }

  saveInterests() {
    // Actualiza los intereses en el servidor
    this.user.$values[0].Interests.$values.forEach((interest: any) => {
      const editedInterest = this.editedInterests[interest.Id];
      if (editedInterest !== interest.Description) {
        this.apiService.updateInterest(interest.Id, { Description: editedInterest }).subscribe(() => {
          // Actualización exitosa, puedes manejarlo aquí
        });
      }
    });

    // Finaliza el modo de edición
    this.isEditingInterests = false;
  }

  editFrameworks() {
    this.isEditingFrameworks = true;
    // Inicializa los campos editables con los valores actuales
    this.user.$values[0].Frameworks.$values.forEach((framework: any) => {
      this.editedFrameworks[framework.Id] = framework.Description;
    });
  }

  saveFrameworks() {
    // Actualiza los frameworks en el servidor
    this.user.$values[0].Frameworks.$values.forEach((framework: any) => {
      const editedFramework = this.editedFrameworks[framework.Id];
      if (editedFramework !== framework.Description) {
        this.apiService.updateFramework(framework.Id, { Description: editedFramework }).subscribe(() => {
          // Actualización exitosa, puedes manejarlo aquí
        });
      }
    });

    // Finaliza el modo de edición
    this.isEditingFrameworks = false;
  }





}
