Architecture goals: 
   consistency: simplicity (for small apps) and scalability (for big apps),
   reusability in different projects,
   optimization (consistent with or without lazy-loading),
   testability.

Below you will find an example of the components and their contents in the app directory
A README.md file is located in the following directories with a brief summary of the type of content that should be there
   shared-components
   shared-modules
   shared-services

Modules outside the shared directories should be treated as a stand alone component with services, components and page modules specific to the module

app/
|- app.module.ts
|- app-routing.module.ts
|- shared/
   |- shared-components/
      |- auth/
         |- auth.html
         |- auth.service.ts
         |- auth.module.ts (optional since Angular 6)
      |- othermoduleofsharedservice/
   |- shared-modules/
      |- firebase/
         |- firebase.module.ts
      |- pipes/
         |- custom-pipe.module.ts
      |- othermoduleofsharedservice/
   |- shared-services/
      |- guards/
         |- admin.guard.ts
         |- management.guard.ts
         |- user.guard.ts
      |- data-services/
         |- data-service.ts
      |- othermoduleofsharedservice/
|- account/
   |- email-list/
      |- email-list.component.ts
      |- email-list.component.css
      |- email.model.ts
      |- email.service.ts
   |- email-details/
      |- email-details.component.ts
      |- email-details.component.css
      |- email.model.ts
      |- email.service.ts
   |- signin/
      |- signin.component.ts
      |- signin.component.css
      |- signin.model.ts
      |- signin.service.ts
   |- account.module.ts
   |- account-routing.module.ts
   |- account.service.ts
   |- pages/
      |- account/
         |- account.html 
         |- account.module.ts 
         |- account.component.ts
         |- account.component.css
      |- account-email/
         |- email.html 
         |- email.module.ts 
         |- email.component.ts
         |- email.component.css
      |- account-signin/
         |- signin.html 
         |- signin.module.ts 
         |- signin.component.ts
         |- signin.component.css
|- othermoduleofpages/

This architecture was derived from real word experience with enterprise level angular applications and the following articles. 
https://angular.io/guide/styleguide
https://medium.com/finiteloop-systems/architect-design-build-scalable-angular-applications-ce336a3c153a
https://medium.com/@cyrilletuzi/architecture-in-angular-projects-242606567e40


NAMING CONVENTIONS
Naming conventions are hugely important to maintainability and readability. This guide recommends naming conventions for the file name and the symbol names.

General Naming Guidelines
   Do use consistent names for all symbols.
   Do follow a pattern that describes the symbol's feature then its type. The recommended pattern is feature.type.ts.

   Why? Naming conventions help provide a consistent way to find content at a glance. Consistency within the project is vital. Consistency with a team is important. Consistency across a company provides tremendous efficiency.
   Why? The naming conventions should simply help find desired code faster and make it easier to understand.
   Why? Names of folders and files should clearly convey their intent. For example, app/heroes/hero-list.component.ts may contain a component that manages a list of heroes.

Separate file names with dots and dashes
   Do use dashes to separate words in the descriptive name.
   Do use dots to separate the descriptive name from the type.
   Do use consistent type names for all components following a pattern that describes the component's feature then its type. A recommended pattern is feature.type.ts.
   Do use conventional type names including .service, .component, .pipe, .module, and .directive. Invent additional type names if you must but take care not to create too many.

   Why? Type names provide a consistent way to quickly identify what is in the file.
   Why? Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.
   Why? Unabbreviated type names such as .service are descriptive and unambiguous. Abbreviations such as .srv, .svc, and .serv can be confusing.
   Why? Type names provide pattern matching for any automated tasks.

Symbols and file names
   Do use consistent names for all assets named after what they represent.
   Do use upper camel case for class names.
   Do match the name of the symbol to the name of the file.
   Do append the symbol name with the conventional suffix (such as Component, Directive, Module, Pipe, or Service) for a thing of that type.
   Do give the filename the conventional suffix (such as .component.ts, .directive.ts, .module.ts, .pipe.ts, or .service.ts) for a file of that type.

Service names
   Do use consistent names for all services named after their feature.
   Do suffix a service class name with Service. For example, something that gets data or heroes should be called a DataService or a HeroService.
   A few terms are unambiguously services. They typically indicate agency by ending in "-er". You may prefer to name a service that logs messages Logger rather than LoggerService. Decide if this exception is agreeable in your project. As always, strive for consistency.

   Why? Provides a consistent way to quickly identify and reference services.
   Why? Clear service names such as Logger do not require a suffix.
   Why? Service names such as Credit are nouns and require a suffix and should be named with a suffix when it is not obvious if it is a service or something else.

Module names
   Do append the symbol name with the suffix Module.
   Do give the file name the .module.ts extension.
   Do name the module after the feature and folder it resides in.
   Why? Provides a consistent way to quickly identify and reference modules.
   Why? Upper camel case is conventional for identifying objects that can be instantiated using a constructor.
   Why? Easily identifies the module as the root of the same named feature.
   Do suffix a RoutingModule class name with RoutingModule.
   Do end the filename of a RoutingModule with -routing.module.ts.
   Why? A RoutingModule is a module dedicated exclusively to configuring the Angular router. A consistent class and file name convention make these modules easy to spot and verify.

For naming conventions on pipes, directives and other structures not listed here, please visit https://angular.io/guide/styleguide#naming

A concise review of the Coding conventions Single responsibility can be found at https://angular.io/guide/styleguide#coding-conventions or by reviewing the code itself.

Another important elememt used in this application is Lifecycle hooks
https://angular.io/guide/styleguide#lifecycle-hooks