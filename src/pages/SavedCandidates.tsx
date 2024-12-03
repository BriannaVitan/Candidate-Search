import { useEffect, useState } from 'react';
import type Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [potentialCandidates, setCandidates] = useState<Candidate[] | null>(null);

  // Fetch candidates from local storage
  const fetchCandidatesFromLocalStorage = () => {
    try {
      const storedCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
      setCandidates(storedCandidates);
    } catch (error) {
      console.error('Error fetching candidates from local storage:', error);
    }
  };

  // Delete a candidate from local storage
  const deleteCandidateFromLocalStorage = (username: string) => {
    if (potentialCandidates) {
      const updatedCandidates = potentialCandidates.filter(candidate => candidate.username !== username);
      setCandidates(updatedCandidates);
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
    }
  };

  // Fetch candidates when the component is mounted
  useEffect(() => {
    fetchCandidatesFromLocalStorage();
  }, []);

  if (potentialCandidates === null) {
    return <p>Loading candidates...</p>; // A loading message while fetching data
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      {/* Candidates table */}
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {/* Map each candidate as a row in the table */}
          {potentialCandidates.length === 0 ? (
            <tr>
              <td colSpan={8}>No candidates saved</td>
            </tr>
          ) : (
            potentialCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  {/* Display image with fallback */}
                  <img
                    src={candidate.avatar_url || 'default-avatar.png'}
                    alt={`${candidate.name}'s avatar`}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{candidate.name || 'N/A'}</td>
                <td>{candidate.username || 'N/A'}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>
                  <a href={`mailto:${candidate.email}`}>{candidate.email || 'N/A'}</a>
                </td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteCandidateFromLocalStorage(candidate.username)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
