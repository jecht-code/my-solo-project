import { useSelector } from 'react-redux';
import WidgetItem from '../SummaryWidget/WidgetItem';

function SummaryBlock()  {
    const tranx = useSelector(store => store.tranx);
    const cards = useSelector(store => store.cards);
    

    //empty array for 4 widgets
    const widgetArray = new Array();

    //4 functions
    //Sum the number of CCs
    const SumofCC = () => {
        const totalcards = cards.length
        widgetArray.push({title: "Total CC", data: totalcards})
    }

    //Total Spend Widget
    const TotalSpend = () => {
        //THIS IS NOT WORKING 100% its only getting the latest value not the total SUM..
        const totalSpend = tranx.reduce((accumulator, currentValue) => accumulator+currentValue.day_of_spend, 0);
        widgetArray.push({title: "Total Spent", data: totalSpend})
    }
    //Call all the functions into one.
    const callAllFunctions = () => {
        SumofCC(),
        TotalSpend()
    }
    callAllFunctions();
    return (
        <div className='mySummaryBlockList'>
            {widgetArray.map((widgets) => {
                return (
                    <WidgetItem key={widgets.title} listofWidget={widgets} />
                )
            })}
        </div>
    )
}

export default SummaryBlock;