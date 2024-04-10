import { useSelector } from 'react-redux';
import WidgetItem from '../SummaryWidget/WidgetItem';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function SummaryBlock()  {
    const tranx = useSelector(store => store.tranx);
    const cards = useSelector(store => store.cards);
    

    //empty array for 4 widgets
    const widgetArray = new Array();

    //4 functions
    //Sum the number of CCs
    const SumofCC = () => {
        const totalcards = cards.length
        widgetArray.push({title: "Total Credit Cards", data: totalcards})
    }

    //Total Spend Widget
    const TotalSpend = () => {
        const totalSpend = tranx.reduce((accumulator, currentValue) => accumulator+currentValue.day_of_spend, 0);
        widgetArray.push({title: "Total Spent", data: totalSpend})
    }

    //Total Credit Utilization Rate Should be total Spend divided by total credit limit.
    //Total Spend Widget
    const creditUtilRate = () => {
        const totalSpend = tranx.reduce((accumulator, currentValue) => accumulator+currentValue.day_of_spend, 0);
        const totalCreditLimit = cards.reduce((accumulator, currentValue) => accumulator+currentValue.credit_limit, 0);
        widgetArray.push({title: "Credit Utilization Rate", data: `${Math.round((totalSpend/totalCreditLimit)*100)}%`})
    }

    //Total Rewards accomplished
    const rewardsGoal = () => {
        const totalrewardscompleted = cards.reduce((bonusEarned, currentValue) => 
        {
            const tranxDaySpend = tranx.filter(
                (transact) => transact.card_id === currentValue.id)
                .reduce(
                    (cardspend, currentTranx) => cardspend+currentTranx.day_of_spend, 0
                )
            if (tranxDaySpend >= currentValue.spend_goal) {
                bonusEarned+=currentValue.rewards_value
            }
                return bonusEarned;

        }
        , 0);

        widgetArray.push({title: "Bonus Rewards Earned", data: totalrewardscompleted})
    }

    //Call all the functions into one.
    const callAllFunctions = () => {
        SumofCC(),
        TotalSpend(),
        creditUtilRate(),
        rewardsGoal()
    }
    callAllFunctions();
    return (
        // <div className='mySummaryBlockList'>
        // <Box
        //     display="flex"
        //     justifyContent="center"
        //     alignItems="center"
        //     minHeight="100vh"
        // >
            <Grid container spacing={4} columns={12} >
                {widgetArray.map((widgets) => {
                    return (
                        <Grid item xs={3}>
                            <Paper height="100%" elevation={3}>
                                <WidgetItem key={widgets.title} listofWidget={widgets} />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        // </Box>
        // </div>
    )
}

export default SummaryBlock;