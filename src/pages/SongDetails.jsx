import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'

import { setActiveSong, playPause } from '../redux/features/playerSlice'
import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from '../redux/services/shazamCore'

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songid, id: artistId } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery(songid)
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetRelatedSongsQuery(songid)

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  if (isFetchingSongDetails || isFetchingRelatedSongs)
    return <Loader title='Searching song details' />

  if (error) return <Error />

  return (
    <div className='flex flex-col'>
      <DetailsHeader artistId={artistId} songData={songData} />
      <div className='mb-10'>
        <h2 className='text-3xl font-bold text-white'>Lyrics:</h2>

        <div className='mt-5'>
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className='my-1 text-gray-400'>
                {line}
              </p>
            ))
          ) : (
            <p className='my-1 text-gray-400'>Sorry, no lyrics found!</p>
          )}
        </div>
      </div>

      <RelatedSongs
        data={data}
        activeSong={activeSong}
        artistId={artistId}
        isPlaying={isPlaying}
        handlePlayClick={handlePlayClick}
        handlePauseClick={handlePauseClick}
      />
    </div>
  )
}

export default SongDetails
