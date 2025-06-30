# MiniBank
📁 src
├── 📁 app
│   ├── 📁 core
│   │   └── 📁 services
│   │       ├── appService.ts
│   │       └── 📁 UI
│   │           └── ui.service.ts
│   ├── 📁 mods
│   │   ├── 📁 account
│   │   │   ├── 📁 components
│   │   │   │   └── 📁 nombre-table
│   │   │   │       ├── nombre-table.css
│   │   │   │       ├── nombre-table.html
│   │   │   │       └── nombre-table.ts
│   │   │   ├── 📁 dialogs
│   │   │   │   ├── 📁 nombre-add
│   │   │   │   │   ├── nombre-add.dialog.css
│   │   │   │   │   ├── nombre-add.dialog.html
│   │   │   │   │   └── nombre-add.dialog.ts
│   │   │   │   └── 📁 nombre-edit
│   │   │   │       ├── nombre-edit.dialog.css
│   │   │   │       ├── nombre-edit.dialog.html
│   │   │   │       └── nombre-edit.dialog.ts
│   │   │   ├── 📁 models
│   │   │   │   └── nombre-model.ts
│   │   │   ├── 📁 pages
│   │   │   │   └── 📁 nombre-page
│   │   │   │       ├── nombre-page.css
│   │   │   │       ├── nombre-page.html
│   │   │   │       └── nombre-page.ts
│   │   │   └── 📁 services
│   │   │       └── nombre-api.service.ts
│   │   ├── 📁 banks
│   │   └── 📁 customer
│   ├── 📁 portals
│   │   ├── 📁 main
│   │   └── 📁 pub
│   │      
│   ├── 📁 services
│   │   ├── security
│   │   │   ├── app-security.service.ts
│   │   │   └── auth.guard.ts
│   ├── 📁 shared
│   │   ├── 📁 pipes
│   │   │   └── fallback.pipe.ts
│   │   ├── 📁 services
│   │   │   └── app-api.service.ts
│   │   ├── primeng-modules.ts
│   │   └── util.ts
├── 📁 assets

## Development server





To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
´´BankEditDialog {

  // customer?: Customer;
  name?: string;
  document?: string;
  id?: number;


  constructor(private dialogRef : DynamicDialogRef<BankEditDialog>,
              private dialogConfig : DynamicDialogConfig) {

  const customerData = dialogConfig?.data?.customer;
  if (customerData) {
    this.assignValue(customerData);
  }

  }




  save(){
/*    let model : Customer = {
      id: this.id,
      name: this.name,
      document: this.document
    }

    this.dialogRef.close(model);*/
  }

  assignValue(value : any){
    this.id = value.id
    this.name = value.name;
    this.document = value.document;
  }

}
