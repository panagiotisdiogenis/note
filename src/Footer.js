function Footer () {
    return(
        <div className="flex justify-center m-16">
            <div onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} className="animate-bounce bg-white dark:bg-[#333] p-2 w-10 h-10 ring-1 ring-neutral-600/75 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#aaa] hover:text-amber-300 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                </svg>
            </div>
        </div>
    )
}
  
  export default Footer;