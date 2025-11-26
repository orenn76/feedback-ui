import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  // TODO oren delete
  // const [user, setUser] = useState({
  //   email: 'user@example.com',
  //   // other user properties
  // });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = () => {
      // Check for a token or flag indicating the user is logged in
      return !!localStorage.getItem('token'); // Example: checking for a token in local storage
    };

    const fetchUser = async () => {
      const res = await fetch('/api/user', {
        credentials: 'include',
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    };

    if (isLoggedIn()) {
      fetchUser();
    }
  }, []);

  // Add New Job
  const addJob = async (newJob) => {
    const res = await fetch('/api/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/feedbacks/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete feedback');
    }
    return res;
  };

  // Update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/feedbacks/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      // TODO oren
      // <Route path='/' element={<MainLayout isAdmin={user.isAdmin} />}>
      <Route path='/' element={<MainLayout isAdmin={true} />}>
        <Route index element={<JobsPage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} user={user} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='/dashboard' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
