import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { provideHttpClient } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideHttpClient(), provideRouter(routes),
    MessageService,
    DialogService,
    ConfirmationService,
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
            }
        })
  ]
};
/*

https://www.geeksforgeeks.org/angular-js/formbuilder-service-in-angular/
FormBuilder service in Angular - GeeksforGeeks
Your All-in-One Learning Portal: GeeksforGeeks is a comprehensive educational platform that empowers learners across domains-spanning computer science and programming, school education, upskilling,...
 
miForm!: FormGroup;
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit(): void {

    this.miForm = this.fb.group({

      nombre:    ['', [Validators.required, Validators.minLength(3)]],

      email:     ['', [Validators.required, Validators.email]],

      edad:      [null, [Validators.min(0), Validators.max(120)]],

      acepto:    [false, Validators.requiredTrue]

    });

  }
 
 
  */