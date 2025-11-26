import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJobPage = ({ addJobSubmit, user }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Suggestion');  
  const [description, setDescription] = useState('');   
  const [contactEmail, setContactEmail] = useState('');  

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      setContactEmail(user.email);
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newJob = {
      title,
      type,
      description,
      contactEmail,
    };

    await addJobSubmit(newJob);

    // Show success message
    toast.success('Feedback Added Successfully');

    // Add a delay before navigating
    setTimeout(() => {
      navigate('/jobs');
    }, 1); // 1 millisecond delay
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>New Feedback</h2>

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
            
            <div>
              <button
                className={`font-bold py-2 px-4 rounded-md px-3 py-2 mt-4 focus:outline-none focus:shadow-outline ${
                  isSubmitting ? 'bg-indigo-900' : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }`}
                type='submit'
                disabled={isSubmitting}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddJobPage;
