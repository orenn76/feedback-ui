import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faLightbulb, faStar, faQuestionCircle, faThumbsUp, faCommentDots, faCheckCircle, faHourglassHalf, faClipboardList, faTasks, faCheck, faTimesCircle, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const getTypeIcon = (type) => {
  switch (type) {
    case 'Bug':
      return <FontAwesomeIcon icon={faBug} className='text-red-500 mr-2' />;
    case 'Suggestion':
      return <FontAwesomeIcon icon={faLightbulb} className='text-yellow-500 mr-2' />;
    case 'Feature Request':
      return <FontAwesomeIcon icon={faStar} className='text-blue-500 mr-2' />;
    case 'Other':
      return <FontAwesomeIcon icon={faCommentDots} className='text-gray-500 mr-2' />;
    default:
      return <FontAwesomeIcon icon={faQuestionCircle} className='text-gray-500 mr-2' />;
  }
};

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

const JobListing = ({ job }) => {  
  let description = job.description;
  if (description.length > 100) {
    description = description.substring(0, 100) + '...';
  }
  
  const updatedAt = new Date(job.updated_at * 1000)
  const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true });

  return (
    <Link to={`/jobs/${job.id}`} className='block w-full'>
      <div className='bg-white shadow-md relative p-4 w-full hover:bg-gray-200'>                        
        <div className='mb-1 flex items-center justify-between'>
          <div className='flex items-center'>
            {job.user && job.user.name && (
              <div className='flex items-center mr-4'>
                <FontAwesomeIcon icon={faUser} className='text-gray-400 mr-2' />
                {job.user.name}
              </div>
            )}
            <div className='flex items-center mr-4'>
              <FontAwesomeIcon icon={faThumbsUp} className='text-gray-400 mr-2' />
              {job.votes}
            </div>
            {job.type && (
              <div className='text-gray-600 flex items-center mr-4'>
                {getTypeIcon(job.type)}
                {job.type}
              </div>
            )}
          </div>
          <div className='flex items-center'>
            {job.status && (
              <div className='text-gray-600 flex items-center mr-4'>
                {getStatusIcon(job.status)}
                {job.status}
              </div>
            )}
            {job.updated_at && (
              <div className='text-gray-600 flex items-center'>
                <FontAwesomeIcon icon={faClock} className='text-gray-400 mr-2' />
                {timeAgo}
              </div>
            )}
          </div>
        </div>                    
        <div className='mb-1'>
          <h3 className='text-xl font-bold'>{job.title}</h3>
        </div>
        <div className='mb-1'>
          {description}          
        </div>        
      </div>
    </Link>     
  );
};

export default JobListing;