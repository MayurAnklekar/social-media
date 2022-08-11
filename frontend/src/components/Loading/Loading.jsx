import React from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from "react";

const Loading = () => {
    const [quote, setQuote] = useState("");
    const fetchQuote = async () => {
        const { data } = await axios.get(
            "https://uselessfacts.jsph.pl/random.json?language=en"
        );
        setQuote(data.text);
    };
    useEffect(() => {
        fetchQuote();
        setTimeout(() => {
            setQuote((q) => {
                if (q) return q;
                return "Your internet is slower than my crushs reply :(";
            });
        }, 3000);
    },[]);


    return (
        <section className="flex flex-col items-center justify-center text-white rounded-xl max-w-[90%] p-8">
			<CircularProgress />
			{quote && (
				<>
					<h2 className="mb-8">Do you know?</h2>
					<p className="text-sm leading-7 max-w-xl">{quote}</p>
				</>
			)}
		</section>
    );
};

export default Loading;
