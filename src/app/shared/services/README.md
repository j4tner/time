Global Services

Global services are modules with services you need through the whole app. As services have generally a global scope, these modules are loaded only once in the app.module.ts, and then services are accessible everywhere (including in lazy-loaded modules).

You certainly use at least one : the HttpClient module. And you’ll soon need your own. A very common case is an AuthModule to store the user connection status (as this data is needed everywhere in the app) and save the token.

Note: since Angular 6, you don’t need a module anymore for services, as they are auto-providing themselves. But it doesn’t change the architecture described here.

Data Services
Talk to the server through a service
Do refactor logic for making data operations and interacting with data to a service.
Do make data services responsible for XHR calls, local storage, stashing in memory, or any other data operations.

Do use services as singletons within the same injector. Use them for sharing data and functionality.
Why? Services are ideal for sharing methods across a feature area or an app.
Why? Services are ideal for sharing stateful in-memory data.

Reusability
Modules of global services are reusable through different projects if you take care to have no specific dependency in them (no UI or app specific code), and if you separate each features in different modules (do not put every service in just one big global service module).


