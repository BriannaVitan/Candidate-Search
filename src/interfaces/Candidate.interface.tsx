// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {

// Readme required name, username, location, avatar, email, html_url, and company
    readonly name: string | null;
    readonly username: string;
    readonly location: string | null;
    readonly bio: string | null;
    readonly avatar_url: string | null;
    readonly email: string | null;
    readonly html_url: string | null;
    readonly company: string | null;
  }
  