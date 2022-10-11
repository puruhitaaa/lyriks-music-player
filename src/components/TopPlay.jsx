import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'

import 'swiper/css'
import 'swiper/css/free-mode'

const TopChartCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  handlePlayClick,
  handlePauseClick,
}) => (
  <div className='w-full flex items-center hover:bg-[#4C426E] py-2 p-4 rounded-lg cursor-pointer mb-2'>
    <h3 className='mr-3 font-bold text-white'>{i + 1}.</h3>

    <div className='flex items-center justify-between flex-1'>
      <img
        alt={song?.title}
        className='w-20 h-20 rounded-lg'
        src={song?.images?.coverart}
      />

      <div className='flex flex-col justify-center flex-1 mx-3'>
        <Link to={`/songs/${song.key}`}>
          <p className='text-xl font-bold text-white'>{song?.title}</p>
        </Link>

        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className='mt-1 text-gray-300'>{song?.subtitle}</p>
        </Link>
      </div>
    </div>

    <PlayPause
      activeSong={activeSong}
      isPlaying={isPlaying}
      song={song}
      handlePlay={handlePlayClick}
      handlePause={handlePauseClick}
    />
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data } = useGetTopChartsQuery()
  const divRef = useRef(null)

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  const topPlays = data?.slice(0, 5)

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  return (
    <div
      ref={divRef}
      className='mb-6 ml-0 xl:ml-6 xl:mb-0 flex-1 xl:max-w-[500px] max-w-full flex flex-col'
    >
      <div className='flex flex-col w-full'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-white'>Top Charts</h2>

          <Link to='/top-charts'>
            <p className='text-gray-300 cursor-pointer'>See more</p>
          </Link>
        </div>

        <div className='flex flex-col gap-1 mt-4'>
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={i}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePlayClick={() => handlePlayClick(song, i)}
              handlePauseClick={handlePauseClick}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col w-full mt-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-white'>Top Artists</h2>

          <Link to='/top-artists'>
            <p className='text-gray-300 cursor-pointer'>See more</p>
          </Link>
        </div>

        <Swiper
          className='mt-4'
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song?.key}
              className='rounded-full shadow-lg animate-slideright'
              style={{ width: '25%', height: 'auto' }}
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  alt='name'
                  className='object-cover w-full rounded-full'
                  src={song?.images.background}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay
