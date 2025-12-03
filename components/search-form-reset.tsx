'use client'

import { X } from "lucide-react";
import Link from "next/link";

const SearchReset = () => {

    const reset = () => {
        const form: any = document.querySelector('.search-form')
        if (form) form.reset();
    }

    return (
        <button type="reset" onClick={reset} className="bg-emerald-500 text-white p-2 group rounded-full" >
            <Link href="/search" className="search-btn text-white-1" >
                <X className="font-bold group-hover:rotate-90 duration-200 ease-in-out" />
            </Link>
        </button>
    )
}

export default SearchReset