import { Component } from '@angular/core';
import { JuiceService } from '../../../services/juice.service';
import { Juice } from '../../../shared/models/Juice';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-items',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css']
})
export class AdminItemsComponent {
  juices: Juice[] = [];
  newJuice: Juice = {
    id: '',
    name: '',
    price: 0,
    tags: [],
    imageUrl: '',
    origins: [],
    favorite: true,
    prepareTime: '',
  };
  selectedJuice: Juice | null = null;
  showAddForm: boolean = false; 
  selectedActionJuiceId: string | null = null;


  constructor(private juiceService: JuiceService) {
    this.loadJuices();
  }

  loadJuices(): void {
    this.juiceService.getAll().subscribe(juices => {
      this.juices = juices;
    });
  }

  addJuice(): void {
    this.juiceService.addJuice(this.newJuice).subscribe({
      next: (response) => {
        console.log('Juice added successfully:', response.juice);
        this.juices.push(response.juice);
        this.resetNewProduct(); 
        this.toggleAddForm(); 
      },
      error: (error) => {
        console.error('Error adding juice:', error);
      }
    });
  }





  cancelUpdate(): void {
    this.selectedJuice = null; 
  }

  toggleActionMenu(juiceId: string): void {
    this.selectedActionJuiceId = this.selectedActionJuiceId === juiceId ? null : juiceId;
  }

  confirmDelete(juiceId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this juice!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteJuice(juiceId);
      }
    });
  }

  deleteJuice(juiceId: string): void {
    if (confirm('Are you sure that you want to delete this juice?')) {
      this.juiceService.deleteJuice(juiceId).subscribe(() => {
        this.juices = this.juices.filter(p => p.id !== juiceId);
        console.log("Juice deleted successfully", juiceId);
      }, error => {
        console.error('Error while deleting:', error);
      });
    }
  }

  private resetNewProduct(): void {
    this.newJuice = {
      id: '',
      name: '',
      price: 0,
      tags: [],
      imageUrl: '',
      origins: [],
      favorite: true,
      prepareTime: '',
    };
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }
}
