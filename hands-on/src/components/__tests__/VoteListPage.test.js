import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from "@testing-library/react";
import VoteListPage from "../VoteListPage";

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
    const { container, queryByText } = render(<VoteListPage />);
    const spinner = container.querySelector(".Spinner");
    expect(spinner).toBeInTheDocument();
    const vote = await waitForElement(() => queryByText("Programming languages"));
    expect(vote).toBeInTheDocument();
    fireEvent.click(vote);
    fireEvent.click(queryByText("JavaScript"));
    await wait();
    expect(fetchMock).toHaveBeenCalledTimes(2);
});