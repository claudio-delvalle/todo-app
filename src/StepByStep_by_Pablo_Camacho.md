# Todo-App Development by Pablo Camacho

## The beginning:

The very first step was to create the repository, a task that was done by Claudio. Then he created

the Angular project, this had to be done using Angular's CLI (Command Line Interface).

After this, I was added as a collaborator in the GitHub repository. Here, I was tasked to create the workflow (this is part of the CI/CD process).

In a .yaml file, that defines the workflow for the GitHub Action, that will test, lint, build, and deploy the project to GitHub Pages. This workflow allows us to use a remote pc (GitHub Runner) to perform tests and deploy our application in github pages using github actions.

The design of the App UI was made using Figma, where I added all the features I would like to see in the app.

## Basic components

After that, I created the todo-list component using the CLI with the command 'ng generate component todo-list'. Here, I had my first attempt to unit testing. I was told that it is a good practice to write the tests before the implementation of the class component (test-driven-development [TDD]). My approach consisted of checking whether the component displayed the todos. The unit test consisted of adding a fake todo (mock data) to the list in the component (property) and verifying if the template rendered it by querying the DOM for the elements via the class selector. Furthermore, the tests verified the template's behavior of rendering the empty and error states. This first approach scared me because I thought it was very difficult.

## Clean Code

The next step was to update the GitHub Actions workflow to test the application as part of the CI/CD process. This involved configuring Angular (TODO: add how) to run the tests using a headless chrome browser. Also, I had to configure VSCode to auto-format on save, and added a git hook with Husky to automate the linting process before each commit.

To declare the structure of a Todo, I created its interface using the Angular CLI (ng generate interface). This allowed me to consistently create instances of a Todo in any part of the application. This interface is exported  in JS so that it can be imported from anywhere in the application.

## Todo component, Todo form component, Todo service

After the workflow update, I started the implementation of the todo-list component by creating an array of todos called todoList. This property of the class stores the todos. This property was manipulated by the methods that add and update todos. To add a new todo, it was necessary to receive it from the template, but for this, I had to create new components like todo-component, todo-form, and todo-service (all of which were created from the console using the Angular CLI 'ng generate compponent' and 'ng generate service') because the shortcut from the Angular extension in VSCode to create components is not up-to-date and the components are created without the StandAlone option.

The todo-service is a class where I defined all the logic to communicate with the API (at the beginning the database was only a static file with an exported array of todos inside).

## Home Page - Add Button

The last two components I created were the HomePageComponent and the AddButtonComponent. The first one is the component that contains the main elements of the app. This app was created with the vision of having multiple pages to show different information on each page. The AddButtonComponent was created to use it both as an add todo button and as an add category button. The implementation of the HomePageComponent class is empty because we use its template only to instantiate the components we want to display there. At this moment, the only instatiated component is todo-list (the father of the todo-form and todo components).The AddButtonComponent class implementation was written by Claudio. He created an event emitter using the @Output decorator and a method called "addClick" that triggers the emition of the event. This event is listened to by the father component in the todo-list template
where, in the case of receiving an (add) event, changes the value of the "isAdding" property that is managed by the TodoListComponent class. This change updates the todo-list template to update the template with a form where the user can fill-in the data to add a new todo.


## Todos

Once I had everything created, I started with the implementations. The first thing I made was the rendering of the todos, using a @for directive in the todo-list template. I sent each todo via (one way binding https://angular.io/guide/binding-syntax)[todo] in the todo-app instance tag to be able to use its properties in the todo-app template. This is possible because the todo-component-class had an @Input decorator where the todo information was stored. With the todo information, I called the properties I want to render using (interpolation) {{}} to access each one. Having the todo information, I used the method todoDone to update the database every time the checkbox was marked as done. This implementation used an event emitter with the @Output decorator to send this update to todo-list (father). This method returns a void value and is implemented using an if conditional where I ask for the actual state of the attribute complete, if its false then its marked as true and calls the event emitter to emit the event. If it is true, then it sets up the attribute as false and calls the event emitter to emit the event.

<!-- TODO: Review https://angular.io/guide/component-interaction -->

## Todo-Form-Component

The next step was to implement the todo-Form component. For this to be done, it was necessary (why) to install Angular Material. With the Angular Material components (and with the help of ReactiveForms), I was able to create a usable form quickly, adding features such as a Dynamic Date Picker. In addition, in the template, I included form controls to show warnings when the input values were incorrect by raising some validation errors. These validations were performed in the class of the component. The submit button triggers the "emitTodo" method that calls the event emitter "newTodo" that sends the event to the father’s template (todo-list). This event is a collection of data that corresponds to all the properties of a todo.

## Todo-List-Component

The main component of **Home Page** is the Todo-List-Component. In this component, I manage the events that the other components emit, the **Todos** to show, and the **Form** to complete. The class of the component is composed of:

- **variables:**

- **todos$:** Observable that emits a **Todo** array. It is provided by the _todoService_ through the **getTodos** method.

- **isAdding**: A Boolean initialized as false used in the template to render either the list or the form

- **error:** A Boolean initialized as false is used in the template to show an error message in case a function returns an error.

- **constructor:** Method called in the construction of the class. This method injects the necessary services to the class. In this method, I injected todoService and socketService.

- **ngOnInit:** Method called immediately after the class is generated. In this class, I used it to call the _verificarYManejarErrores_ to analyze the todos stored in the database.

- **AfterViewInit:** Method called when all the components were initialized. Only then does this method use the socketService to initialize the stream of data to show live todo addings.

- **getTodos:** Method called to obtain the todos using the todoService methods.

- **doneTodo:** Method called to update a todo in the database using the service method _updateTodo_

- **todoAdd:** Method called to group the data collected in the form and send it to the database using the todoService methods.

- **verificarYManejarErrores:** This method is called to check the list using the method _verificarLista_ and to manage the errors that the task management could cause.

- **verificarLista:** Method called to analyze whether the elements of the todo array are strings.

The template of this component uses Angular material to render the todos by passing the todo data via an html custom tag. Also uses control flow directives such as @if , @for, and @empty to control what is rendered and when.

## Interfaces

At this moment, the app uses only one interface to model the **Todo** data type.

- **todo interface:** This class is exported to be used as a model of the data that a todo needs.

- \_id: This attribute gives Todo a unique identifier. Uses the String data type.

- title: This attribute refers to the title of the todo. Uses the String data type.

- description: This attribute refers to the title of the todo. Uses the String data type.

- dueDate: This attribute refers to the date that the todo expires. Uses the date data type.

- complete: This attribute refers to the state of completion of the todo. Uses the Boolean data type.

## Services

Services are used to manage the data flow between the API and the app.

- **Socket Service:**

  - Variables:
    - config: Provides the URL for listening to data from the API (SocketIoConfig type).
    - socket: Creates an instance of the Socket class.
  - Methods:
    - initSocket: Initializes a new socket instance if necessary.

- **Todo Service:**
  - Variables:
    - baseUrl:  Stores a custom URL based on the environment (production or development).
  - Methods:
    - constructor: Injects HTTP library methods for connecting to databases.
    - getLiveTodo: Uses the Socket Service to detect new todos and display them in the template.
    - getTodos: Fetches an array of todos from the specified URL using the _get_ method and returns it as an Observable.
    - addTodo: Sends a new Todo to the database using the POST method.
    - updateTodo:Updates an existing Todo in the database using the PUT method and its _id property.
    - deleteTodoById: Deletes a Todo from the database using the DELETE method and its ID.

## Directives

The app uses a custom directive to change the styles of completed todos.

- __Strike Through:__ Applies text decoration, font weight, and font size changes to elements using the @HostBinding decorator.

## Api

For serving the app with data, I implemented a Node JS API using the framework Express, Mongo DB as data base and Mongoose as middleware.

- __Variables:__
    - app: Instance of the Express library.
    - server: HTTP server created using the Express app.
    - io: Socket server created using the HTTP server.
    - PORT: Port number for the server to listen on.

- __Methods:__
    - mongoose.connect: Establishes a connection to MongoDB.
    - mongoose.connection.on: Handles events like errors and connections.
    - server.listen: Starts the server.
    - io.on: Handles socket events.
    - app.use: Sets up middleware for the Express app.
    - app.get: Responds to GET requests, sending data to the app.
    - app.post: Processes data from POST requests and adds it to the database.
    - app.put: Processes data from PUT requests and updates existing Todos.
    - app.delete: Deletes a Todo from the database based on its ID.
- __Models:__ The API uses a Todo model to interact with the database efficiently.
- __Tests:__ Unit tests simulate data exchange to ensure API functionality.


## Conclusion

As it was my first Angular application, it was quite demanding. I had to Google a lot, read a lot, sometimes was frustrating to not knowing how to resolve some problems but it forced me to dedicate more and more hours coding and studying. Despite the app is still very small  I think it has the foundations to grow with no limits and the more I learn then I can make it bigger.







