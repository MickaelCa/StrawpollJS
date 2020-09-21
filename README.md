# StrawpollJS

simple module to create/read polls with strawpoll API

```JAVASCRIPT
let testCreatePoll = new Strawpoll(
    "Test poll 7",                  // poll name
    [                               // poll options
        "Test option 1",
        "Test option 2",
        "Test option 3",
    ],
    false,                          // multiple options allowed
    Strawpoll.DUPCHECK_DISABLED,    // duplication check ( Strawpoll.DUPCHECK_DISABLED / Strawpoll.DUPCHECK_PERMISSIVE / Strawpoll.DUPCHECK_NORMAL )
    false                           // Captcha
);

// create Strawpoll

testCreatePoll.createPoll()                 // create poll
    .then((poll) => {                       // object Strawpoll returned
        console.log(poll.id);               // get poll ID
        poll.getVotes()                     // get votes
            .then((poll) => {               // object Strawpoll returned
                console.log(poll.options);  // get options
                console.log(poll.votes);    // get votes
            });
    });

// Existing Strawpoll

let testExistingPoll = new Strawpoll();
testExistingPoll.id = 15367332;      // Strawpoll ID

testExistingPoll.getVotes()         // get votes
    .then((poll) => {               // object Strawpoll returned
        console.log(poll.options);  // get options
        console.log(poll.votes);    // get votes
    });
```