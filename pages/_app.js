import { StateProvider } from '../state';
import { initialState, reducer } from '../reducer';

import AppContainer from '../AppContainer';

export default function MyApp({ Component, pageProps }) {
	return (
		<StateProvider
            initialState={initialState}
            reducer={reducer}
        >
            <AppContainer>
                <Component {...pageProps} />
            </AppContainer>
        </StateProvider>
  	);
}
