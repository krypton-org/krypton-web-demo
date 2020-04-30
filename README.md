<p align="center">
<a href="https://krypton-org.github.io/krypton-web-demo/"><img src="https://github.com/krypton-org/krypton-web-demo/raw/master/img/banner.svg" width="470px"/></a>
</p>
<p align="center">
    <i>To-Do List made with Krypton Authentication, React and Redux.</i>
</p>

This repository shows how to use Krypton for user authentication in a React app.  
It is built with [React](https://reactjs.org/), [Redux](https://redux.js.org/) and [Bulma](https://bulma.io/) for CSS.

- [**Online Demonstration**](https://krypton-org.github.io/krypton-web-demo) — Sign up to start adding to-dos. The database is reset every day.

## How does it work?

This React application uses [krypton-web](https://github.com/krypton-org/krypton-web) for authentication on the front-end.  
On the back-end, it uses a [sandbox](https://nusid.net/krypton-auth) instance of [krypton-auth](https://github.com/krypton-org/krypton-auth) and a simple back-end for saving the to-dos.

When the application is loaded, it creates a [Redux](https://redux.js.org/) store containing the app state and an instance of [krypton-web](https://github.com/krypton-org/krypton-web).

```javascript
// src/redux/reducers/AuthReducer.ts
const initialState: AuthState = {
    user: null,
    krypton: new Krypton('https://nusid.net/krypton-auth'), // Set with the backend URL
    isLoggedIn: false,
    isTransactionLoading: false,
    isTransactionSuccess: false,
    localErrorMessage: null,
    transactionType: null,
};
```

The different methods of [krypton-web](https://github.com/krypton-org/krypton-web) (log-in, registration ...) are called within [Redux Thunks](https://daveceddia.com/what-is-a-thunk/), which are themselves called by React components.
These methods update the application state, which in turn, triggers a re-rendering of the components.

```javascript
// src/redux/actions/AuthActions.ts
export const login = (email: string, password: string) => {
    return async (dispatch: any, getState: () => RootState) => {
        dispatch(transactionBegin(AuthTransactionType.LOGIN));
        const krypton = getState().auth.krypton;
        try {
            await krypton.login(email, password); // Here it is
            dispatch(transactionSuccess());
            dispatch(addLoggedUSer(krypton.getUser()));
            dispatch(
                notify({
                    message: 'Log-in successful!',
                    date: new Date(),
                    type: Severity.SUCCESS,
                }),
            );
        } catch (err) { // If krypton.login() fails, it will throw an error
            dispatch(transactionFailure(err.message));
        }
    };
};

```

### Installation

```bash
git clone https://github.com/krypton-org/krypton-web-demo
cd krypton-web-demo
npm run start
```

### Build

To build the producation application in the `build/` folder:
```bash
npm run build
```

## License and copyright

This project is licensed under the [MIT License](LICENSE).
No copyright assignment is necessary to contribute, so copyrights are shared among contributors.
