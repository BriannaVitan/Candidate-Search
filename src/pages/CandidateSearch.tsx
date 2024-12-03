import { useState, useEffect, useCallback } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import type Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // State to hold current candidate data or null before fetching
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to get a random candidate from the list of candidates
  const searchGithubCandidates = useCallback(async () => {
    try {
      // Call function to query the API
      const users = await searchGithub();

      // Return early if array is empty
      if (users.length === 0) {
        console.warn('No users found');
        return;
      }

      // Select a random user and search for them by their login
      const randomUser = users[Math.floor(Math.random() * users.length)];

      // Search for user by username
      const userData = await searchGithubUser(randomUser.login);

      // Set state with current user's data
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
      setError('An error occurred while fetching candidate data.');
    }
  }, []);

  // Function to add the current candidate to local storage
  const addCandidateToLocalStorage = () => {
    if (currentCandidate && currentCandidate.username !== 'N/A') {
      // Get candidates from local storage
      const storedCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');

      // Append new candidate object to array
      const updatedCandidates = [...storedCandidates, currentCandidate];

      // Set local storage with updated candidates
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));

      // Print structure of candidate to debug
      console.log('Candidate saved:', currentCandidate);

      // Fetch the next candidate after adding
      searchGithubCandidates();
    } else {
      console.warn('Cannot save candidate with username:', currentCandidate?.username);
    }
  };

  // Fetching candidate on page load
  useEffect(() => {
    searchGithubCandidates();
  }, [searchGithubCandidates]);

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <h1>Candidate Search</h1>
      <div className="candidate-card">
        {/* Show default avatar if none is available */}
        <img
          className='candidate-image'
          src={currentCandidate?.avatar_url || 'default-avatar.png'}
          alt="Candidate Avatar"
        />
        <div className="candidate-info">
          <h2>{`${currentCandidate?.name || 'N/A'} (${currentCandidate?.username || 'N/A'})`}</h2>
          <p>Location: {currentCandidate?.location || 'N/A'}</p>
          <p>Company: {currentCandidate?.company || 'N/A'}</p>
          <p>Email: <a href={`mailto:${currentCandidate?.email || 'N/A'}`}>{currentCandidate?.email || 'N/A'}</a></p>
          <p>Bio: {currentCandidate?.bio || 'N/A'}</p>
        </div>
      </div>
      <div className="action-buttons">
        {/* Action buttons for deleting or adding a candidate */}
        <button className="delete-button" onClick={searchGithubCandidates}> - </button>
        <button className="add-button" onClick={addCandidateToLocalStorage}> + </button>
      </div>
    </>
  );
};

export default CandidateSearch;
