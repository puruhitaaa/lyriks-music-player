import SongBar from './SongBar'

const RelatedSongs = ({
  data,
  activeSong,
  isPlaying,
  handlePlayClick,
  handlePauseClick,
  artistId,
}) => {
  console.log('DATA:', data)
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-bold text-white'>Related Songs:</h1>

      <div className='flex flex-col w-full mt-6'>
        {data?.map((song, i) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePlayClick={handlePlayClick}
            handlePauseClick={handlePauseClick}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedSongs
