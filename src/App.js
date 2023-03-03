import './App.css';
import { Routes, Route } from 'react-router-dom';

import AppGui from './components/AppGui'
import FormList from './pages/FormList'
import NotFound from './pages/NotFound'
import AddFormBuilder from './pages/AddFormBuilder'
import ViewFormBuilder from './pages/ViewFormBuilder'

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={< AppGui />}>
            <Route index element={<FormList />} />
            <Route path='add-form' element={<AddFormBuilder />} />
            <Route path='form/:slug' element={<ViewFormBuilder />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
