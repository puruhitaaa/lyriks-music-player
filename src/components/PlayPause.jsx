import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

const PlayPause = ({ isPlaying, activeSong, song, handlePlay, handlePause }) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle className='text-gray-300' onClick={handlePause} size={35} />
  ) : (
    <FaPlayCircle className='text-gray-300' onClick={handlePlay} size={35} />
  )

export default PlayPause
