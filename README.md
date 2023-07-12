Project Description:
The project is a Product Management System built using React and Redux.
It utilizes various libraries and packages such as React Router and redux-thunk.
The main component, `App`, serves as the entry point of the application.
 
Key Features:
Libraries and Packages:
React: A JavaScript library for building user interfaces.
Node.js with a mock server.
Redux: Used for state management, providing a centralized store for the application data.
React Redux: Integrates React with Redux, enabling components to connect to the Redux store.
React Router: Handles routing in the application, facilitating navigation between pages.
react-router-dom: Provides DOM bindings for React Router, enabling routing functionality in a web browser.
redux-thunk: Middleware for handling asynchronous actions in Redux.
`react-beautiful-dnd`:
`react-icons/ai` and `react-icons/md`

 Component Overview:
`App`: The main component serves as the entry point of the application. It initializes the Redux store, manages the application's state, and renders other components.
 Redux-related code: Uses hooks like `useDispatch` and `useSelector` from `react-redux` to access the Redux store and dispatch actions. Thunk middleware dispatches actions such as `fetchProducts`, `addProduct`, and `deleteProduct` to handle data fetching and manipulation.
 Routing and Navigation: Utilizes React Router and the `useNavigate` hook from `react-router-dom` for handling routing and navigation between pages. The `currentPage` state variable tracks the currently selected page, and the `handlePageChange` function updates the state and navigates accordingly.
  
Summary:
The project utilizes React and Redux for state management, React Router for handling routing, and various components for building the Product Management System.
 
Redux-related code
Actions:
`FETCH_PRODUCTS_REQUEST`: Dispatched when the request to fetch products is initiated.
`FETCH_PRODUCTS_SUCCESS`: Dispatched when the products are successfully fetched.
`FETCH_PRODUCTS_FAILURE`: Dispatched when there is an error while fetching products.
`ADD_PRODUCT`: Dispatched when a new product is added.
`DELETE_PRODUCT`: Dispatched when a product is deleted.

Action Creators:
`fetchProductsRequest()`: Creates an action for initiating the product fetch request.
`fetchProductsSuccess(products: Product[])`: Creates an action for successful product fetch with the fetched products as payload.
`fetchProductsFailure(error: string)`: Creates an action for a failed product fetch with the error message as payload.
`addProduct(newProduct: Product)`: Creates an action for adding a new product with the new product as payload.
`deleteProduct(productId: number)`: Creates an action for deleting a product with the product ID as payload.

 Thunk Function:
`fetchProducts()`: A thunk function that handles the asynchronous operation of fetching products. It dispatches the appropriate actions based on the success or failure of the fetch request.

Reducer:
`productsReducer`: Handles the state updates for the products. It manages the `products` array, `loading` status, and `error` message in the Redux store based on dispatched actions.

Root Reducer:
 `rootReducer`: Combines multiple reducers if needed. In this case, it combines the `productsReducer` with other reducers.

Store:
`store`: Creates the Redux store using the `rootReducer` and applies the middleware `thunk` to handle asynchronous actions.

The overall Redux flow involves dispatching actions, which are then handled by the reducer to update the state in the Redux store. Thunks are used to handle asynchronous operations, such as fetching products. The state updates trigger re-renders in connected components via the `useSelector` hook to access the state and the `useDispatch` hook to dispatch actions.

React Router :
AppRoutes:
The `AppRoutes` component handles the routing logic for different pages based on the `currentPage` prop.
 It renders different components based on the current page using the `Routes` and `Route` components from React Router.
The rendered components include `ProductList`, `FullTodoList`, and `FullProductsList`, passing the necessary props to each component.

Router Setup: In the main `index.js` file, we use `BrowserRouter` from React Router to wrap the `App` component, providing routing capabilities.
 The `Provider` component from `react-redux` is used to wrap the `BrowserRouter` and provide the Redux store to the application.

Routing:
The routing is defined in the `AppRoutes` component using the `Route` component from React Router.
 The path for each route is defined using the `path` prop.
The corresponding components are rendered when the defined paths match the current URL.
The default route is defined using the `Route` component with the `path="*"` prop, which will navigate to the `/page1` path if no other paths match.

Navigation:
Navigation between different pages is handled by the `Navigate` component from React Router.
When the default route is matched, it automatically navigates to the `/page1` path.

Root Element: The root element is created using `ReactDOM.createRoot` to enable concurrent rendering in React.
The `Provider` and `BrowserRouter` components are nested inside the root element, wrapping the `App` component.
The Redux store is provided to the application through the `Provider` component.

Overall, React Router is used to manage the routing of different pages in the application. The routes are defined in the `AppRoutes` component, and navigation is handled using the `Navigate` component. The routing setup is done in the `index.js` file by wrapping the `App` component with the `BrowserRouter`.

`react-beautiful-dnd:

`FullProductsList` component: this is the main component that wraps the draggable components and handles the drag-and-drop functionality.
It uses the `DragDropContext` component from `react-beautiful-dnd` to enable drag and drop functionality.
It manages the state of `product`, `cart`, and `updatedProducts` using the `useState` hook.
The `handleAdd` function adds a new product to the `updatedProducts` and `cart` arrays.
The `handleDelete` function removes all products from the cart and adds them back to the `updatedProducts` array.
The `onDragEnd` function handles the logic for dragging and dropping products between the "ProductsList" and "Cart" droppable areas.

`ProductsList` component:
renders the droppable areas for "ProductsList" and "Cart" using the `Droppable` component from `react-beautiful-dnd`.
It maps through the `products` and `cart` arrays and renders the `SingleProduct` component for each product.
The `SingleProduct` component is wrapped in the `Draggable` component to make it draggable.

`SingleProduct` component: The `SingleProduct` component represents a single draggable product item.
It receives the `index`, `product`, and `setCart` props from the `ProductsList` component.


Overall, `react-beautiful-dnd` is used to implement drag-and-drop functionality for managing products in the "ProductsList" and "Cart" areas. The components are wrapped with the appropriate `Draggable` and `Droppable` components to enable the desired behavior.

Node.js with a mock server:

`express` package:  imported to create a web server.
The `cors` package is also imported to enable Cross-Origin Resource Sharing (CORS) for all routes.

Server Setup: An Express application is created using `express()` and assigned to the `app` variable. The server is set to listen on port 8000.
CORS middleware is applied to enable CORS for all routes.

API Endpoint: The server defines a GET endpoint at `/api/products`.
When this endpoint is accessed, it reads the product data from a JSON file (`db.json`) using the `fs` package.
The product data is parsed and returned as a JSON response.


Overall, Node.js is used to create a simple Express server that provides a mock API endpoint for fetching products.
The server uses the `cors` package to enable CORS, allowing requests from the front end to be processed.

