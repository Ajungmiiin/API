import Weather from "./weather"
export default function Header () {
  return (
    <header className="w-100% border h-24 relative">
      <h1 className='text-2xl font-semibold text-center absolute left-0 right-0 top-0 bottom-0 my-auto h-8'>현재 대기오염 정보</h1>
      <Weather />
    </header>
  )
}