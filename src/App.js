import { Router } from "./routes/Router";
import { AuthProvider } from "./providers/AuthProvider"
import { DiaryProvider } from "./providers/DiaryProvider";
import { AlertProvider } from "./providers/AlertProvider";

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <DiaryProvider>
          <Router />
        </DiaryProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
