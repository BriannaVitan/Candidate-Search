import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // create stateful object to hold onto current candidate from api that uses candidate interface
  const [currentCandidate, setCurrentCandidate] = useState<Candidate>({
    name: '',
    username: '',
    location: '',
    bio: '',
    avatar_url: '',
    email: '',
    html_url: '',
    company: '',
  });

  // Function to get a random candidate from the list of candidates
  const searchGithubCandidates = async () => {
    try {

      // call function to query api
      const users = await searchGithub();

      // return early if array is empty
      if (users.length === 0) {
        console.warn('No users found');
        return;
      }

      // select a random user and search for them by their login

      const randomUser = users[Math.floor(Math.random() * users.length)];

      // search for user by username
      const userData = await searchGithubUser(randomUser.login);

      // set state with current user's data 
      setCurrentCandidate({
        name: userData.name || 'N/A',
        username: userData.login || 'N/A',
        location: userData.location || 'N/A',
        bio: userData.bio || 'N/A',
        avatar_url: userData.avatar_url || '',
        email: userData.email || 'N/A',
        html_url: userData.html_url || '',
        company: userData.company || 'N/A',
      });
    } catch (err) {
      console.error('An error occurred while fetching candidate data:', err);
    }
  };

  // Function to add the current candidate to local storage
  const addCandidateToLocalStorage = () => {
    // Only save candidate if username is not 'N/A' for getting objects
    if (currentCandidate.username!== 'N/A') {
      // get candidates from local storage
      const storedCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');

      // append new candidate object to array
      const updatedCandidates = [...storedCandidates, currentCandidate];

      // set local storage with updated candidates
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));

      // print structure of candidate to debug
      console.log('Candidate saved:', currentCandidate);

      // Fetch the next candidate after adding
      searchGithubCandidates();
    } else {
      console.warn('Cannot save candidate with username:', currentCandidate.username);
    }
  };

  // Fetching candidate on page load
  useEffect(() => {
    searchGithubCandidates();
  }, []);

  return (
    <>
      <h1>Candidate Search</h1>
      <div className="candidate-card">

        {/* return empty string if candidate doesn't have image */}
        <img className='candidate-image'src={currentCandidate.avatar_url || ''} alt="Candidate Avatar" />
        <div className="candidate-info">
          <h2>{`${currentCandidate.name} (${currentCandidate.username})`}</h2>
          <p>Location: {currentCandidate.location}</p>
          <p>Company: {currentCandidate.company}</p>
          <p>Email: <a href={`mailto:${currentCandidate.email}`}>{currentCandidate.email}</a></p>
          <p>Bio: {currentCandidate.bio}</p>
        </div>
      </div>
      <div className="action-buttons">
        
        {/* attach event handlers to buttons */}
        <button className="delete-button" onClick={searchGithubCandidates}> - </button>
        <button className="add-button" onClick={addCandidateToLocalStorage}> + </button>
      </div>
    </>
  );
};

export default CandidateSearch;