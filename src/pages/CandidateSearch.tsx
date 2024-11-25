import { useEffect } from 'react';
import { searchGithub } from '../api/API';
// import { searchGithub, searchGithubUser } from '../api/API';
// import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {

  // const [candidates, setCandidates] = useState <Candidate[]> ([]);
  
  useEffect(() => {
    const fetchCandidates = async () => {
    const allCandidates = await searchGithub()
    console.log(allCandidates);
    }
    fetchCandidates();
  },[])

  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
