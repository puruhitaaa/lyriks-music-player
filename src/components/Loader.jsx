import PropTypes from 'prop-types'
import { loader } from '../assets'

const Loader = ({ title }) => (
  <div className='flex flex-col items-center justify-center w-full'>
    <img alt='loader' className='object-contain w-32 h-32' src={loader} />
    <h1 className='mt-2 text-2xl font-bold text-white'>
      {title || 'Loading...'}
    </h1>
  </div>
)

export default Loader

Loader.propTypes = {
  title: PropTypes.string,
}
