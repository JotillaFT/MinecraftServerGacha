import '../css/Banner.css'

export default function Banner({message}){
    return (
        <div className='banner-head'>
            <p className='oblique'>{message}</p>
        </div>
    )
}