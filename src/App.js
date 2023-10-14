import AppRoutes from './components/AppRoutes/AppRoutes';
import { MessagingProvider } from './state/Messaging/Messaging';
import { SocketProvider } from './state/Socket/Socket';

function App() {
  return (
    <SocketProvider>
      <MessagingProvider>
        <AppRoutes />
      </MessagingProvider>
    </SocketProvider>
  );
}

export default App;
