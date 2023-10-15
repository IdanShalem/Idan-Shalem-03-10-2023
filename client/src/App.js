import AppRoutes from './components/AppRoutes/AppRoutes';
import { MessagingProvider } from './state/Messaging/Messaging';
import { SocketProvider } from './state/Socket/Socket';
import { UserProvider } from './state/User/User';

function App() {
  return (
    <SocketProvider>
      <MessagingProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </MessagingProvider>
    </SocketProvider>
  );
}

export default App;
