import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppSecurityService } from '../../../services/security/app-security.service';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { PanelMenu } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-portal',
  standalone: true,
  imports: [FormsModule, Menu, Button, PanelMenu, RouterOutlet, ToastModule, CommonModule],
  templateUrl: './home-portal.html',
  styleUrl: './home-portal.css'
})
export class HomePortal {
  // Sidebar mobile toggles
  isSidebarOpen: boolean = false;

  constructor(
    private appSecurityService: AppSecurityService,
    private router: Router
  ) {}

  // Menú principal
  menu: MenuItem[] = [
    { 
      label: 'Inicio', 
      icon: 'pi pi-home', 
      routerLink: ['/home'],
      command: () => this.closeSidebar()
    },
    { 
      label: 'Clientes', 
      icon: 'pi pi-users', 
      routerLink: ['/home/clientes'],
      command: () => this.closeSidebar()
    },
    { 
      label: 'Cuentas', 
      icon: 'pi pi-wallet', 
      routerLink: ['/home/cuentas'],
      command: () => this.closeSidebar()
    },
    { 
      label: 'Banco', 
      icon: 'pi pi-building-columns', 
      routerLink: ['/home/bancos'],
      command: () => this.closeSidebar()
    }
  ];

  userMenuItems: MenuItem[] = [
    { label: 'Perfil', icon: 'pi pi-user', command: () => this.goToProfile() },
    { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  logout() {
    this.appSecurityService.logout(); 
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }
}
