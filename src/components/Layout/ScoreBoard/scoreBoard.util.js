import axios from "axios";

export const fetchScoreManually = () => 
  axios.get("http://localhost:4000/score");