import http from 'http';
import app from './app';

const server = http.createServer(app).listen(1000);
const event = 'request';
let currentApp = app;

if (module.hot) {
    module.hot.accept('./app', () => {
        server.removeListener(event, currentApp);
        server.on(event, app);
        currentApp = app;
    })
}
