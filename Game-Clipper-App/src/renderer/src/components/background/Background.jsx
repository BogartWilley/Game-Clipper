import bgImage from './bg-images/bg-img.png'
function Background() {
  return (
    <div>
      <img
        src={bgImage}
        style={{
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '100%',
          width: '100%',
          userSelect: 'none'
        }}
      ></img>
    </div>
  )
}
export default Background
