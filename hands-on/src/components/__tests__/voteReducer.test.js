import {voteListReducer} from '../VoteListPage';

test('START_REQUEST action correctly', () => {
    const oldState = {};
    const newState = voteListReducer(oldState, {type: 'START_REQUEST'});
    expect(newState).toEqual({
        loading: true, 
    });
});