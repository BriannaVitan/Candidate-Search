// function that fetches a batch of users since a random start date
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          // grab environment variable api 
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    // test if environment variable is correctly imported and api can hear my req
    // console.log('Response:', response);

    // get api response
    const data = await response.json();

    // return early if error
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }

    // check structure of data
    console.log('Data:', data);

    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return [];
  }
};

// get user by username
const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    return data;
  } catch (err) {
    // console.log('an error occurred', err);
    return {};
  }
};

export { searchGithub, searchGithubUser };