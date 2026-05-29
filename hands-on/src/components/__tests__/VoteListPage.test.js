import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait,
  getByText
} from "@testing-library/react";
import VoteListPage from "../VoteListPage";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import LoginProvider from "../LoginProvider";

// theVotes enthält die Testdaten die normalerweise vom Server
// kommen würden, aber in unserem Test durch den Mock
// zurückgeliefert werden
const theVotes = [
  {
    id: "vote_1",
    title: "How is your day?",
    description: "Tell me: how has your day been so far?",
    choices: [
      { id: "choice_1", title: "Good", count: 7 },
      { id: "choice_2", title: "Bad", count: 12 },
      { id: "choice_3", title: "Not sure yet", count: 1 }
    ]
  },
  {
    id: "vote_2",
    title: "Programming languages",
    description: "What is your preferred language?",
    choices: [
      { id: "choice_1", title: "JavaScript", count: 5 },
      { id: "choice_2", title: "Java", count: 9 },
      { id: "choice_3", title: "Plain english", count: 17 }
    ]
  }
];

test("that it loads data and renders (with fetch mock)", async () => {
  const fetchMock = jest
    .spyOn(window, "fetch")
    .mockImplementationOnce(
        () => ({
            ok: () => true,
            json: () => theVotes
        })
    ); 

    const history = createMemoryHistory();
    const { container, queryByText } = render(
      <Router history={history}>
        <LoginProvider>
          <Route component={VoteListPage} />
        </LoginProvider>
      </Router>
    );
    const spinner = container.querySelector(".Spinner");
    expect(spinner).toBeInTheDocument();

    // DEMO ONLY: as the outstanding promises from fetch(mock) and
    // 'backend.js' have not been resolved yet, we cannot use
    // queryByText here, but need to use waitForElement (see below)
    expect(queryByText("Programming languages")).not.toBeInTheDocument();

    const vote = await waitForElement(() => queryByText("Programming languages"));
    expect(vote).toBeInTheDocument();
   
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/api/votes"
    );

    fireEvent.click(vote);
    expect(history.location.pathname).toBe("/votes/vote_2");
});