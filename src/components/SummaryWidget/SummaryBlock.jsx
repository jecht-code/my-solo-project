import { useSelector } from 'react-redux';
import WidgetItem from '../SummaryWidget/WidgetItem';

function SummaryBlock()  {
    const tranx = useSelector(store => store.tranx);
    const cards = useSelector(store => store.cards);

    //empty array for 4 widgets
    const widgetArray = new Array();

    //4 functions
    //Sum the number of CCs
    // const SumofCC = (cards) => {
    //     return {cards.length}
    // }


    return (
        <div className='mySummaryBlockList'>
            {tranx.map((listTranx, summaryIndex) => {
                return (
                    <WidgetItem key={summaryIndex} tranx={listTranx} />
                )
            })}
        </div>
    )
}

export default SummaryBlock;