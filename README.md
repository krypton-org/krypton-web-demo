<p align="center">
<a href="https://krypton-org.github.io/krypton-web-demo/"><img src="https://github.com/krypton-org/krypton-web-demo/raw/master/img/banner.svg" width="470px"/></a>
</p>
<p align="center">

Web App Demo using Krypton for authentication. It features a simple To-Do List and a complete userspace. Authenticate yourself to start adding your To-Dos. This web app is built with [React](https://reactjs.org/), [Redux](https://redux.js.org/) and [Bulma](https://bulma.io/) for CSS.

Here is the [link](https://github.com/krypton-org/krypton-web-demo).

## How does it work?

This React App use [krypton-web](https://github.com/krypton-org/krypton-web) for authentication on the front-end. On the back-end, there is an instance of [krypton-auth](https://github.com/krypton-org/krypton-auth) running [here](https://nusid.net/krypton-auth)  and a simple back-end saving the To-Dos.

By opening the app in your browser, it creates a [Redux](https://redux.js.org/) store containing the app state and an instance of [krypton-auth](https://github.com/krypton-org/krypton-auth).

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
The different methods of [krypton-web] like log-in, registration are called within [Redux Thunks](https://daveceddia.com/what-is-a-thunk/), which are themselves called by React components. When performed those actions change the app state and trigger its re-rendering.


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
        } catch (err) {
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
Builds the app for production to the build folder.
```bash
npm run build
```

## License and copyright

This project is licensed under the [MIT License](LICENSE).
No copyright assignment is necessary to contribute, so copyrights are shared among contributors.
