import React from "react";
import VoteController from "./VoteController";
import VoteLoadingIndicator from "./VoteLoadingIndicator";
import { fetchJson, sendJson } from "../backend";

export default function VoteListPage() {
  const [allVotes, setAllVotes] = React.useState(null);
  const[loading, setLoading] = React.useState(false);
  const[error, setError] = React.useState(null);

  async function loadVotes() {
    setLoading(true);
    setError(null);
    try {
      const votes = await fetchJson("/api/votes");
      setAllVotes(votes);
    } catch (err) {
      setAllVotes(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadVotes();
  }, []);

  if (error) {
    return <h1>Error occured: {error}</h1>;
  }

  if (loading) {
    return <h1>Data is loading, please wait...</h1>;
  }

  async function registerVote(vote, choice) {
    await sendJson("PUT", `/api/votes/${vote.id}/choices/${choice.id}/vote`);
    loadVotes();
  }

  async function addVote(vote) {
    const newVote = await sendJson("POST", "/api/votes", vote);
    setAllVotes(currentVotes => [...currentVotes, newVote]);
  }

  if (!allVotes) {
    return <VoteLoadingIndicator />;
  }

  return (
    <VoteController
      votes={allVotes}
      onRegisterVote={registerVote}
      onSaveVote={addVote}
    />
  );
}
