import { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditJobPage = ({ updateJobSubmit }) => {
  const job = useLoaderData().data[0];
  const [title, setTitle] = useState(job.title);
  const [type, setType] = useState(job.type);
  const [description, setDescription] = useState(job.description);
  const [contactEmail, setContactEmail] = useState(job.contactEmail || '');
  const [status, setStatus] = useState(job.status || 'Open');

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = (e) => {
    e.preventDefault();

    const updatedJob = {
      id,
      title,
      type,
      description,
      contactEmail,
      status,
    };

    updateJobSubmit(updatedJob);

    toast.success('Feedback Updated Successfully');

    return navigate(`/jobs/${id}`);
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update Feedback
            </h2>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value='Suggestion'>Suggestion</option>
                <option value='Feature Request'>Feature Request</option>
                <option value='Bug'>Bug</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Add a short title'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add a detailed description'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact_email'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Email
              </label>
              <input
                type='email'
                id='contact_email'
                name='contact_email'
                className='border rounded w-full py-2 px-3'
                placeholder='Optional Email address'
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='status'
                className='block text-gray-700 font-bold mb-2'
              >
                Status
              </label>
              <select
                id='status'
                name='status'
                className='border rounded w-full py-2 px-3'
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='Open'>Open</option>    
                <option value='Under review'>Under review</option>  
                <option value='Planned'>Planned</option>                              
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
                <option value='Declined'>Declined</option>                
              </select>
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default EditJobPage;
