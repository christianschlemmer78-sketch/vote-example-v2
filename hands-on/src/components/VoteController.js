import React from "react";
import VoteList from "./VoteList";
import InactiveVoteComposer from "./InactiveVoteComposer";

export default function VoteController({ 
  currentVoteId,
  votes, 
  onRegisterVote,
  onDismissVote
}) {
  // const [currentVoteId, setCurrentVoteId] = React.useState(null);
  // const [voteComposerActive, setVoteComposerActive] = React.useState(false);

  // function setCurrentVote(vote) {
  //   closeVoteComposer();
  //   setCurrentVoteId(vote.id);
  // }

  // function unsetCurrentVote() {
  //   setCurrentVoteId(null);
  // }

  // function closeVoteComposer() {
  //   setVoteComposerActive(false);
  // }

  // function openVoteComposer() {
  //   unsetCurrentVote();
  //   setVoteComposerActive(true);
  // }

  // function saveVote(vote) {
  //   closeVoteComposer();
  //   onSaveVote(vote);
  // }

  return (
    <div>
      <VoteList
        allVotes={votes}
        currentVoteId={currentVoteId}
        onRegisterVote={onRegisterVote}
        onDismissVote={onDismissVote}
      />
      <InactiveVoteComposer />
    </div>
  );
}
