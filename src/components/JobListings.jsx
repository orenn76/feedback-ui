import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JobListing from './JobListing';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setShowSpinner(false);
      const spinnerTimeout = setTimeout(() => {
        setShowSpinner(true);
      }, 1000); // Delay of 1 second before showing the spinner

      const apiUrl = '/api/feedbacks';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data.data || []); // Ensure jobs is an array
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        clearTimeout(spinnerTimeout);
        setLoading(false);
        setShowSpinner(false);
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>

        <div className='flex items-center mb-2'>
          <h2 className='text-3xl font-bold text-indigo-500'>
            Feedbacks
          </h2>
          <Link
            to='/add-job'
            className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 ml-auto flex items-center'
          >
            <FontAwesomeIcon icon={faPlus} className='mr-2' />
            Add Feedback
          </Link>
        </div>        

        <div className='relative flex items-center mb-4'>     
        <SearchBar apiUrl="/api/feedbacks/autosuggests" />
          <select
            value={filter}
            onChange={handleFilterChange}
            className='ml-4 p-2 border border-gray-300 rounded'
          >
            <option value=''>Filter</option>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
          </select>
          <select
            value={sort}
            onChange={handleSortChange}
            className='ml-4 p-2 border border-gray-300 rounded'
          >
            <option value=''>Sort</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>

        {loading && showSpinner ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-1 gap-1'>
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default JobListings;
