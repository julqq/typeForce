import { useState, useEffect } from "react";
import style from "../styles/Home.module.css";

export default function Home({ words }) {
	const [status, setStatus] = useState("");
	const [number, setNumber] = useState(0);
	const [time, setTime] = useState(60);
	const [timer, setTimer] = useState(false);
	const [result, setResult] = useState(null);
	const check = (event) => {
		let inputWord = event.target.value.trim();
		let word = words[number];

		inputWord === word ? setNumber(number + 1) : console.log(false);

		event.target.value = "";
		event.target.value = "";
	};

	useEffect(() => {
		if (number >= 1) {
			setTimer(true);
		}
	}, [number]);

	useEffect(() => {
		setTimeout(() => {
			if (timer === true) {
				setTime(time - 1);
				if (time <= 0) {
					setStatus("disabled");
					setTimer(false);
					setTime(60);
					setResult(`Your Result is : ${number} Words in 1 minute`);
				}
			}
		}, 1000);
	}, [time, timer]);

	function resetTimer() {
		window.location.reload();
		setTimer(false);
		setTimeout(() => {
			setTime(60);
		}, 200);
	}

	return (
		<>
			<div className={style.timeContainer}>
				<span className={style.time}>{time}</span>
				<span>s</span>
			</div>
			<div className={style.wordsContainer}>
				{words.map((word, index) =>
					index === number ? (
						<span key={index}>
							{" "}
							<mark>{word}</mark>{" "}
						</span>
					) : (
						<span key={index}>{word} </span>
					)
				)}
			</div>
			<br />

			<input
				className={style.typeInput}
				disabled={status}
				type="text"
				name=""
				id=""
				onKeyUp={(event) =>
					event.code === "Space" || event.code === "Enter"
						? check(event)
						: console.log("ok")
				}
			/>

			<div className={style.containerRestartResult}>
				<button className={style.buttonRestart} onClick={() => resetTimer()}>
					Restart
				</button>
				<p className={style.result}> {result}</p>
			</div>
		</>
	);
}

export async function getStaticProps(context) {
	const res = await fetch("https://type-force.vercel.app/api/getWords");
	const json = await res.json();
	return {
		props: { words: json },
	};
}
