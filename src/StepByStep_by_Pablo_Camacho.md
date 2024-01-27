# Todo-App Development by Pablo Camacho

## The beggining:

The very first step was to create the repository, task that was done by Claudio, then he created
the Angular proyect, this had to be done by using the CLI (Command line Interface) of Angular.
After this I was added as collaborator in the GitHub repository where I had to create the workflow
in a .yaml file. This workflow allow us to use a remote pc to do te tests and deploy of our application in git hub pages using github actions.
The design of the App UI was made using Figma where I added all the features I would like to see in the app.

## Basic Components

After that I created the todo-list component using the CLI with the comand (ng generate component todo-list) where I had my ever first approach to testing because I was told that its a good practice to write the tests before the implementation of the class component. My implementation of the test consisted in check if the component display the todos, so the unit test consisted in adding a fake todo to the list in the component and to verify if the templeate rendered it via tracking the tag class, also consisten in verify if the templates rendered a empty and a error message. This first approach scared me because I thought it was very dificult.

## Clean Code

The next step was to update the workflow to implement correctly the test on the remote computer, this task was done by adding a headless chrome directive to the test action,also I had to implement Auto Format on VSC, Husky to automate the Lint analisis before each commit.
In order to declare the structure of a Todo I created its interface using the Angular CLI (ng generate interface) this allowed me to create instances of a Todo in any part of the application by only importing this interface. This interface is a Class that uses the "export" to tell Angular that it can be imported from anywhere.

## Todo Component, Todo Form Component, Todo Service

After the workflow update I started the implementation of the todo-list component by creating an array of todos called todoList, this atrribute of the class stored the todos. This attribute was manipulated by the methods that add and update todos.To add a new todo was necessary to recieve it from the template but for this I had to create new components like todo-component , todo-form and todo-service,all where created from the console using the Angular CLI (ng generate compponent / ng generate service) because the shortcut on Angular to create components is not updated and create the components whitout the StandAlone option.
The todo-service is the file where I declare all the methods that manipulate de data base (at the beggining the data base was only a file with an array of todos inside).

## Home Page - Add Button

The last two components I created were HomePage-Component and the add-Button-Component. The first one is the component that contains the main elements of the app, this app was created with the vision of having multiple pages to show diferent information on each page. The add-Button-Component was created in order to use it both as add todo button and as add category button.The implementation of the home-page-component class is empty because we use its template only to instantiate the components we want to display there, at this moment the only instatiated component is todo-list(the father of todo-form and todo components).The add-button-component class implementation was written by Claudio, he created an event emitter using the @Output decorator and a method called "addClick" that triggers the emition of the event, this event is listened by the father's component in the todo-list template,
where in case of recieving an (add) event, changes the value of the "isAdding" atribute that is managed by todo-list-component class, this change updates the todo-list template in order to replace the renedering of all the todos for a form where the user can complete the data to add a new todo.

## Todos

Once I had everything created I started with the implementations, the first thing I made was the rendering of the todos, using a @for directive in the todo-list template I sent each todo via [todo] in the todo-app instance tag to be able to use its properties in the todo-app template, this is posible because the todo-component-class had an @Input decorator where the todo information were stored. With the todo information I called the properties I want to render using {{}} to acces to each one, also having the todo information I used the method todoDone to update the data base everytime the chekbox was marked as done, this implementation used a event emitter with the @Output decorator to send this update to todo-list(father), this method return a (void value) and its implemented using a if conditional where I ask for the actual state of the attribute complete, if its false then its marked as true and calls the event emitter to emit the event, and if its true then it sets up the attribute as fals and calls the event emitter to emit the event.

## Todo-Form-Component

The next step was to implement the todo-Form component, for this to be done was necessary to install Angular Material, with the Angular Material tags I was able to create a usable form quickly , adding features such as a Dinamic Date Picker. Also in the template I included controls to show warnings when the imputs value were throwing some validation errors. This validations were implemented in the class of the component. Finnaly the submit button triggers the "emitTodo" method that calls the event emitter "newTodo" that sends the event to the father's template (todo-list), this event is a collection of data that corresponds to all the atrributes of a todo.

## Todo-List-Component

The main component of **Home Page** is Todo-List-Component in this component I manage the events that the others components emits, the **Todos** to show and the **Form** to complete. The class of the component is composed of:

- **variables:**
  - **todos$:** Observable that returns a **Todo** array, it's initialized with the _todoService_ using the **getTodos** method.
  - **isAdding**: A boolean initialized as false used in the template to render either the list or the form
  - **error:** A boolean initialized as false used in the template to show a error message in case a function returns error.
- **constructor:** Method called in the construccion of the class, this method injects to the class the necessary services, in this method I injected todoService and socketService.
- **ngOnInit:** Method called right after the class is generated, in this class I used it to call the _verificarYManejarErrores_ to analize the todos stored in the data base.
- **AfterViewInit:** Method called when all the component whas initializated , only then this method uses the socketService to initialize the stream of data to show live todo addings.
- **getTodos:** Method called to obtain the todos using the todoService methods.
- **doneTodo:** Method called to update a todo in the data base using the service method _updateTodo_
- **todoAdd:** Method called to group the data collected in the form and to send it to the data base using the todoService methods.
- **verificarYManejarErrores:** Method called to check the list using the method _verificarLista_ and to manage the errors the todos managment could cause.
- **verificarLista:** Method called to analize if the elements of the todo array are strings.

The template of this component uses Angular material to render the todos by passing the todo data via html custom tag. Also uses control flow directives such as @if , @for and @empty to control what is getting rendered and when.

## Interfaces

At this moment the app only uses one interface to model the **Todo** data type.

- **todo interface:** This class is exported to be used as a model of the data that a todo needs.
  - \_id: This attribute gives the Todo a unique identifier. Uses String data type.
  - title: This attribute refers to the title of the todo. Uses String data type.
  - description: This attribute refers to the title of the todo. Uses String data type.
  - dueDate: This attribute refers to the date that the todo expires. Uses Date data type.
  - complete: This attribute refers to the state of completion of the todo. Uses Boolean data type.

## Services

Services are being used to manipulate the data flow from the API to the App and vice versa.

- **Socket Service:**

  - Variables:
    - config: Gives to the implementation the url to listen the data from the API, uses SocketIoConfig data type.
    - socket: Creates a instance of Socket.
  - Methods:
    - initSocket: This method uses a if conditional to ask if there is already a socket instance to create a new one if neccesary.

- **Todo Service:**
  - Variables:
    - baseUrl: This variable provides the service a custom url depending the moment, if it's in production nor in development.
  - Methods:
    - constructor: This method injects to the service al the methods of the http library order to have the tools to connect to remote or local data bases.
    - getLiveTodo: This method uses the socketService to detect a event (new todo) and then to show it in the template.
    - getTodos: This method uses the http library already injected to connect to the data base and get an array of todos from the url passed as parameter using the _get_ method. This method return the array as an Observable.
    - addTodo: This method recieves a Todo and uses the POST method to send it to the data base to be added.
    - updateTodo:This method recieves a Todo and uses the PUT method to send it to the data base to be updated using its \_id property.
    - deleteTodoById: This method recieves a Todo id and uses the DELETE method to send it to the data base to be deleted.

## Directives

This App uses only one custom directive to modify the styles of a marked as done todo.

- __Strike Through:__ This directive uses the @HostBinding decorator wich creates a bridge between the tag and the implementation of the directive. Specifically this directive changes the text decoration, font Weight and font size attributes of the host's style.

## Api

For serving the app with data, I implemented a Node JS API using the framework Express, Mongo DB as data base and Mongoose as middleware.

- __Variables:__
    - app: Instance of express library
    - server: Creates a http server using the app as base.
    - io: Creates a socket server using the server as base.
    - PORT: Defines the port that the app will be listening.

- __Methods:__
    - mongoose.connect: Generates the conexion between the API and Mongo DB 
    - mongoose.connection.on: Event listener to react in case of Error, Connections.. events.
    - server.listen: Starts the server.
    - io.on: Socket server event listener to react in case of different types of events.
    - app.use: Gives to the app orders to execute while serving.
    - app.get: This method reacts on the route by requiring or responsing data, in this implementations is used to send data to the application.
    - app.post: This method reacts on the route recieved and process the data to add it to the data base.
    - app.put: This method reacts on the route recieved and process the data to update the Todo in the data base.
    - app.delete: This method recieve an ID to search it in the data base and delete the Todo asociated to it.
- __Models:__ In order to communicate more efficiently with the data base, the Api uses the todo model to compare and verify the data exchange.
- __Tests:__ To check the functionality of the end points I created unit tests that simulates data exchange using the Api Methods.





