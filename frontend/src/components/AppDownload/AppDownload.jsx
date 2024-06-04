import './AppDownload.css'
import { assets } from '../../assets/assets'


export const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>Para una mejor experiencia descarga <br /> PintóBajón</p>
        <div className="app-download-platforms">
            <img src={ assets.play_store } alt="Logo playstore" />
            <img src={assets.app_store} alt="Logo Applestore" />
        </div>
    </div>
  )
}
