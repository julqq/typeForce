import { sortedWords } from "../../utils/words";
let words = sortedWords();

export default (req, res) => {
	res.statusCode = 200;
	res.json(words);
};
