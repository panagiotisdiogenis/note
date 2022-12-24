import { useState } from 'react';

function Like ({ likes, updateLikes }) {

    const [animationClass, setAnimationClass] = useState(false);

    const handleUpdateLikes = () => {
        updateLikes();
        setAnimationClass(!animationClass);
        setTimeout(() => {
          setAnimationClass('');
        }, 500);
    }

    return (
        <div className="ml-6 bg-[#333] border-[1px] border-neutral-600/75 text-[#fff] pointer-events-auto relative inline-flex rounded-md  text-[0.8125rem] font-medium leading-5 shadow-sm">
            <div className="flex py-2 px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill={`${animationClass ? 'currentColor' : 'none'}`} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="cursor-pointer mr-2.5 h-5 w-5 hover:text-red-500" onClick={handleUpdateLikes}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Like
            </div>
            <div className="border-l border-slate-400/20 py-2 px-2">{likes}</div>
        </div>
    )
}

export default Like;