import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      {/* <head> */}
        <h1>Information Center</h1>
      {/* </head> */}
      <body>
        <h2>Summary Information</h2>
          <ul>
            <li> 
              <h3>Total Credit Cards</h3>
                <p>The total number of credit cards you are tracking.</p>
            </li>
            <li> 
              <h3>Total Spent</h3>
                <p>The total amount spent to date across all cards.</p>
            </li>
            <li> 
              <h3>Credit Utilization Rate</h3>
                <p>Is the sum of all your balances, divided by the sum of your cards' credit limits. It is to help gauge your credit rating.</p>
            </li>
            <li> 
              <h3>Bonus Rewards Earned</h3>
                <p>How much you earned after completing the goal.  The actual cash back does not get realized until your next credit cycle.</p>
            </li>
          </ul>
      </body>
      
      <div>
        <p>This about page is for anyone to read!</p>
      </div>
    </div>
  );
}

export default AboutPage;
