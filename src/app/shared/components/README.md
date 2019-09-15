Reusable Components

Reusable components are modules of UI components you would like to reuse in different projects. As components have a local scope, these modules are imported in each pages modules where you need them.

Components like Material, NgBootstrap or PrimeNg. You can do yours too.

How to get the data?
UI components are pure presentation components. So they work exactly the same as page modules: data should come from the Input decorator (and sometimes from <ng-content> in advanced cases).