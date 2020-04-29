<p align="center">
<img src="https://github.com/krypton-org/krypton-web-demo/raw/master/img/banner.svg" width="450px"/>
</p>
<p align="center">

This repository aims to show how easy it is to use Krypton for authentication in web apps. It features a simple To-Do list and a complete userspace. Authenticate yourself to start adding your To-Dos. This web app is built with React, Redux and Bulma for CSS.

Here is the [demo](https://github.com/krypton-org/krypton-web-demo).

## How does it work?

This React App use [krypton-web] for authentication on the front-end. On the back-end, there is an instance of [krypton-auth] running [here](https://nusid.net/krypton-auth)  and a simple back-end saving the To-Dos.

By opening the app in your browser, it creates a [Redux] store containing the app state and an instance of [krypton-auth].

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
    return (dispatch: any, getState: () => RootState) => {
        (async () => {
            dispatch(transactionBegin(AuthTransactionType.LOGIN));
            try {
                await getState().auth.krypton.login(email, password); // here it is
                dispatch(transactionSuccess());
                dispatch(addLoggedUSer(getState().auth.krypton.getUser()));
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
        })();
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