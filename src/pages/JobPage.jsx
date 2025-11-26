import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHourglassHalf, faClipboardList, faTasks, faCheck, faTimesCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const getStatusIcon = (status) => {
  switch (status) {
    case 'Open':
      return <FontAwesomeIcon icon={faCheckCircle} className='text-green-500 mr-2' />;
    case 'Under review':
      return <FontAwesomeIcon icon={faHourglassHalf} className='text-yellow-500 mr-2' />;
    case 'Planned':
      return <FontAwesomeIcon icon={faClipboardList} className='text-blue-500 mr-2' />;
    case 'In progress':
      return <FontAwesomeIcon icon={faTasks} className='text-orange-500 mr-2' />;
    case 'Completed':
      return <FontAwesomeIcon icon={faCheck} className='text-green-500 mr-2' />;
    case 'Declined':
      return <FontAwesomeIcon icon={faTimesCircle} className='text-red-500 mr-2' />;
    default:
      return <FontAwesomeIcon icon={faQuestionCircle} className='text-gray-500 mr-2' />;
  }
};

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useLoaderData().data[0];
  console.log('job:', job); 

  const onDeleteClick = async (jobId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?'
    );

    if (!confirm) return;

    try {
      await deleteJob(jobId);
      toast.success('Job deleted successfully');
      navigate('/jobs');
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <>
      <section className='bg-blue-50 px-4 pt-20'>
        <div className='container-xl lg:container m-auto flex justify-between items-center'>
          <Link
            to='/jobs'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Feedback Listings
          </Link>
          <div className='flex gap-2'>
            <Link
              to={`/edit-job/${job.id}`}
              className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
            >
              Edit Feedback
            </Link>
            <button
              onClick={() => onDeleteClick(job.id)}
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline'
            >
              Delete Feedback
            </button>
          </div>
        </div>
      </section>

      <section className='bg-blue-50 px-4 py-10'>
        <div className='container-xl lg:container m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  {getStatusIcon(job.status)}
                  <p>{job.status}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                  Description
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                  Status
                </h3>

                <div className='mb-4 flex items-center'>
                  {getStatusIcon(job.status)}
                  {job.status}
                </div>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {
              /* <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Company Info</h3>

                <h2 className='text-2xl'>{job.company.name}</h2>

                <p className='my-2'>{job.company.description}</p>

                <hr className='my-4' />

                <h3 className='text-xl'>Contact Email:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company.contactEmail}
                </p>

                <h3 className='text-xl'>Contact Phone:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {' '}
                  {job.company.contactPhone}
                </p>
              </div> */}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/feedbacks/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
