import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NoteList from './components/NoteListComponent/NoteList.component.jsx';

const queryClient = new QueryClient();

function App() {
  return (  
    <div className="App">
      <QueryClientProvider client = { queryClient }> 
          <NoteList> </NoteList>   
      </QueryClientProvider>     
    </div>
  );
}

export default App;
