import Image from 'next/image'
import TodaysRepairs from './admin/repairs-today/page'

export default function Home() {
  return (
  <>
    <h1 className="text-center text-3xl text-gray-600 m-5">Technico App</h1>
    <p className="text-center text-1xl text-gray-600 m-5">The best app out there. <br></br> By far. <br></br> It&apos;s not even close.</p>
    <TodaysRepairs />
  </>
  )
}
