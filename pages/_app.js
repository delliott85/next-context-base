import { StateProvider } from '../state';
import { initialState, reducer } from '../reducer';

export default function MyApp({ Component, pageProps }) {
	return (
		<StateProvider
            initialState={initialState}
            reducer={reducer}
        >
            <Component {...pageProps} />
        </StateProvider>
  	);
}
