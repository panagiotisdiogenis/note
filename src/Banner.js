function Banner () {
  return(
    <div className="p-4 m-6 rounded-xl bg-[#111] dark:bg-[#111]" role="alert">
      <div className="flex items-center">
        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
        <span className="sr-only">Info</span>
        <h3 className="text-lg font-medium text-gray-300">Note-Note</h3>
      </div>
      <div className="mt-2 mb-4 text-sm text-gray-300">
      Simplify your note-taking process with a minimalist app that allows you to focus on capturing your thoughts and ideas.</div>
      <div className="flex">
        <button disabled type="button" className="text-white rounded text-xs px-3 py-1.5 text-center bg-[#333] mr-2">
          React
        </button>
        <button disabled type="button" className="text-white rounded text-xs px-3 py-1.5 text-center bg-[#333] mr-2">
          Firebase
        </button>
        <button disabled type="button" className="text-white rounded text-xs px-3 py-1.5 text-center bg-[#333] mr-2">
          Vercel
        </button>
        <button disabled type="button" className="text-white rounded text-xs px-3 py-1.5 text-center bg-[#333]">
          Tailwind
        </button>
      </div>
    </div>
  )
}

export default Banner;