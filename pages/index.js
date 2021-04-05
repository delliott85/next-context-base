export default function Home() {
    const styles = {
        container: {
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 40px',
            fontFamily: 'sans-serif',
            lineHeight: 1.5
        },
        section: {
            marginTop: 50,
        },
        code: {
            display: 'inline-block',
            background: '#e0e0e0',
            padding: '2px 5px',
            lineHeight: 1
        },
        footer: {
            marginTop: 100
        }
    };

    return (
        <div style={styles.container}>
            <header>
                <h1>Next.js state management boilerplate.</h1>
                <p>A simple boilerplate to get you started using state management using Next.js and the React Context hook. Based heavily on <a href="https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c" target="_blank" rel="nofollow noreferrer">Luke Hall's article</a>.</p>
                <p>I've created this under the assumption that you're already somewhat familiar with React state management. If, however, you aren't then the best way to learn is to just get stuck in.</p>
            </header>
            <section style={styles.section}>
                <h3>Getting started.</h3>
                <ul>
                    <li>Clone this repo and <pre style={styles.code}>cd</pre> into it.</li>
                    <li>Run <pre style={styles.code}>yarn install</pre> to install all the required packages.</li>
                    <li>Run <pre style={styles.code}>yarn dev</pre> to start the local Next.js server.</li>
                </ul>
            </section>
            <section style={styles.section}>
                <h3>Use cases.</h3>
                <p>Personally I prefer to keep state locally scoped wherever possible, but a few instances where I've used this in the past;</p>
                <ul>
                    <li>Simple user authentication.</li>
                    <li>Modals.</li>
                    <li>Loading states.</li>
                    <li>Light / dark modes.</li>
                </ul>
                <p>This isn't designed to be a replacement for Redux or any other state management library but, in the end, how you use it is up to you.</p>
            </section>
            <section>
                <h3>Creating reducers.</h3>
                <p>There is an example reducer in <pre style={styles.code}>reducer/currentUser.js</pre> which is then imported into the main reducer file. Just follow this pattern for however many reducers you want to include.</p>
            </section>
            <section>
                <h3>Working with state.</h3>
                <p>A practical example can explain things much better than I can. There is a basic demo in <pre style={styles.code}>pages/demo.js</pre> which covers the key components when working with state.</p>
            </section>
            <section>
                <h3>&nbsp;</h3>
                <p>This isn't perfect by any means but it works for me and it could perhaps work for you and while this boilerplate is built using Next.js the state management part could very easily be extracted and used with any other React framework.</p>
            </section>
            <footer style={styles.footer}>
                <p>Authored by <a href="https://deanelliott.me" target="_blank">Dean Elliott</a></p>
            </footer>
        </div>
    );
}
